import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'

type AuthLayoutProps = {
  children: React.ReactNode
  showHeader?: Boolean
}

export function AuthLayout({ showHeader = true, children }: AuthLayoutProps) {
  return (
    <>
      {showHeader ? (
        <Header>
          <TopNav links={[]} />
          <div className='ms-auto flex items-center space-x-4'>
            {/* <Search /> */}
            {/* <ThemeSwitch /> */}
            {/* <ConfigDrawer /> */}
            <ProfileDropdown />
          </div>
        </Header>
      ) : null}
      <Main>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-7'>
          <div className='col-span-1 grid gap-4 lg:col-span-3'>
            {[1, 2, 3, 4]?.map(() => (
              <Card className='bg-gradient-to-r from-white to-sky-50'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    League Name
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <div className='col-span-1 flex flex-col items-center text-center lg:col-span-3'>
                      <div className='text-2xl font-bold'>-</div>
                      <div className='font-semi-bold text-xs'>Home Team</div>
                    </div>
                    <div className='col-span-1 flex flex-col items-center text-center lg:col-span-3'>
                      <div className='text-2xl font-bold'>-</div>

                      <div className='font-semi-bold text-2xl text-xs'>
                        Away Team
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='col-span-1 grid gap-4 lg:col-span-4'>{children}</div>
        </div>
      </Main>
    </>
  )
}
