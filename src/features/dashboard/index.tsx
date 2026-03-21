import { z } from 'zod'
import { getRouteApi } from '@tanstack/react-router'
import useAppStore from '@/stores/app'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { Home } from './Home'
import { PredictionHome } from './PredictionHome'

const route = getRouteApi('/_authenticated/')

const formSchema = z.object({
  // fixture_id: z.string().min(1, 'Title is required.'),
  // fantasy_league_id: z.string().min(1, 'Please select a status.'),
  predicted_home_score: z.string().min(2, 'Please select a label.'),
  predicted_away_score: z.string().min(2, 'Please choose a priority.'),
})
type TaskForm = z.infer<typeof formSchema>

export function Dashboard() {
  const { user } = useAppStore()

  console.log({ user })
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
      {user ? <PredictionHome /> : <Home />}
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
