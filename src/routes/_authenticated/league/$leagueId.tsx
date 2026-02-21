import { createFileRoute } from '@tanstack/react-router'
import { LeagueDetails } from '@/features/league/LeagueDetails'

// const appsSearchSchema = z.object({
//   type: z
//     .enum(['all', 'connected', 'notConnected'])
//     .optional()
//     .catch(undefined),
//   filter: z.string().optional().catch(''),
//   sort: z.enum(['asc', 'desc']).optional().catch(undefined),
// })

export const Route = createFileRoute('/_authenticated/league/$leagueId')({
  //   validateSearch: appsSearchSchema,
  component: LeagueDetails,
})
