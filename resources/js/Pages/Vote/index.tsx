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

  // // const [isLoading, setisLoading] = React.useState()

  // const participatingUsers = userswithEntries.filter((u) => u.hasEntries)
  // const nonParticipatingUsers = userswithEntries.filter((u) => !u.hasEntries)

  // //order by entries
  // const sortedUsers = participatingUsers.sort((a, b) => {
  //   return b.entries.length - a.entries.length
  // })

  React.useEffect(() => {
    console.log(entriesToVoteOn)
  }, [])

  // const [pendingVote, setPendingVote] = React.useState(entriesToVoteOn)

  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={true} />

        <div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text>Voting</Text>
          </div>

          <div>
            <VotingComponent earliestEntry={earliestEntry} entry={entriesToVoteOn[0]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Vote
