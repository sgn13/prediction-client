import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@radix-ui/react-separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { getRouteApi } from '@tanstack/react-router'
import useLeagueStore from '@/stores/league'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LeagueForm } from '@/features/league/LeagueForm'
import { RecentSales } from '../dashboard/components/leagueHome'
import { JoinLeagueForm } from './JoinLeagueForm'
import { LeagueLayout } from './components/LeagueLayout'

const route = getRouteApi('/_authenticated/league/settings/$leagueId')

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your league name.')
    .min(2, 'League Name must be at least 2 characters.')
    .max(30, 'League Name not be longer than 30 characters.'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function LeagueSettings() {
  const { leagueId } = route.useParams()

  const { fetchLeague, league } = useLeagueStore()

  const [open, setOpen] = useState(null)

  useEffect(() => {
    fetchLeague({ id: leagueId })
  }, [])

  const defaultValues: Partial<AccountFormValues> = {
    name: league?.name || '',
  }

  useEffect(() => {
    if (league?.name) {
      form.reset({
        name: league.name,
      })
    }
  }, [league])

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    showSubmittedData(data)
  }

  return (
    <LeagueLayout>
      <div className='col-span-1 grid gap-4 lg:col-span-4'>
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>League Settings</CardTitle>
            <CardDescription>
              Code to join this league: {league?.inviteCode}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-1 flex-col'>
              <Separator className='flex-none' />
              <div className='faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12'>
                <div className='-mx-1 px-1.5 lg:max-w-xl'>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-8'
                    >
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>League Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='League name'
                                {...field}
                                value={field.value}
                              />
                            </FormControl>
                            <FormDescription>
                              Please think carefully before entering your league
                              name. Leagues with names that are deemed
                              inappropriate or offensive may result in your
                              account being deleted.{' '}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type='submit'>Update</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
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
            <RecentSales leagueId={leagueId} />
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
