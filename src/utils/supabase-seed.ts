import { supabase } from '../lib/supabase';
import { UserRole } from '../types';

export async function seedDatabase() {
  try {
    // Insert demo users
    const { data: users, error: usersError } = await supabase.from('users').insert([
      {
        email: 'donor@example.com',
        name: 'John Donor',
        role: UserRole.DONOR,
        is_verified: true,
        country: 'US',
        city: 'New York',
        reputation_score: 95,
      },
      {
        email: 'student@example.com',
        name: 'Michael Johnson',
        role: UserRole.STUDENT,
        is_verified: true,
        country: 'Kenya',
        city: 'Nairobi',
      },
      {
        email: 'ngo@example.com',
        name: 'Global Education Initiative',
        role: UserRole.NGO,
        is_verified: true,
        country: 'Kenya',
        city: 'Nairobi',
        reputation_score: 92,
      },
      {
        email: 'agent@example.com',
        name: 'Mary Monitor',
        role: UserRole.MONITORING_AGENT,
        is_verified: true,
        country: 'Kenya',
        city: 'Nairobi',
        monitoring_area: {
          center: { lat: -1.2921, lng: 36.8219 },
          radius: 50
        },
        reputation_score: 98,
      },
      {
        email: 'admin@example.com',
        name: 'Admin User',
        role: UserRole.ADMIN,
        is_verified: true,
        country: 'US',
        city: 'San Francisco',
      },
    ]).select();

    if (usersError) throw usersError;

    // Get users for reference
    const studentUser = users?.find(u => u.role === UserRole.STUDENT);
    const ngoUser = users?.find(u => u.role === UserRole.NGO);
    const donorUser = users?.find(u => u.role === UserRole.DONOR);
    const monitoringAgent = users?.find(u => u.role === UserRole.MONITORING_AGENT);

    if (!studentUser || !ngoUser || !donorUser || !monitoringAgent) {
      throw new Error('Required users not found');
    }

    // Insert student profiles
    const { data: students, error: studentsError } = await supabase.from('students').insert([
      {
        user_id: studentUser.id,
        school: 'Greenwood Academy',
        grade: 'Grade 10',
        birth_date: '2008-05-15',
        story: 'Michael dreams of becoming a doctor to help his community. He has consistently been at the top of his class despite facing many challenges at home. His mother is a single parent who works as a cleaner to support their family of four.',
        goals: 'Complete high school with top grades\nAttend university to study medicine\nReturn to his community as a doctor to improve healthcare access',
        funding_needed: 1200,
        funding_received: 450,
      },
    ]).select();

    if (studentsError) throw studentsError;

    // Insert NGO-Student relationships
    const { error: ngoStudentError } = await supabase.from('ngo_students').insert([
      {
        ngo_id: ngoUser.id,
        student_id: students[0].id,
        status: 'active',
        notes: 'Exceptional student with strong academic performance',
      },
    ]);

    if (ngoStudentError) throw ngoStudentError;

    // Insert projects
    const { data: projects, error: projectsError } = await supabase.from('projects').insert([
      {
        ngo_id: ngoUser.id,
        title: 'Computer Lab for Greenwood Academy',
        description: 'Setting up a modern computer lab with 20 workstations to serve 200 students',
        location: 'Nairobi, Kenya',
        budget: 15000,
        project_type: 'infrastructure',
        beneficiaries_count: 200,
        start_date: '2024-03-01',
        end_date: '2024-06-30',
        location_lat: -1.2921,
        location_long: 36.8219,
        status: 'active',
      },
      {
        ngo_id: ngoUser.id,
        title: 'Library Renovation Project',
        description: 'Renovating and restocking the school library to improve learning resources',
        location: 'Mombasa, Kenya',
        budget: 8000,
        project_type: 'infrastructure',
        beneficiaries_count: 150,
        start_date: '2024-02-01',
        end_date: '2024-04-30',
        location_lat: -4.0435,
        location_long: 39.6682,
        status: 'pending',
      },
    ]).select();

    if (projectsError) throw projectsError;

    // Insert project donations
    const { error: donationsError } = await supabase.from('project_donations').insert([
      {
        project_id: projects[0].id,
        donor_id: donorUser.id,
        amount: 5000,
        status: 'completed',
        message: 'Happy to support technology education!',
      },
      {
        project_id: projects[1].id,
        donor_id: donorUser.id,
        amount: 2000,
        status: 'completed',
        message: 'Books are the gateway to knowledge',
      },
    ]);

    if (donationsError) throw donationsError;

    // Insert project reports
    const { error: reportsError } = await supabase.from('project_reports').insert([
      {
        project_id: projects[0].id,
        monitoring_agent_id: monitoringAgent.id,
        stage: 1,
        content: 'Initial site assessment completed. Location is suitable for computer lab setup.',
        status: 'completed',
        location_lat: -1.2921,
        location_long: 36.8219,
      },
    ]);

    if (reportsError) throw reportsError;

    // Insert funds
    const { data: funds, error: fundsError } = await supabase.from('funds').insert([
      {
        donor_id: donorUser.id,
        student_id: students[0].id,
        amount: 450,
        status: 'active',
        monitoring_agent_id: monitoringAgent.id,
        purpose: 'School fees and materials',
      },
    ]).select();

    if (fundsError) throw fundsError;

    // Insert disbursements
    const { error: disbursementsError } = await supabase.from('disbursements').insert([
      {
        fund_id: funds[0].id,
        amount: 150,
        status: 'completed',
        batch: 1,
        monitoring_report: 'First term fees paid, student attending regularly',
      },
    ]);

    if (disbursementsError) throw disbursementsError;

    // Insert monitoring reports
    const { error: monitoringReportsError } = await supabase.from('monitoring_reports').insert([
      {
        fund_id: funds[0].id,
        monitoring_agent_id: monitoringAgent.id,
        content: 'Student is performing well in classes and maintaining good attendance',
        status: 'completed',
      },
    ]);

    if (monitoringReportsError) throw monitoringReportsError;

    // Insert ratings
    const { error: ratingsError } = await supabase.from('ratings').insert([
      {
        rater_id: donorUser.id,
        rated_id: monitoringAgent.id,
        score: 5,
        comment: 'Excellent monitoring and communication',
      },
      {
        rater_id: ngoUser.id,
        rated_id: monitoringAgent.id,
        score: 5,
        comment: 'Very thorough and professional',
      },
    ]);

    if (ratingsError) throw ratingsError;

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}