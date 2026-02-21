'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useLeagueStore from '@/stores/league'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from '../users/data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'League Name is required.'),
  season: z.string(),
})

type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeagueForm({ open, onOpenChange }) {
  //   const isEdit = !!currentRow

  const { postLeague } = useLeagueStore()
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      season: '2026/27',
    },
  })

  const onSubmit = (data: UserForm) => {
    onOpenChange(false)
    postLeague({ values: data })
    form.reset()
    // showSubmittedData(data)
  }

  return (
    <Dialog
      open={open === 'create'}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{'Create League'}</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='py-1 pe-3'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>League Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter a title' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
