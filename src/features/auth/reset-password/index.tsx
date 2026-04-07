import { Link, useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { ResetPasswordForm } from './components/reset-password-form'

export function ResetPassword() {
  const { redirect } = useSearch({ from: '/(auth)/reset-password/$token' })

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Reset password
          </CardTitle>
          <CardDescription>
            Enter your email to reset your password. <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm redirectTo={redirect} />
        </CardContent>
        <CardFooter>
          <div>
            <div className='mb-4 px-8 text-center text-sm text-muted-foreground'>
              Already have an account yet?
              <Link
                to='/sign-in'
                className='text-primary underline underline-offset-4 hover:text-muted-foreground'
              >
                Login
              </Link>
            </div>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking sign in, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
