import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'

type AppType = 'all' | 'connected' | 'notConnected'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

export function LeagueLayout({ children }) {
  const navigate = useNavigate()

  return (
    <>
      <Header>
        <TopNav links={[]} />
        <div className='ms-auto flex items-center space-x-4'>
          {/* <Search /> */}
          {/* <ThemeSwitch /> */}
          {/* <ConfigDrawer /> */}
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger
                value='overview'
                onClick={() => {
                  navigate({ to: '/' })
                }}
              >
                Prediction
              </TabsTrigger>
              <TabsTrigger
                value='analytics'
                onClick={() => {
                  navigate({ to: '/league' })
                }}
              >
                League
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <br />
        {/* <div className='grid grid-cols-1 gap-16 lg:grid-cols-8'> */}

        <div className='grid gap-16 lg:grid-cols-8'>{children}</div>
      </Main>
    </>
  )
}
