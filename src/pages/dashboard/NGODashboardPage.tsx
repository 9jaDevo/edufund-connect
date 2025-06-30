import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  School, 
  FileCheck, 
  DollarSign,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  ArrowRight,
  GraduationCap,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { showToast } from '../../components/ui/Toast';
import { formatCurrency, formatDate } from '../../utils/helpers';

const NGODashboardPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for data
  const [ngoProjects, setNgoProjects] = useState<any[]>([]);
  const [ngoStudents, setNgoStudents] = useState<any[]>([]);
  const [ngoReports, setNgoReports] = useState<any[]>([]);
  
  // Loading states
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  // Fetch NGO projects
  const fetchNgoProjects = async () => {
    if (!user?.id) return;
    
    setLoadingProjects(true);
    try {
      // Fetch projects for this NGO
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('ngo_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // For each project, calculate the raised amount from donations
      const projectsWithRaised = await Promise.all(
        (projects || []).map(async (project) => {
          const { data: donations, error: donationsError } = await supabase
            .from('project_donations')
            .select('amount')
            .eq('project_id', project.id)
            .eq('status', 'completed');

          if (donationsError) {
            console.error('Error fetching donations for project:', project.id, donationsError);
            return { ...project, raised: 0 };
          }

          const raised = donations?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
          return { ...project, raised };
        })
      );

      setNgoProjects(projectsWithRaised);
    } catch (error) {
      console.error('Error fetching NGO projects:', error);
      showToast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch NGO students
  const fetchNgoStudents = async () => {
    if (!user?.id) return;
    
    setLoadingStudents(true);
    try {
      // First get student IDs associated with this NGO
      const { data: ngoStudentRelations, error: relationsError } = await supabase
        .from('ngo_students')
        .select('student_id, status, notes, created_at')
        .eq('ngo_id', user.id);

      if (relationsError) throw relationsError;

      if (!ngoStudentRelations || ngoStudentRelations.length === 0) {
        setNgoStudents([]);
        return;
      }

      const studentIds = ngoStudentRelations.map(rel => rel.student_id);

      // Fetch student details with user information - explicitly specify the foreign key relationship
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select(`
          *,
          users!students_user_id_fkey(id, name, email)
        `)
        .in('id', studentIds);

      if (studentsError) throw studentsError;

      // Combine student data with NGO relationship data
      const studentsWithRelationData = students?.map(student => {
        const relation = ngoStudentRelations.find(rel => rel.student_id === student.id);
        return {
          ...student,
          ngo_status: relation?.status,
          ngo_notes: relation?.notes,
          ngo_added_at: relation?.created_at,
          user_name: student.users.name,
          user_email: student.users.email
        };
      }) || [];

      setNgoStudents(studentsWithRelationData);
    } catch (error) {
      console.error('Error fetching NGO students:', error);
      showToast.error('Failed to load students');
    } finally {
      setLoadingStudents(false);
    }
  };

  // Fetch NGO reports
  const fetchNgoReports = async () => {
    if (!user?.id) return;
    
    setLoadingReports(true);
    try {
      // First get all project IDs for this NGO
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, title')
        .eq('ngo_id', user.id);

      if (projectsError) throw projectsError;

      if (!projects || projects.length === 0) {
        setNgoReports([]);
        return;
      }

      // Create a map of project ID to project title
      const projectMap = projects.reduce((map, project) => {
        map[project.id] = project.title;
        return map;
      }, {} as Record<string, string>);

      const projectIds = projects.map(p => p.id);

      // Fetch reports for these projects
      const { data: reports, error: reportsError } = await supabase
        .from('project_reports')
        .select(`
          *,
          users!inner(name)
        `)
        .in('project_id', projectIds)
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;

      // Add project name to each report
      const reportsWithProjectNames = reports?.map(report => ({
        ...report,
        projectName: projectMap[report.project_id] || 'Unknown Project',
        monitoring_agent_name: report.users.name
      })) || [];

      setNgoReports(reportsWithProjectNames);
    } catch (error) {
      console.error('Error fetching NGO reports:', error);
      showToast.error('Failed to load reports');
    } finally {
      setLoadingReports(false);
    }
  };

  // Fetch all data when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      fetchNgoProjects();
      fetchNgoStudents();
      fetchNgoReports();
    }
  }, [user?.id]);

  // Calculate stats from real data
  const totalProjects = ngoProjects.length;
  const activeProjects = ngoProjects.filter(p => p.status === 'active').length;
  const totalStudents = ngoStudents.length;
  const totalFunding = ngoProjects.reduce((sum, project) => sum + Number(project.raised || 0), 0);
  const completionRate = totalProjects > 0 ? Math.round((ngoProjects.filter(p => p.status === 'completed').length / totalProjects) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-primary-500 text-white">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-2">NGO Dashboard</h1>
          <p className="text-white/80">Manage your projects and student beneficiaries</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'students', label: 'Students' },
              { id: 'reports', label: 'Reports' },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary-100 p-3 mr-4">
                      <School className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Projects</p>
                      <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
                      <p className="text-xs text-green-500">
                        {totalProjects > activeProjects ? `+${totalProjects - activeProjects} total` : 'All active'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-secondary-100 p-3 mr-4">
                      <Users className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Students Supported</p>
                      <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                      <p className="text-xs text-green-500">Verified students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent-100 p-3 mr-4">
                      <DollarSign className="h-6 w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Funding</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFunding)}</p>
                      <p className="text-xs text-green-500">From donations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-warning-100 p-3 mr-4">
                      <FileCheck className="h-6 w-6 text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                      <p className="text-xs text-green-500">Project success</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Projects */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                <Link to="/projects/new">
                  <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                    New Project
                  </Button>
                </Link>
              </div>

              {loadingProjects ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : ngoProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ngoProjects.slice(0, 4).map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{project.title}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.location}
                            </div>
                          </div>
                          <Badge
                            variant={project.status === 'active' ? 'success' : project.status === 'pending' ? 'warning' : 'secondary'}
                          >
                            {project.status}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Funding Progress</span>
                              <span>{formatCurrency(project.raised)} / {formatCurrency(project.budget)}</span>
                            </div>
                            <ProgressBar
                              value={project.raised}
                              max={project.budget}
                              variant="primary"
                            />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Beneficiaries: {project.beneficiaries_count}</span>
                            <span className="text-gray-600">
                              {Math.round((project.raised / project.budget) * 100)}% funded
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="primary" size="sm">Update Status</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <School className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-500 mb-4">Create your first project to start making an impact.</p>
                    <Link to="/projects/new">
                      <Button variant="primary">Create Project</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {ngoReports.slice(0, 3).map((report, index) => (
                    <div key={report.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <FileCheck className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          New report for {report.projectName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(report.created_at)} by {report.monitoring_agent_name}
                        </p>
                      </div>
                    </div>
                  ))}
                  {ngoReports.length === 0 && !loadingReports && (
                    <p className="text-gray-500 text-center py-4">No recent updates</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">All Projects</h2>
              <Link to="/projects/new">
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  New Project
                </Button>
              </Link>
            </div>

            {/* Search and Filter */}
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
                        placeholder="Search projects..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Completed</option>
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

            {loadingProjects ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : ngoProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {ngoProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {project.location}
                              </div>
                              <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                            </div>
                            <Badge
                              variant={project.status === 'active' ? 'success' : project.status === 'pending' ? 'warning' : 'secondary'}
                              className="ml-4"
                            >
                              {project.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm font-medium text-gray-900">Budget</p>
                              <p className="text-lg font-bold text-primary-600">{formatCurrency(project.budget)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm font-medium text-gray-900">Raised</p>
                              <p className="text-lg font-bold text-secondary-600">{formatCurrency(project.raised)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm font-medium text-gray-900">Beneficiaries</p>
                              <p className="text-lg font-bold text-accent-600">{project.beneficiaries_count}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Funding Progress</span>
                              <span>{Math.round((project.raised / project.budget) * 100)}%</span>
                            </div>
                            <ProgressBar
                              value={project.raised}
                              max={project.budget}
                              variant="primary"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Edit Project</Button>
                            <Button variant="primary" size="sm">Update Status</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <School className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-500 mb-4">Create your first project to start making an impact.</p>
                  <Link to="/projects/new">
                    <Button variant="primary">Create Project</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Supported Students</h2>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                Add Student
              </Button>
            </div>

            {/* Search and Filter */}
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
                        placeholder="Search students..."
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                  <div className="sm:w-auto flex space-x-2">
                    <select className="form-input bg-white">
                      <option>All Grades</option>
                      <option>Elementary</option>
                      <option>Middle School</option>
                      <option>High School</option>
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Graduated</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {loadingStudents ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : ngoStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ngoStudents.map((student) => (
                  <Card key={student.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                            <GraduationCap className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{student.user_name}</h3>
                            <p className="text-sm text-gray-600">{student.user_email}</p>
                          </div>
                        </div>
                        <Badge
                          variant={student.ngo_status === 'active' ? 'success' : 'warning'}
                        >
                          {student.ngo_status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>{student.school} • {student.grade}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Added {formatDate(student.ngo_added_at)}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Funding Progress</span>
                          <span>{formatCurrency(student.funding_received || 0)} / {formatCurrency(student.funding_needed || 0)}</span>
                        </div>
                        <ProgressBar
                          value={student.funding_received || 0}
                          max={student.funding_needed || 1}
                          variant="primary"
                        />
                      </div>

                      {student.ngo_notes && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 italic">"{student.ngo_notes}"</p>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="primary" size="sm">Update</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students yet</h3>
                  <p className="text-gray-500 mb-4">Add students to your NGO to start supporting their education.</p>
                  <Button variant="primary">Add First Student</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Project Reports</h2>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                Request Report
              </Button>
            </div>

            {/* Search and Filter */}
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
                      <option>All Projects</option>
                      {ngoProjects.map(project => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                      ))}
                    </select>
                    <select className="form-input bg-white">
                      <option>All Statuses</option>
                      <option>Draft</option>
                      <option>Completed</option>
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
            ) : ngoReports.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monitoring Agent
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
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
                        {ngoReports.map((report) => (
                          <tr key={report.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.projectName}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{report.content.substring(0, 50)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">Stage {report.stage}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {report.monitoring_agent_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(report.created_at)}
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
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Download</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                  <p className="text-gray-500 mb-4">Reports will appear here once monitoring agents submit them for your projects.</p>
                  <Button variant="primary">Request Report</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODashboardPage;