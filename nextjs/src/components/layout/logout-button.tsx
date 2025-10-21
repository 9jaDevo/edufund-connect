'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error('Failed to logout')
        return
      }

      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      toast.error('An error occurred during logout')
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      leftIcon={<LogOut className="h-4 w-4" />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
