import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import useLeagueStore from '@/stores/league'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales({ leagueId = '69982ff79975d1cc64e07e6e' }) {
  const navigate = useNavigate()

  const { fetchLeagues, leagues } = useLeagueStore()

  useEffect(() => {
    fetchLeagues({})
  }, [])

  return (
    <div className='space-y-2'>
      {leagues?.map((league) => {
        return (
          <div
            className={`flex cursor-pointer items-center gap-4 rounded-sm p-2 ${leagueId === league?.leagueId ? 'bg-gradient-to-r from-lime-600 to-green-400 text-white' : ''}`}
            onClick={() => navigate({ to: `/league/${league?.leagueId}` })}
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
        )
      })}
    </div>
  )
}
