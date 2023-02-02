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

  //order by entries
  const sortedUsers = participatingUsers
    .sort(function (x, y) {
      return x.entries.length - y.entries.length || x.totalVotes - y.totalVotes
    })
    .reverse()

  React.useEffect(() => {}, [])

  const FirstPlaceComponent = () => {
    const [tooltipOpened, setTooltipOpened] = React.useState(false)
    const ref = useClickOutside(() => setTooltipOpened(false))
    return sortedUsers[0] && sortedUsers[0].hasEntries ? (
      <>
        <Tooltip
          label={`${sortedUsers[0].totalVotes} votos totales`}
          opened={tooltipOpened}
          withArrow
        >
          <div onClick={() => setTooltipOpened((o) => !o)} ref={ref}>
            <Avatar src={sortedUsers[0].avatar} radius={100} size={80} />
            <div className={classes.placeName}>{sortedUsers[0].name}</div>
            <div className={classes.placePts}>{sortedUsers[0].entries.length} pts.</div>
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
  const SecondPlaceComponent = () => {
    const [tooltipOpened, setTooltipOpened] = React.useState(false)
    const ref = useClickOutside(() => setTooltipOpened(false))
    return sortedUsers[1] && sortedUsers[1].hasEntries ? (
      <>
        <Tooltip
          label={`${sortedUsers[1].totalVotes} votos totales`}
          opened={tooltipOpened}
          withArrow
        >
          <div onClick={() => setTooltipOpened((o) => !o)} ref={ref}>
            <Avatar src={sortedUsers[1].avatar} radius={100} size={80} />
            <div className={classes.placeName}>{sortedUsers[1].name}</div>
            <div className={classes.placePts}>{sortedUsers[1].entries.length} pts.</div>
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
  const ThirdPlaceComponent = () => {
    const [tooltipOpened, setTooltipOpened] = React.useState(false)
    const ref = useClickOutside(() => setTooltipOpened(false))
    return sortedUsers[2] && sortedUsers[2].hasEntries ? (
      <>
        <Tooltip
          label={`${sortedUsers[0].totalVotes} votos totales`}
          opened={tooltipOpened}
          withArrow
        >
          <div onClick={() => setTooltipOpened((o) => !o)} ref={ref}>
            <Avatar src={sortedUsers[2].avatar} radius={100} size={80} />
            <div className={classes.placeName}>{sortedUsers[2].name}</div>
            <div className={classes.placePts}>{sortedUsers[2].entries.length} pts.</div>
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

              <SecondPlaceComponent />
            </div>
            <div className={classes.firstPlace}>
              <div className={classes.crown}>👑</div>

              <FirstPlaceComponent />
            </div>

            <div className={classes.thirdPlace}>
              <div className={classes.placeNumber}>3</div>

              <ThirdPlaceComponent />
            </div>
          </div>

          <div className={classes.bottomRow}>
            {sortedUsers.slice(2, sortedUsers.length).map((user, index) => {
              // {nonParticipatingUsers.slice(2, nonParticipatingUsers.length).map((user, index) => {
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

export default Leaderboard
