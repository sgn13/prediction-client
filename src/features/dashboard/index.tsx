import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getRouteApi } from '@tanstack/react-router'
import useAppStore from '@/stores/app'
import useFixtureStore from '@/stores/fixtureStore'
import useGameweekStore from '@/stores/gameweekStore'
import useLeagueStore from '@/stores/league'
import useLeagueFixtureStore from '@/stores/leagueFixtureStore'
import EPLJson from '@/constants/epl.json'
import { Epl_Team_Flag } from '@/constants/epl_logos'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { SelectDropdown } from '@/components/select-dropdown'
import { LeagueDashboard } from './components/leagueDashboard'
import { RecentSales } from './components/leagueHome'
import { UsersProvider } from './components/users-provider'

const route = getRouteApi('/_authenticated/')

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  status: z.string().min(1, 'Please select a status.'),
  label: z.string().min(1, 'Please select a label.'),
  priority: z.string().min(1, 'Please choose a priority.'),
})
type TaskForm = z.infer<typeof formSchema>

export function Dashboard() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { user } = useAppStore()
  const { fetchLeagues, leagues } = useLeagueStore()
  const { fetchFixtures, fixtures } = useFixtureStore()
  const { fetchGameweeks, gameweeks } = useGameweekStore()
  const { fetchLeagueFixtures, leagueFixtures } = useLeagueFixtureStore()

  const [gameweekId, setGameweekId] = useState('69a2fdac4325f3340bf36c19')
  const [selectedLeague, setSelectedLeague] = useState(null)

  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  useEffect(() => {
    fetchLeagues({})
    fetchGameweeks({})
  }, [])

  // useEffect(() => {
  //   fetchFixtures({
  //     query: {
  //       gameweekId: gameweekId || '69a2fdac4325f3340bf36c19',
  //     },
  //   })
  // }, [gameweekId])

  useEffect(() => {
    fetchLeagueFixtures({
      query: {
        gameweekId: gameweekId || '69a2fdac4325f3340bf36c19',
        leagueId: selectedLeague?.leagueId || '69982ff79975d1cc64e07e6e',
      },
    })
  }, [gameweekId, selectedLeague])

  console.log({ leagueFixtures })

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          {/* <ThemeSwitch /> */}
          {/* <ConfigDrawer /> */}
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        {/* <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div> */}
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

        <div className='grid grid-cols-1 gap-16 lg:grid-cols-8'>
          <div className='col-span-1 grid gap-4 lg:col-span-4'>
            <div>
              {' '}
              {gameweeks?.map((gameweek) => {
                return (
                  <span onClick={() => setGameweekId(gameweek?._id)}>
                    {gameweek?.round_name}
                  </span>
                )
              })}
              {leagueFixtures?.map((matchObj) => {
                return (
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        djkdj
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex'>
                        <div className='col-span-1 flex flex-3 flex-col items-center text-center lg:col-span-3'>
                          <div className='text-2xl font-bold'>
                            {/* {matchObj?.teams?.home?.logo} */}
                            <img
                              src={`${
                                Epl_Team_Flag[
                                  `${matchObj?.match_id?.home_team_name}`
                                ]?.image
                              }`}
                              width={40}
                            />
                          </div>
                          <div className='font-semi-bold text-xs'>
                            {matchObj?.match_id?.home_team_name}
                          </div>
                        </div>
                        <div className='flex-6'>
                          <Form {...form}>
                            <form
                              id='tasks-form'
                              // onSubmit={form.handleSubmit(onSubmit)}
                              // className='flex flex-row items-center justify-between space-y-0 pb-2'
                              className='flex justify-between gap-4 space-y-6 overflow-y-auto px-4'
                            >
                              <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                  <FormItem>
                                    {/* <FormLabel>Title</FormLabel> */}
                                    <FormControl>
                                      <Input
                                        type='number'
                                        {...field}
                                        placeholder='?'
                                        value={matchObj?.match_id?.home_score}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div>-</div>
                              <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                  <FormItem>
                                    {/* <FormLabel>Title</FormLabel> */}
                                    <FormControl>
                                      <Input
                                        type='number'
                                        {...field}
                                        placeholder='?'
                                        value={matchObj?.match_id?.away_score}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                        </div>
                        <div className='col-span-1 flex flex-3 flex-col items-center text-center lg:col-span-3'>
                          <div className='text-2xl font-bold'>
                            <img
                              src={`${
                                Epl_Team_Flag[
                                  `${matchObj?.match_id?.away_team_name}`
                                ]?.image
                              }`}
                              width={40}
                            />
                          </div>

                          <div className='font-semi-bold text-2xl text-xs'>
                            {matchObj?.match_id?.away_team_name}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            {/* <hr />
            {EPLJson?.response
              ?.filter(
                (matchFilterObj) =>
                  matchFilterObj?.league?.name === 'Premier League' &&
                  matchFilterObj?.league?.country === 'England'
              )
              ?.map((matchObj) => {
                return (
                  <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        {matchObj?.league?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex'>
                        <div className='col-span-1 flex flex-3 flex-col items-center text-center lg:col-span-3'>
                          <div className='text-2xl font-bold'>
                            <img
                              src={`${matchObj?.teams?.home?.logo}`}
                              width={40}
                            />
                          </div>
                          <div className='font-semi-bold text-xs'>
                            {matchObj?.teams?.home?.name}
                          </div>
                        </div>
                        <div className='flex-6'>
                          <Form {...form}>
                            <form
                              id='tasks-form'
                              // onSubmit={form.handleSubmit(onSubmit)}
                              // className='flex flex-row items-center justify-between space-y-0 pb-2'
                              className='flex justify-between gap-4 space-y-6 overflow-y-auto px-4'
                            >
                              <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type='number'
                                        {...field}
                                        placeholder='?'
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div>-</div>
                              <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type='number'
                                        {...field}
                                        placeholder='?'
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                        </div>
                        <div className='col-span-1 flex flex-3 flex-col items-center text-center lg:col-span-3'>
                          <div className='text-2xl font-bold'>
                            <img
                              src={`${matchObj?.teams?.away?.logo}`}
                              width={40}
                            />
                          </div>

                          <div className='font-semi-bold text-2xl text-xs'>
                            {matchObj?.teams?.away?.name}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })} */}
          </div>
          <div className='col-span-1 grid content-start gap-4 lg:col-span-4'>
            <Card className='bg-gradient-to-r from-lime-600 to-green-400 text-white'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Week Point
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <div className='col-span-1 lg:col-span-3'>
                    {/* <div className='text-2xl font-bold'>🔷</div> */}
                    <p className='text-xs'>+20</p>
                    <div className='font-semi-bold text-xl'>Silver</div>
                  </div>
                  <div className='col-span-1 lg:col-span-3'>
                    {/* <div className='text-2xl font-bold'>🔷</div> */}

                    <p className='text-xs'>+30</p>

                    <div className='font-semi-bold text-2xl text-xl'>Gold</div>
                  </div>
                  <div>
                    {/* <div className='text-2xl font-bold'>🔷</div> */}

                    <p className='text-xs'>+20</p>

                    <div className='font-semi-bold text-xl'>Premium</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=''>
              <CardHeader>
                <CardTitle>My leagues</CardTitle>
                <CardDescription>Your league positions</CardDescription>
              </CardHeader>
              <CardContent>
                <UsersProvider>
                  <LeagueDashboard
                    handleClick={(leagueObj) => setSelectedLeague(leagueObj)}
                  />
                </UsersProvider>

                {/* <UsersProvider>
                  <UsersTable
                    data={leagues}
                    search={search}
                    navigate={navigate}
                    columns={usersColumns}
                  />
                </UsersProvider> */}

                {/* {user ? (
                  <RecentSales />
                ) : (
                  <div>
                    <div>Login to join the league</div>
                    <div>Sign Up</div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}

export const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
