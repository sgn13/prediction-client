import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import useLeagueStore from '@/stores/league'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function LeagueDashboard({ handleClick }) {
  const navigate = useNavigate()
  const [selectedLeague, setSelectedLeague] = useState({
    leagueId: '69982ff79975d1cc64e07e6e',
    name: 'Global League',
    type: 'GLOBAL',
    season: '2026/27',
    role: 'MEMBER',
    totalPoints: 0,
    silverPoints: 0,
    goldPoints: 0,
    premiumPoints: 0,
  })

  const { fetchLeagues, leagues } = useLeagueStore()

  useEffect(() => {
    fetchLeagues({})
  }, [])

  return (
    <div className='space-y-2'>
      {leagues?.map((league) => {
        return (
          <div className='flex items-center gap-4'>
            <div
              className={`flex flex-15 cursor-pointer items-center gap-4 rounded-sm p-2 ${selectedLeague?.leagueId === league?.leagueId ? 'bg-gradient-to-r from-lime-600 to-green-400 text-white' : ''}`}
              onClick={() => {
                setSelectedLeague(league)
                handleClick(league)
              }}
              style={{
                background:
                  selectedLeague?.name === league?.name ? 'green' : 'none',
              }}
            >
              <Avatar className='h-9 w-9'>
                <AvatarImage src='/avatars/01.png' alt='Avatar' />
                <AvatarFallback className='text-muted-foreground'>
                  OM
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-1 flex-wrap items-center justify-between'>
                <div className='space-y-1'>
                  <p className='text-sm leading-none font-medium'>
                    {league?.name}
                  </p>
                </div>
                <div className='font-medium'>+$1,999.00</div>
              </div>
            </div>
            <div className='flex-1'>
              {league?.role === 'ADMIN' ? (
                <Settings size={14} className='cursor-pointer' />
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
