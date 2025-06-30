import { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  Building, 
  UserCheck, 
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Eye,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { showToast } from '../../components/ui/Toast';
import { formatCurrency, formatDate, getUserRoleName } from '../../utils/helpers';

const AdminDashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Overview stats state
  const [overviewStats, setOverviewStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    verifiedUsers: 0,
    pendingVerifications: 0,
  });
  
  // Data state for each tab
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allFunds, setAllFunds] = useState<any[]>([]);
  const [allReports, setAllReports] = useState<any[]>([]);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);
  const [recentDisbursements, setRecentDisbursements] = useState<any[]>([]);
  
  // Loading states
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingFunds, setLoadingFunds] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);

  // Fetch overview statistics
  const fetchOverviewStats = async () => {
    setLoadingOverview(true);
    try {
      // Get total users count
      const { count: totalUsersCount, error: usersCountError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (usersCountError) throw usersCountError;

      // Get verified users count
      const { count: verifiedUsersCount, error: verifiedError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true);

      if (verifiedError) throw verifiedError;

      // Get pending verifications count
      const { count: pendingCount, error: pendingError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', false);

      if (pendingError) throw pendingError;

      // Get total project donations
      const { data: projectDonations, error: donationsError } = await supabase
        .from('project_donations')
        .select('amount')
        .eq('status', 'completed');

      if (donationsError) throw donationsError;

      // Get total student funds
      const { data: studentFunds, error: fundsError } = await supabase
        .from('funds')
        .select('amount');

      if (fundsError) throw fundsError;

      const totalProjectFunds = projectDonations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const totalStudentFunds = studentFunds?.reduce((sum, f) => sum + Number(f.amount), 0) || 0;

      // Get pending verifications for the overview
      const { data: pendingUsers, error: pendingUsersError } = await supabase
        .from('users')
        .select('id, name, email, role, created_at')
        .eq('is_verified', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (pendingUsersError) throw pendingUsersError;

      // Get recent disbursements
      const { data: disbursements, error: disbursementsError } = await supabase
        .from('disbursements')
        .select(`
          *,
          funds!inner(
            student_id,
            students!inner(
              users!students_user_id_fkey(name)
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (disbursementsError) throw disbursementsError;

      setOverviewStats({
        totalUsers: totalUsersCount || 0,
        totalFunds: totalProjectFunds + totalStudentFunds,
        verifiedUsers: verifiedUsersCount || 0,
        pendingVerifications: pendingCount || 0,
      });

      setPendingVerifications(pendingUsers || []);
      setRecentDisbursements(disbursements || []);

    } catch (error) {
      console.error('Error fetching overview stats:', error);
      showToast.error('Failed to load overview statistics');
    } finally {
      setLoadingOverview(false);
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllUsers(users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch all funds and donations
  const fetchAllFunds = async () => {
    setLoadingFunds(true);
    try {
      // Fetch project donations
      const { data: projectDonations, error: donationsError } = await supabase
        .from('project_donations')
        .select(`
          *,
          projects!inner(title),
          users!project_donations_donor_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (donationsError) throw donationsError;

      // Fetch student funds
      const { data: studentFunds, error: fundsError } = await supabase
        .from('funds')
        .select(`
          *,
          students!inner(
            users!students_user_id_fkey(name)
          ),
          users!funds_donor_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (fundsError) throw fundsError;

      // Combine and format the data
      const combinedFunds = [
        ...(projectDonations || []).map(donation => ({
          ...donation,
          type: 'project_donation',
          recipient_name: donation.projects?.title || 'Unknown Project',
          donor_name: donation.users?.name || 'Anonymous',
        })),
        ...(studentFunds || []).map(fund => ({
          ...fund,
          type: 'student_fund',
          recipient_name: fund.students?.users?.name || 'Unknown Student',
          donor_name: fund.users?.name || 'Anonymous',
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setAllFunds(combinedFunds);
    } catch (error) {
      console.error('Error fetching funds:', error);
      showToast.error('Failed to load funds');
    } finally {
      setLoadingFunds(false);
    }
  };

  // Fetch all reports
  const fetchAllReports = async () => {
    setLoadingReports(true);
    try {
      // Fetch project reports
      const { data: projectReports, error: projectReportsError } = await supabase
        .from('project_reports')
        .select(`
          *,
          projects!inner(title),
          users!project_reports_monitoring_agent_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (projectReportsError) throw projectReportsError;

      // Fetch monitoring reports
      const { data: monitoringReports, error: monitoringReportsError } = await supabase
        .from('monitoring_reports')
        .select(`
          *,
          funds!inner(
            students!inner(
              users!students_user_id_fkey(name)
            )
          ),
          users!monitoring_reports_monitoring_agent_id_fkey(name)
        `)
        .order('created_at', { ascending: false });

      if (monitoringReportsError) throw monitoringReportsError;

      // Combine and format the data
      const combinedReports = [
        ...(projectReports || []).map(report => ({
          ...report,
          type: 'project_report',
          subject_name: report.projects?.title || 'Unknown Project',
          monitoring_agent_name: report.users?.name || 'Unknown Agent',
        })),
        ...(monitoringReports || []).map(report => ({
          ...report,
          type: 'monitoring_report',
          subject_name: report.funds?.students?.users?.name || 'Unknown Student',
          monitoring_agent_name: report.users?.name || 'Unknown Agent',
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setAllReports(combinedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      showToast.error('Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (!user?.id) return;

    fetchOverviewStats();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    switch (activeTab) {
      case 'users':
        fetchAllUsers();
        break;
      case 'funds':
        fetchAllFunds();
        break;
      case 'reports':
        fetchAllReports();
        break;
    }
  }, [activeTab, user?.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage users, funds, and platform operations</p>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users' },
              { id: 'verifications', label: 'Verifications' },
              { id: 'funds', label: 'Fund Management' },
              { id: 'reports', label: 'Monitoring Reports' },
              { id: 'settings', label: 'Platform Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            {loadingOverview ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-full bg-primary-100 p-3 mr-4">
                          <Users className="h-6 w-6 text-primary-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Users</p>
                          <p className="text-2xl font-bold text-gray-900">{overviewStats.totalUsers}</p>
                          <p className="text-xs text-green-500">
                            {overviewStats.verifiedUsers} verified
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-full bg-secondary-100 p-3 mr-4">
                          <DollarSign className="h-6 w-6 text-secondary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Funds</p>
                          <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewStats.totalFunds)}</p>
                          <p className="text-xs text-green-500">All platforms</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-full bg-accent-100 p-3 mr-4">
                          <CheckCircle className="h-6 w-6 text-accent-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Verified Users</p>
                          <p className="text-2xl font-bold text-gray-900">{overviewStats.verifiedUsers}</p>
                          <p className="text-xs text-green-500">
                            {overviewStats.totalUsers > 0 ? Math.round((overviewStats.verifiedUsers / overviewStats.totalUsers) * 100) : 0}% of total
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="rounded-full bg-warning-100 p-3 mr-4">
                          <Clock className="h-6 w-6 text-warning-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Pending Verifications</p>
                          <p className="text-2xl font-bold text-gray-900">{overviewStats.pendingVerifications}</p>
                          <p className="text-xs text-error-500">Action required</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-2 text-primary-500" />
                              <span className="text-gray-700">Students</span>
                            </div>
                            <span className="font-medium">
                              {allUsers.filter(u => u.role === 'student').length}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ 
                                width: `${overviewStats.totalUsers > 0 ? (allUsers.filter(u => u.role === 'student').length / overviewStats.totalUsers) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-secondary-500" />
                              <span className="text-gray-700">Donors</span>
                            </div>
                            <span className="font-medium">
                              {allUsers.filter(u => u.role === 'donor').length}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-secondary-400 h-2 rounded-full" 
                              style={{ 
                                width: `${overviewStats.totalUsers > 0 ? (allUsers.filter(u => u.role === 'donor').length / overviewStats.totalUsers) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-accent-500" />
                              <span className="text-gray-700">NGOs</span>
                            </div>
                            <span className="font-medium">
                              {allUsers.filter(u => u.role === 'ngo').length}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-accent-500 h-2 rounded-full" 
                              style={{ 
                                width: `${overviewStats.totalUsers > 0 ? (allUsers.filter(u => u.role === 'ngo').length / overviewStats.totalUsers) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <UserCheck className="h-4 w-4 mr-2 text-error-500" />
                              <span className="text-gray-700">Monitoring Agents</span>
                            </div>
                            <span className="font-medium">
                              {allUsers.filter(u => u.role === 'monitoring_agent').length}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-error-500 h-2 rounded-full" 
                              style={{ 
                                width: `${overviewStats.totalUsers > 0 ? (allUsers.filter(u => u.role === 'monitoring_agent').length / overviewStats.totalUsers) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Fund Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Project Donations</span>
                            <span className="font-medium">
                              {formatCurrency(allFunds.filter(f => f.type === 'project_donation').reduce((sum, f) => sum + Number(f.amount), 0))}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Student Funds</span>
                            <span className="font-medium">
                              {formatCurrency(allFunds.filter(f => f.type === 'student_fund').reduce((sum, f) => sum + Number(f.amount), 0))}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-accent-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Pending Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Pending Verifications */}
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Pending Verifications</CardTitle>
                        <Badge variant="warning">{pendingVerifications.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y divide-gray-200">
                        {pendingVerifications.length > 0 ? (
                          pendingVerifications.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Badge 
                                      variant="outline" 
                                      className="mr-2 capitalize"
                                    >
                                      {getUserRoleName(item.role)}
                                    </Badge>
                                    <span>Requested on {formatDate(item.created_at)}</span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">Review</Button>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="px-6 py-8 text-center">
                            <p className="text-gray-500">No pending verifications</p>
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Disbursements */}
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Recent Disbursements</CardTitle>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y divide-gray-200">
                        {recentDisbursements.length > 0 ? (
                          recentDisbursements.map((item) => (
                            <li key={item.id} className="px-6 py-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {item.funds?.students?.users?.name || 'Unknown Student'}
                                  </p>
                                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                                    <span className="mr-2">Batch {item.batch} • {formatCurrency(item.amount)}</span>
                                  </div>
                                </div>
                                <div>
                                  <Badge 
                                    variant={
                                      item.status === 'completed' 
                                        ? 'success' 
                                        : item.status === 'pending' 
                                        ? 'warning' 
                                        : 'error'
                                    }
                                  >
                                    {item.status}
                                  </Badge>
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="px-6 py-8 text-center">
                            <p className="text-gray-500">No recent disbursements</p>
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">All Users</h2>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                Add User
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Roles</option>
                      <option>Students</option>
                      <option>Donors</option>
                      <option>NGOs</option>
                      <option>Monitoring Agents</option>
                      <option>Admins</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Verified</option>
                      <option>Unverified</option>
                    </select>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      leftIcon={<Filter className="h-4 w-4" />}
                    >
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {loadingUsers ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">
                                      {user.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={
                                  user.role === 'admin'
                                    ? 'error'
                                    : user.role === 'monitoring_agent'
                                    ? 'warning'
                                    : user.role === 'ngo'
                                    ? 'accent'
                                    : 'primary'
                                }
                                className="capitalize"
                              >
                                {getUserRoleName(user.role)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={user.is_verified ? 'success' : 'warning'}
                              >
                                {user.is_verified ? 'Verified' : 'Unverified'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" leftIcon={<Eye className="h-4 w-4" />}>
                                  View
                                </Button>
                                <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />}>
                                  Edit
                                </Button>
                                {!user.is_verified && (
                                  <Button variant="success" size="sm" leftIcon={<CheckCircle className="h-4 w-4" />}>
                                    Verify
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'funds' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Fund Management</h2>
              <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                Export Report
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search funds..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Project Donations</option>
                      <option>Student Funds</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Active</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {loadingFunds ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Donor
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recipient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allFunds.map((fund) => (
                          <tr key={fund.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={fund.type === 'project_donation' ? 'primary' : 'secondary'}
                              >
                                {fund.type === 'project_donation' ? 'Project' : 'Student'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {fund.donor_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {fund.recipient_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(fund.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={
                                  fund.status === 'completed' 
                                    ? 'success' 
                                    : fund.status === 'pending' 
                                    ? 'warning' 
                                    : 'secondary'
                                }
                              >
                                {fund.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(fund.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Manage</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Monitoring Reports</h2>
              <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                Export Reports
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search reports..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Project Reports</option>
                      <option>Monitoring Reports</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Completed</option>
                      <option>Draft</option>
                      <option>Under Review</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {loadingReports ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monitoring Agent
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allReports.map((report) => (
                          <tr key={report.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={report.type === 'project_report' ? 'primary' : 'secondary'}
                              >
                                {report.type === 'project_report' ? 'Project' : 'Student'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.subject_name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {report.content?.substring(0, 50)}...
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {report.monitoring_agent_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={
                                  report.status === 'completed' 
                                    ? 'success' 
                                    : report.status === 'draft' 
                                    ? 'warning' 
                                    : 'secondary'
                                }
                              >
                                {report.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(report.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Review</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'verifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Verifications</h2>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Types</option>
                      <option>Students</option>
                      <option>Schools</option>
                      <option>NGOs</option>
                      <option>Monitoring Agents</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      leftIcon={<Filter className="h-4 w-4" />}
                    >
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted On
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingVerifications.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              variant={
                                item.role === 'student'
                                  ? 'primary'
                                  : item.role === 'ngo'
                                  ? 'secondary'
                                  : item.role === 'monitoring_agent'
                                  ? 'accent'
                                  : 'outline'
                              }
                              className="capitalize"
                            >
                              {getUserRoleName(item.role)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(item.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="warning">
                              Pending
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Review
                              </Button>
                              <Button variant="success" size="sm">
                                Approve
                              </Button>
                              <Button variant="error" size="sm">
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-right">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{pendingVerifications.length}</span> of <span className="font-medium">{pendingVerifications.length}</span> results
                    </p>
                    <nav className="inline-flex rounded-md shadow-sm">
                      <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                        1
                      </button>
                      <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Platform Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Enable to restrict platform access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Auto-verification</p>
                        <p className="text-sm text-gray-500">Automatically verify new users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Session Timeout (minutes)</label>
                      <input type="number" className="form-input" defaultValue="60" />
                    </div>
                    
                    <div>
                      <label className="form-label">Max Login Attempts</label>
                      <input type="number" className="form-input" defaultValue="5" />
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      Save Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;