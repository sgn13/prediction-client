import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import useLeagueStore from '@/stores/league'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  const navigate = useNavigate()

  const { fetchLeagues, leagues } = useLeagueStore()

  useEffect(() => {
    fetchLeagues({})
  }, [])
  console.log({ leagues })
  return (
    <div className='space-y-8'>
      {leagues?.map((league) => {
        return (
          <div
            className='flex items-center gap-4'
            onClick={() => navigate({ to: `/league/${league?.leagueId}` })}
          >
            <Avatar className='h-9 w-9'>
              <AvatarImage src='/avatars/01.png' alt='Avatar' />
              <AvatarFallback>OM</AvatarFallback>
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
      {/* {[
        { name: 'Global', participants: '45426', position: '213' },
        { name: 'Hesta', participants: '46', position: '21' },
        { name: 'Natural Football', participants: '4561', position: '211' },
        { name: 'Crazy Managers', participants: '4516', position: '231' },
      ]?.map((league) => {
        return (
          <div className='flex items-center gap-4'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src='/avatars/01.png' alt='Avatar' />
              <AvatarFallback>{league.name.split('')[0]}</AvatarFallback>
            </Avatar>
            <div className='flex flex-1 flex-wrap items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {league?.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Total Participants: {league.participants}
                </p>
              </div>
              <div className='font-medium'>{league.position}</div>
            </div>
          </div>
        )
      })} */}

      {/* <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>William Kim</p>
            <p className='text-sm text-muted-foreground'>will@email.com</p>
          </div>
          <div className='font-medium'>+$99.00</div>
        </div>
      </div> */}
    </div>
  )
}
