import { createFileRoute } from '@tanstack/react-router'
import { LeagueSettings } from '@/features/league/LeagueSettings'

// const appsSearchSchema = z.object({
//   type: z
//     .enum(['all', 'connected', 'notConnected'])
//     .optional()
//     .catch(undefined),
//   filter: z.string().optional().catch(''),
//   sort: z.enum(['asc', 'desc']).optional().catch(undefined),
// })

export const Route = createFileRoute(
  '/_authenticated/league/settings/$leagueId'
)({
  //   validateSearch: appsSearchSchema,
  component: LeagueSettings,
})
