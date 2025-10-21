import Link from 'next/link'
import { Bell, User } from 'lucide-react'
import { LogoutButton } from '@/components/layout/logout-button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-primary-500">
              EduFund Connect
            </Link>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full"></span>
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </button>

              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        {children}
      </main>
    </div>
  )
}
