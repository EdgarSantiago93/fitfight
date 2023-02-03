import React from 'react'
import { Avatar, Text, Tooltip } from '@mantine/core'

import { useStyles } from './styles'
import moment from 'moment'
import PageHeader from '../../Components/PageHeader'
import { useClickOutside } from '@mantine/hooks'

interface Props {}
const Leaderboard = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const userswithEntries = props['userswithEntries']

  const { classes } = useStyles()
  moment.locale('es')
  const participatingUsers = userswithEntries.filter((u) => u.hasEntries)
  const nonParticipatingUsers = userswithEntries.filter((u) => !u.hasEntries)

  //order by entries, votes and date average

  const orderData = (data) => {
    return data.sort((a, b) => {
      if (a.entries.length !== b.entries.length) {
        return b.entries.length - a.entries.length
      } else if (a.totalVotes !== b.totalVotes) {
        return b.totalVotes - a.totalVotes
      } else {
        const aAverage =
          a.entries.reduce((sum, entry) => {
            const date = new Date(entry.created_at.full_value)
            return sum + date.valueOf()
          }, 0) / a.entries.length
        const bAverage =
          b.entries.reduce((sum, entry) => {
            const date = new Date(entry.created_at.full_value)
            return sum + date.valueOf()
          }, 0) / b.entries.length
        return aAverage - bAverage
      }
    })
  }
  React.useEffect(() => {}, [])
  const sortedUsers = React.useMemo(() => orderData(participatingUsers), [])

  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={false} showToday={true} />

        <div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text>
              Leaderboard para{' '}
              <span style={{ textTransform: 'capitalize' }}>{moment().format('MMMM')}</span>
            </Text>
          </div>
          <div className={classes.topRow}>
            <div className={classes.secondPlace}>
              <div className={classes.placeNumber}>2</div>
              <Top3Component user={sortedUsers[1]} classes={classes} />
            </div>
            <div className={classes.firstPlace}>
              <div className={classes.crown}>👑</div>

              <Top3Component user={sortedUsers[0]} classes={classes} />
            </div>

            <div className={classes.thirdPlace}>
              <div className={classes.placeNumber}>3</div>

              <Top3Component user={sortedUsers[2]} classes={classes} />
            </div>
          </div>

          <div className={classes.bottomRow}>
            {sortedUsers.slice(3, sortedUsers.length).map((user, index) => {
              const [tooltipOpened, setTooltipOpened] = React.useState(false)
              const ref = useClickOutside(() => setTooltipOpened(false))

              return (
                <div className={classes.userRow} key={'participating' + index}>
                  <div className={classes.userRowPlace}>{index + 4}º</div>
                  <Avatar src={user.avatar} radius={100} size={43} />
                  <div className={classes.userRowName}>{user.name}</div>
                  <div>
                    <div className={classes.userRowPts}>{user.entries.length}pts.</div>
                    <Tooltip
                      label={`${user.totalVotes} votos totales`}
                      opened={tooltipOpened}
                      withArrow
                    >
                      <div
                        ref={ref}
                        className={classes.userRowTotalVotes}
                        onClick={() => setTooltipOpened((o) => !o)}
                      >
                        {user.totalVotes} 🗳️
                      </div>
                    </Tooltip>
                  </div>
                </div>
              )
            })}

            <div
              style={{ width: '100%', textAlign: 'center', marginTop: '5px', marginBottom: '5px' }}
            >
              <Text weight={600} size="lg">
                Bartolos que no han participado
              </Text>
            </div>
            {nonParticipatingUsers.map((user, index) => {
              return (
                <div className={classes.userRow} key={'nonparticipating' + index}>
                  {/* <div className={classes.userRowPlace}>{index}º</div> */}
                  <Avatar src={user.avatar} radius={100} size={43} />
                  <div className={classes.userRowName}>{user.name}</div>
                  <div className={classes.userRowPts}>{user.entries.length}pts.</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const Top3Component = ({ user, classes }) => {
  const [tooltipOpened, setTooltipOpened] = React.useState(false)
  const ref = useClickOutside(() => setTooltipOpened(false))
  return user && user.hasEntries ? (
    <>
      <Tooltip label={`${user.totalVotes} votos totales`} opened={tooltipOpened} withArrow>
        <div onClick={() => setTooltipOpened((o) => !o)} ref={ref}>
          <Avatar src={user.avatar} radius={100} size={80} />
          <div className={classes.placeName}>{user.name}</div>
          <div className={classes.placePts}>{user.entries.length} pts.</div>
        </div>
      </Tooltip>
    </>
  ) : (
    <>
      <Avatar src="" radius={100} size={80} />
      <div className={classes.placeName}>-</div>
      <div className={classes.placePts}>-</div>
    </>
  )
}

export default Leaderboard
