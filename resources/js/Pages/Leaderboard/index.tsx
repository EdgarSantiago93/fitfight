import React from 'react'
import { Avatar, Text } from '@mantine/core'

import { useStyles } from './styles'
import moment from 'moment'
import PageHeader from '../../Components/PageHeader'

interface Props {}
const Leaderboard = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const userswithEntries = props['userswithEntries']

  const { classes } = useStyles()
  moment.locale('es')

  // const [isLoading, setisLoading] = React.useState()

  const participatingUsers = userswithEntries.filter((u) => u.hasEntries)
  const nonParticipatingUsers = userswithEntries.filter((u) => !u.hasEntries)

  //order by entries
  const sortedUsers = participatingUsers.sort((a, b) => {
    return b.entries.length - a.entries.length
  })

  React.useEffect(() => {
    console.log(sortedUsers)
    console.log(nonParticipatingUsers)
  }, [])

  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={false} />

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
              {sortedUsers[1] && sortedUsers[1] ? (
                <>
                  <Avatar src={sortedUsers[1].avatar} radius={100} size={70} />
                  <div className={classes.placeName}>{sortedUsers[1].name}</div>
                  <div className={classes.placePts}>{sortedUsers[1].entries.length} pts.</div>
                </>
              ) : (
                <>
                  <Avatar src="" radius={100} size={70} />
                  <div className={classes.placeName}>-</div>
                  <div className={classes.placePts}>-</div>
                </>
              )}
            </div>
            <div className={classes.firstPlace}>
              <div className={classes.crown}>👑</div>

              {sortedUsers[0] && sortedUsers[0].hasEntries ? (
                <>
                  <Avatar src={sortedUsers[0].avatar} radius={100} size={80} />
                  <div className={classes.placeName}>{sortedUsers[0].name}</div>
                  <div className={classes.placePts}>{sortedUsers[0].entries.length} pts.</div>
                </>
              ) : (
                <>
                  <Avatar src="" radius={100} size={80} />
                  <div className={classes.placeName}>-</div>
                  <div className={classes.placePts}>-</div>
                </>
              )}
            </div>

            <div className={classes.thirdPlace}>
              <div className={classes.placeNumber}>3</div>

              {sortedUsers[2] && sortedUsers[2].hasEntries ? (
                <>
                  <Avatar src={sortedUsers[2].avatar} radius={100} size={60} />
                  <div className={classes.placeName}>{sortedUsers[2].name}</div>
                  <div className={classes.placePts}>{sortedUsers[2].entries.length} pts.</div>
                </>
              ) : (
                <>
                  <Avatar src="" radius={100} size={60} />
                  <div className={classes.placeName}>-</div>
                  <div className={classes.placePts}>-</div>
                </>
              )}
            </div>
          </div>

          <div className={classes.bottomRow}>
            {sortedUsers.slice(2, sortedUsers.length).map((user, index) => {
              // {nonParticipatingUsers.slice(2, nonParticipatingUsers.length).map((user, index) => {
              return (
                <div className={classes.userRow} key={'participating' + index}>
                  <div className={classes.userRowPlace}>{index + 4}º</div>
                  <Avatar src={user.avatar} radius={100} size={43} />
                  <div className={classes.userRowName}>{user.name}</div>
                  <div className={classes.userRowPts}>{user.entries.length}pts.</div>
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

export default Leaderboard
