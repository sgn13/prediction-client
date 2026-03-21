import { useNavigate } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth/auth-layout'

export function Home() {
  const navigate = useNavigate()

  return (
    <>
      <AuthLayout showHeader={false}>
        <Card className='gap-4 bg-gradient-to-r from-white to-fuchsia-50'>
          <CardHeader>
            <CardTitle className='text-3xl tracking-tight'>
              Welcome to Crazy Prediction ⚽
            </CardTitle>
            <CardDescription className='mt-2'>
              Predict match scores, compete with friends, and climb the
              leaderboard.
              <br />
              <br />
              Login to start making your predictions and join leagues.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className='my-4 flex flex-col gap-3'>
              <Button className='' onClick={() => navigate({ to: '/sign-in' })}>
                <LogIn />
                Login
              </Button>

              <Button
                variant='outline'
                className=''
                onClick={() => navigate({ to: '/sign-up' })}
              >
                Create Account
              </Button>
            </div>
            <p className='mt-2 text-xs text-muted-foreground'>
              Join leagues, predict scores, and win points every week!
            </p>
          </CardContent>
        </Card>
      </AuthLayout>
    </>
  )
}
