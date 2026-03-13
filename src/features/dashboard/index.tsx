import { useEffect, useState } from 'react'
import { z } from 'zod'
import { getRouteApi } from '@tanstack/react-router'
import useAppStore from '@/stores/app'
import useGameweekStore from '@/stores/gameweekStore'
import useLeagueStore from '@/stores/league'
import useLeagueFixtureStore from '@/stores/leagueFixtureStore'
import usePredictionStore from '@/stores/predictionStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { FixturePrediction } from './FixturePrediction'
import { LeagueDashboard } from './components/leagueDashboard'
import { UsersProvider } from './components/users-provider'

const route = getRouteApi('/_authenticated/')

const formSchema = z.object({
  // fixture_id: z.string().min(1, 'Title is required.'),
  // fantasy_league_id: z.string().min(1, 'Please select a status.'),
  predicted_home_score: z.string().min(2, 'Please select a label.'),
  predicted_away_score: z.string().min(2, 'Please choose a priority.'),
})
type TaskForm = z.infer<typeof formSchema>

export function Dashboard() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { user } = useAppStore()
  const { fetchLeagues, leagues } = useLeagueStore()
  const { fetchGameweeks, gameweeks } = useGameweekStore()
  const { fetchLeagueFixtures, leagueFixtures } = useLeagueFixtureStore()
  const { postPrediction, fetchPredictions, predictions } = usePredictionStore()

  const [gameweekId, setGameweekId] = useState('69a2fdac4325f3340bf36c19')
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [selectedFixture, setSelectedFixture] = useState(null)

  const [predictionInputs, setPredictionInputs] = useState({})
  console.log({ predictions })

  useEffect(() => {
    fetchLeagues({})
    fetchGameweeks({})
  }, [])

  useEffect(() => {
    if (!predictions) return

    setPredictionInputs((prev) => {
      const updated = { ...prev }

      predictions.forEach((p) => {
        if (!updated[p.fixture_id]) {
          updated[p.fixture_id] = {
            predicted_home_score: p.predicted_home_score,
            predicted_away_score: p.predicted_away_score,
          }
        }
      })

      return updated
    })
  }, [predictions])

  useEffect(() => {
    fetchLeagueFixtures({
      query: {
        gameweekId: gameweekId || '69a2fdac4325f3340bf36c19',
        leagueId: selectedLeague?.leagueId || '69982ff79975d1cc64e07e6e',
      },
    })
  }, [gameweekId, selectedLeague])

  useEffect(() => {
    fetchPredictions({ query: { fantasy_league_id: selectedLeague?.leagueId } })
  }, [selectedLeague])

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
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

        <div className='grid grid-cols-1 gap-16 lg:grid-cols-8'>
          <div className='col-span-1 grid gap-4 lg:col-span-4'>
            <div>
              {' '}
              {/* {gameweeks?.map((gameweek) => {
                return (
                  <span onClick={() => setGameweekId(gameweek?._id)}>
                    {gameweek?.round_name}
                  </span>
                )
              })} */}
              {leagueFixtures?.map((matchObj) => {
                return (
                  <FixturePrediction
                    key={matchObj.match_id._id}
                    matchObj={matchObj}
                    prediction={predictionInputs[matchObj.match_id._id]}
                    setPredictionInputs={setPredictionInputs}
                    selectedLeague={selectedLeague}
                  />
                )
              })}
            </div>
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
