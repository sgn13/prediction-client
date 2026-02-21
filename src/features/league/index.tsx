import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import useAppStore from '@/stores/app'
import useLeagueStore from '@/stores/league'
import useLeagueUserStore from '@/stores/leagueUsers'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LeagueForm } from '@/features/league/LeagueForm'
import { UsersTable } from '../dashboard/components/dashboard-table'
import { RecentSales } from '../dashboard/components/leagueHome'
import { leagueUsersColumns } from '../dashboard/components/users-columns'
import { JoinLeagueForm } from './JoinLeagueForm'
import { LeagueLayout } from './components/LeagueLayout'

const route = getRouteApi('/_authenticated/league/')
type AppType = 'all' | 'connected' | 'notConnected'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])
export function League() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const {
    filter = '',
    type = 'all',
    sort: initSort = 'asc',
  } = route.useSearch()

  // const { setOpen } = useUsers()
  const { user } = useAppStore()
  const { fetchLeagues, leagues } = useLeagueStore()
  const { fetchLeagueUsers, leagueUsers } = useLeagueUserStore()
  const [searchTerm, setSearchTerm] = useState(filter)
  const [appType, setAppType] = useState(type)

  const [open, setOpen] = useState(null)

  const [leagueId, setLeagueId] = useState('698ae219082176b99bd9e7ee')

  useEffect(() => {
    fetchLeagues({})
  }, [])

  useEffect(() => {
    fetchLeagueUsers({ id: leagueId || '698ae219082176b99bd9e7ee' })
  }, [leagueId])

  return (
    <LeagueLayout>
      <div className='col-span-1 grid gap-4 lg:col-span-4'>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>My leagues</CardTitle>
            <CardDescription>Your league positions</CardDescription>
            <Select
            // value={appType} onValueChange={handleTypeChange}
            >
              <SelectTrigger className='w-full'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Apps</SelectItem>
                <SelectItem value='connected'>Connected</SelectItem>
                <SelectItem value='notConnected'>Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <UsersTable
              data={leagueUsers}
              columns={leagueUsersColumns}
              search={search}
              navigate={navigate}
            />

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
      <div className='col-span-1 grid gap-4 lg:col-span-4'>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>My leagues</CardTitle>
            <CardDescription>Your league positions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />

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

        <Card className='col-span-1 lg:col-span-3'>
          <CardContent className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
            <Card className='col-span-1 lg:col-span-8'>
              <CardHeader>
                <CardDescription>
                  Do you have a league code?{' '}
                  <Button
                    variant='outline'
                    size='sm'
                    className={'border'}
                    onClick={() => setOpen('join')}
                  >
                    Join
                  </Button>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='col-span-1 lg:col-span-8'>
              <CardHeader>
                <CardDescription>
                  Looking to start a league?{' '}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setOpen('create')}
                  >
                    Create
                  </Button>
                </CardDescription>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>
      </div>
      <LeagueForm open={open} onOpenChange={() => setOpen(null)} />
      <JoinLeagueForm open={open} onOpenChange={() => setOpen(null)} />
    </LeagueLayout>
  )
}
