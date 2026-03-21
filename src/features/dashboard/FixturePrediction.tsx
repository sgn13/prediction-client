import React, { useRef } from 'react'
import { format } from 'date-fns'
import usePredictionStore from '@/stores/predictionStore'
import { Epl_Team_Flag } from '@/constants/epl_logos'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Countdown from './components/Countdown'

type Props = {
  matchObj: any
  prediction: any
  setPredictionInputs: React.Dispatch<React.SetStateAction<any>>
  selectedLeague: any
}

export const FixturePrediction = React.memo(
  ({ matchObj, prediction, setPredictionInputs, selectedLeague }: Props) => {
    const { postPrediction } = usePredictionStore()

    const debounceTimers = useRef({})
    const fixtureId = matchObj?.match_id._id
    const savePrediction = (fixtureId, data) => {
      postPrediction({
        values: {
          fixture_id: fixtureId,
          fantasy_league_id: selectedLeague?.leagueId,
          predicted_home_score: data.predicted_home_score,
          predicted_away_score: data.predicted_away_score,
        },
      })
    }

    const handlePredictionChange = (fixtureId, field, value) => {
      if (!fixtureId) return // 🔴 prevent undefined key

      setPredictionInputs((prev) => {
        const updated = {
          ...prev,
          [fixtureId]: {
            ...prev[fixtureId],
            [field]: value,
          },
        }

        if (debounceTimers.current[fixtureId]) {
          clearTimeout(debounceTimers.current[fixtureId])
        }

        debounceTimers.current[fixtureId] = setTimeout(() => {
          savePrediction(fixtureId, updated[fixtureId])
        }, 1000)

        return updated
      })
    }

    const fixtureDate =
      new Date(matchObj?.match_id?.kickoff_at).getTime() - Date.now()

    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            <div>Premier League</div>
            <div>
              {format(matchObj?.match_id?.kickoff_at, 'EEEE, MMMM d HH:mm')}
            </div>
            {matchObj?.match_id?.status === 'FINISHED' ? (
              'FINISHED'
            ) : (
              <Countdown kickoff={matchObj?.match_id?.kickoff_at} />
            )}
            <div>
              {prediction?.prediction_type ? prediction?.prediction_type : null}
            </div>
            <div>
              {prediction?.points_awarded ? prediction?.points_awarded : null}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className='flex'>
            {/* Home Team */}
            <div className='flex flex-3 flex-col items-center text-center'>
              <img
                src={
                  Epl_Team_Flag[`${matchObj?.match_id?.home_team_name}`]?.image
                }
                width={40}
              />
              <div className='text-xs'>
                {matchObj?.match_id?.home_team_name}
              </div>
            </div>
            {matchObj?.match_id?.status === 'FINISHED'
              ? matchObj?.match_id?.home_score
              : null}

            {/* Prediction Inputs */}
            <div className='flex flex-6 justify-center gap-4 px-4'>
              <Input
                type='number'
                placeholder='?'
                value={prediction?.predicted_home_score}
                onChange={(e) =>
                  handlePredictionChange(
                    fixtureId,
                    'predicted_home_score',
                    e.target.value
                  )
                }
                disabled={fixtureDate < 0}
              />

              <div>-</div>

              <Input
                type='number'
                placeholder='?'
                value={prediction?.predicted_away_score}
                onChange={(e) =>
                  handlePredictionChange(
                    fixtureId,
                    'predicted_away_score',
                    e.target.value
                  )
                }
                disabled={fixtureDate < 0}
              />
            </div>

            {/* Away Team */}
            {matchObj?.match_id?.status === 'FINISHED'
              ? matchObj?.match_id?.away_score
              : null}
            <div className='flex flex-3 flex-col items-center text-center'>
              <img
                src={
                  Epl_Team_Flag[`${matchObj?.match_id?.away_team_name}`]?.image
                }
                width={40}
              />
              <div className='text-xs'>
                {matchObj?.match_id?.away_team_name}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
