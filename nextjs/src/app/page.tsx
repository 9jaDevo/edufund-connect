import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Shield, TrendingUp, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparent Education Funding That Makes a Difference
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              Connect donors with verified students and projects. Track every dollar with independent monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Get Started
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EduFund Connect?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We ensure every donation reaches its intended recipient with full transparency and accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Projects</h3>
              <p className="text-gray-600">
                All students and projects verified through local NGO partners
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Independent Monitoring</h3>
              <p className="text-gray-600">
                Regular progress verification by monitoring agents
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Staged Disbursement</h3>
              <p className="text-gray-600">
                Funds released in stages based on verified milestones
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-error-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-error-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Get notifications on student progress and fund utilization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of donors and organizations transforming education through transparent funding
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=donor">
              <Button size="lg" variant="primary">
                Become a Donor
              </Button>
            </Link>
            <Link href="/register?role=ngo">
              <Button size="lg" variant="outline">
                Register Your NGO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduFund Connect</h3>
              <p className="text-gray-400">
                Empowering transparent sponsorship for students and community projects.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/projects" className="hover:text-white">Browse Projects</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduFund Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
