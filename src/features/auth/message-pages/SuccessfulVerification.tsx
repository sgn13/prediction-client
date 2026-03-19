import { useNavigate } from '@tanstack/react-router'
import { BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'

export function SuccessfulVerification() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <div className='h-full'>
          <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-3'>
            <h1 className='text-[6rem] text-green-500'>
              <BadgeCheck />
            </h1>

            <span className='text-lg font-semibold'>
              Email Successfully Verified 🎉
            </span>

            <p className='text-center text-muted-foreground'>
              Your account has been successfully verified. <br />
              You can now log in to access your account.
            </p>

            <div className='mt-6 flex gap-4'>
              <Button
                variant='outline'
                onClick={() => navigate({ to: '/sign-in' })}
              >
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </AuthLayout>
  )
}
