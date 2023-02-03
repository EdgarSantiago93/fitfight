import React from 'react'
import { Avatar, Text, Grid } from '@mantine/core'

import { useStyles } from './styles'
import moment from 'moment'
import PageHeader from '../../Components/PageHeader'
import { openModal } from '@mantine/modals'
import ImageViewer from '../../Components/ImageViewer'

interface Props {}
const DaysEntries = (props: Props): React.ReactElement => {
  const {} = props
  const today = props['today']
  const user = props['user']

  const { classes } = useStyles()
  moment.locale('es')

  React.useEffect(() => {}, [])

  const openVoteModal = (type, votes) => {
    openModal({
      centered: true,
      title: 'Votos ' + (type == 'for' ? 'a favor ✅' : 'en contra ❌'),
      children: (
        <>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <>
              {votes.map((vote, index) => {
                return (
                  <div
                    key={'userlistocmponent' + index}
                    style={{ display: 'flex', marginBottom: '5px' }}
                  >
                    <Avatar src={vote.user.avatar} radius="xl" size={33} />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '33px',
                        marginLeft: '10px',
                      }}
                    >
                      <Text weight={500}> {vote.user.name} </Text>
                    </div>
                  </div>
                )
              })}
            </>
          </div>
        </>
      ),
    })
  }
  const checkHeic = (url): boolean => {
    if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
      return true
    }
    return false
  }
  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={true} showToday={false} />
        <div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text>
              Participaciones del {moment().format('MM')} de
              <span style={{ textTransform: 'capitalize', marginLeft: '3px' }}>
                {moment().format('MMMM')}
              </span>
            </Text>
          </div>

          <div>
            {!today && (
              <>
                <div
                  style={{ width: '100%', textAlign: 'center', marginTop: '30px', fontWeight: 600 }}
                >
                  No hay participaciones para hoy
                </div>
              </>
            )}

            {today &&
              today.map((entry, _index) => {
                const votesFor = entry?.votes.filter((vote) => vote.type == 'for')
                const votesAgainst = entry?.votes.filter((vote) => vote.type == 'against')
                return (
                  <div key={entry.id} className={classes.entryContainer}>
                    <Grid>
                      <Grid.Col span={12} className={classes.entryGrid}>
                        <div className={classes.owner}>
                          <Avatar key={entry.id} src={entry.user.avatar} radius="xl" size={'sm'} />
                          <span className={classes.ownerName}>{entry.user.name}</span>
                          <span className={classes.ownerAt}>@</span>

                          <span className={classes.ownerDate}>
                            {moment(entry.created_at?.full_value).format('HH:mm')}
                          </span>
                        </div>
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <div className={classes.label}>Tracker</div>
                        <ImageViewer
                          image={entry?.tracker_file_signed_url}
                          isSmall={true}
                          isHeic={checkHeic(entry?.tracker_file_signed_url)}
                        />
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <div className={classes.label}>Pose</div>
                        <ImageViewer
                          image={entry?.pose_file_signed_url}
                          isSmall={true}
                          isHeic={checkHeic(entry?.tracker_file_signed_url)}
                        />
                      </Grid.Col>

                      <Grid.Col span={4}>
                        <div style={{ height: '50%' }}>
                          <div className={classes.label}>🔥</div>
                          <Text weight={600} style={{ marginTop: '0px' }}>
                            {entry?.calories == '' ? '-' : entry?.calories}
                          </Text>
                        </div>
                        <div style={{ height: '50%' }}>
                          <div className={classes.label}>⏰🏋🏼</div>
                          <Text weight={600} style={{ marginTop: '0px' }}>
                            {entry?.minutes == '' ? '-' : entry?.minutes}
                          </Text>
                        </div>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <div className={classes.label}> A favor ✅</div>

                        <Avatar.Group spacing="sm" onClick={() => openVoteModal('for', votesFor)}>
                          {votesFor?.map((vote, index) => {
                            if (index < 3) {
                              return (
                                <Avatar
                                  key={vote.id + 'for'}
                                  src={vote.user.avatar}
                                  radius="xl"
                                  size={'sm'}
                                />
                              )
                            }
                          })}
                          {votesFor?.length > 3 && (
                            <Avatar radius="xl" size={'sm'}>
                              +{votesFor.length - 3}
                            </Avatar>
                          )}
                        </Avatar.Group>
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <div className={classes.label}> En contra ❌</div>

                        <Avatar.Group
                          spacing="sm"
                          onClick={() => openVoteModal('against', votesAgainst)}
                        >
                          {votesAgainst?.map((vote, index) => {
                            if (index < 3) {
                              return (
                                <Avatar
                                  key={vote.id + 'for'}
                                  src={vote.user.avatar}
                                  radius="xl"
                                  size={'sm'}
                                />
                              )
                            }
                          })}
                          {votesAgainst?.length > 3 && (
                            <Avatar radius="xl" size={'sm'}>
                              +{votesAgainst.length - 3}
                            </Avatar>
                          )}
                        </Avatar.Group>
                      </Grid.Col>
                    </Grid>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DaysEntries
