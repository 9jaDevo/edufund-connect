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
        email: 'agent@example.com',
        name: 'Mary Monitor',
        role: UserRole.MONITORING_AGENT,
        is_verified: true,
      },
      {
        email: 'admin@example.com',
        name: 'Admin User',
        role: UserRole.ADMIN,
        is_verified: true,
      },
    ]).select();

    if (usersError) throw usersError;

    // Get the student user for reference
    const studentUser = users?.find(u => u.role === UserRole.STUDENT);
    if (!studentUser) throw new Error('Student user not found');

    // Insert student profile
    const { error: studentError } = await supabase.from('students').insert({
      user_id: studentUser.id,
      school: 'Greenwood Academy',
      grade: 'Grade 10',
      story: 'Jane is a dedicated student with a passion for science...',
      goals: 'Complete high school with top grades\nStudy medicine at university',
      funding_needed: 1200,
      funding_received: 450,
    });

    if (studentError) throw studentError;

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}