import React from 'react'
import { Text } from '@mantine/core'
import { useStyles } from './styles'
import moment from 'moment'
import VotingComponent from '../../Components/VotingComponent'
import PageHeader from '../../Components/PageHeader'

interface Props {}
const Vote = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const entriesToVoteOn = props['entriesToVoteOn']
  const earliestEntry = props['earliestEntry']

  const { classes } = useStyles()
  moment.locale('es')

  React.useEffect(() => {}, [])

  const [isOwn, _setIsOwn] = React.useState(
    entriesToVoteOn.length == 0 && earliestEntry.user.id == user.id
  )
  const [isFirst, _setIsFirst] = React.useState(entriesToVoteOn[0]?.id == earliestEntry.id)
  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={true} showToday={true} />
        <div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text size={'xl'} weight={500}>
              Voting
            </Text>
          </div>

          {isOwn && (
            <>
              <div>
                Solo hay una entrada y es tuya, está abierta para votos de los otro bartolos.
              </div>
            </>
          )}
          <div>
            <VotingComponent
              earliestEntry={earliestEntry}
              entry={entriesToVoteOn[0]}
              isOwn={isOwn}
              isFirst={isFirst}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Vote
