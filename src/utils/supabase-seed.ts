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
      },
      {
        email: 'student@example.com',
        name: 'Jane Student',
        role: UserRole.STUDENT,
        is_verified: true,
      },
      {
        email: 'ngo@example.com',
        name: 'Global Education Initiative',
        role: UserRole.NGO,
        is_verified: true,
      },
      {
        email: 'agent@example.com',
        name: 'Mary Monitor',
        role: UserRole.MONITORING_AGENT,
        is_verified: true,
        monitoring_area: {
          center: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          radius: 50 // km
        }
      },
      {
        email: 'admin@example.com',
        name: 'Admin User',
        role: UserRole.ADMIN,
        is_verified: true,
      },
    ]).select();

    if (usersError) throw usersError;

    // Get users for reference
    const studentUser = users?.find(u => u.role === UserRole.STUDENT);
    const ngoUser = users?.find(u => u.role === UserRole.NGO);
    if (!studentUser || !ngoUser) throw new Error('Required users not found');

    // Insert student profile
    const { data: student, error: studentError } = await supabase.from('students').insert({
      user_id: studentUser.id,
      school: 'Greenwood Academy',
      grade: 'Grade 10',
      story: 'Jane is a dedicated student with a passion for science...',
      goals: 'Complete high school with top grades\nStudy medicine at university',
      funding_needed: 1200,
      funding_received: 450,
    }).select().single();

    if (studentError) throw studentError;

    // Insert NGO-Student relationship
    const { error: ngoStudentError } = await supabase.from('ngo_students').insert({
      ngo_id: ngoUser.id,
      student_id: student.id,
      status: 'active',
      notes: 'Part of our STEM education program'
    });

    if (ngoStudentError) throw ngoStudentError;

    // Insert demo project
    const { data: project, error: projectError } = await supabase.from('projects').insert({
      ngo_id: ngoUser.id,
      title: 'Computer Lab for Greenwood Academy',
      description: 'Setting up a modern computer lab with 20 workstations to serve 200 students',
      location: 'Nairobi, Kenya',
      budget: 15000,
      project_type: 'infrastructure',
      beneficiaries_count: 200,
      start_date: '2024-03-01',
      end_date: '2024-06-30'
    }).select().single();

    if (projectError) throw projectError;

    // Link project to categories
    const { data: categories, error: categoriesError } = await supabase
      .from('project_categories')
      .select('id')
      .in('name', ['Technology', 'Education Infrastructure']);

    if (categoriesError) throw categoriesError;

    if (categories) {
      const { error: mapError } = await supabase.from('project_categories_map').insert(
        categories.map(cat => ({
          project_id: project.id,
          category_id: cat.id
        }))
      );

      if (mapError) throw mapError;
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}