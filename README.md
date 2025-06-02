# EduFund Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

EduFund Connect is a transparent educational funding platform that connects donors with verified students, ensuring accountability through independent monitoring and staged fund disbursement.

## Features

- **Transparent Fund Management**: Track every donation from receipt to impact
- **Verified Students**: All beneficiaries are verified through local NGO partners
- **Independent Monitoring**: Regular progress verification by monitoring agents
- **Staged Disbursement**: Funds released in stages based on verified milestones
- **Multi-language Support**: Platform available in English and Spanish
- **Real-time Updates**: Get notifications on student progress and fund utilization

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Payment Processing**: Stripe
- **Maps Integration**: Google Maps API
- **Internationalization**: i18next
- **Form Handling**: React Hook Form
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- Stripe account (for payments)
- Google Maps API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/edufund-connect.git
   cd edufund-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_RECAPTCHA_V3_SITE_KEY=your_recaptcha_v3_key
   VITE_RECAPTCHA_V2_SITE_KEY=your_recaptcha_v2_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

1. Run Supabase migrations:
   ```bash
   supabase db reset
   ```

2. Seed the database:
   ```bash
   npm run seed
   ```

## Project Structure

```
edufund-connect/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── stores/        # Zustand stores
│   ├── services/      # API and service functions
│   ├── utils/         # Helper functions
│   ├── types/         # TypeScript types
│   └── lib/           # Third-party library configurations
├── public/
│   └── locales/       # i18n translation files
└── supabase/
    ├── functions/     # Edge functions
    └── migrations/    # Database migrations
```

## User Roles

- **Donors**: Support students and track their progress
- **Students**: Create profiles and receive funding
- **NGOs**: Verify students and manage projects
- **Monitoring Agents**: Verify fund utilization
- **Administrators**: Platform management

## Key Features

### For Donors
- Browse verified student profiles
- Make secure donations
- Track fund utilization
- Receive progress reports
- Earn reputation badges

### For Students
- Create detailed profiles
- Track funding progress
- Submit academic updates
- Communicate with donors
- Access educational resources

### For NGOs
- Verify student information
- Create and manage projects
- Monitor fund disbursement
- Generate impact reports
- Coordinate with monitoring agents

### For Monitoring Agents
- Conduct site visits
- Verify fund utilization
- Submit monitoring reports
- Track student progress
- Ensure accountability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- ReCAPTCHA v3 for bot prevention
- Rate limiting on API endpoints
- Input sanitization
- File type validation
- Secure file uploads
- Regular security audits

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@edufundconnect.com or join our Slack channel.

## Acknowledgments

- All the donors making education accessible
- Partner NGOs and educational institutions
- Monitoring agents ensuring transparency
- The open-source community