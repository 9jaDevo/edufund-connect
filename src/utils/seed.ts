import { seedDatabase } from './supabase-seed';

// Run the seeding function
seedDatabase()
  .then(() => console.log('Database seeded successfully'))
  .catch((error) => console.error('Error seeding database:', error));