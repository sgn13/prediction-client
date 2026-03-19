import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { BadgeCheck } from 'lucide-react'
import useAppStore from '@/stores/app'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'

export function Verification() {
  const navigate = useNavigate()
  const { verify } = useAppStore()
  const { token } = useParams({ from: '/(auth)/verify/$token' })
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )

  useEffect(() => {
    if (!token) return

    const verifyUser = async () => {
      try {
        await verify({ token })
        setStatus('success')
      } catch (error) {
        setStatus('error')
      }
    }

    verifyUser()
  }, [token])
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <div className='h-full'>
          <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-3'>
            {/* 🔄 Loading */}
            {status === 'loading' && (
              <>
                <span className='text-lg font-semibold'>
                  Verifying your account...
                </span>
              </>
            )}

            {/* ✅ Success */}
            {status === 'success' && (
              <>
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

                <Button
                  className='mt-6'
                  onClick={() => navigate({ to: '/sign-in' })}
                >
                  Go to Login
                </Button>
              </>
            )}

            {/* ❌ Error */}
            {status === 'error' && (
              <>
                <h1 className='text-[6rem] text-red-500'>
                  <XCircle />
                </h1>

                <span className='text-lg font-semibold'>
                  Invalid or Expired Link
                </span>

                <p className='text-center text-muted-foreground'>
                  This verification link is invalid or has expired. <br />
                  Please request a new verification email.
                </p>

                <Button
                  className='mt-6'
                  onClick={() => navigate({ to: '/sign-in' })}
                >
                  Back to Login
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </AuthLayout>
  )
}
