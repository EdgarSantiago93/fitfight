import React from 'react'
import { Grid, Text, Avatar } from '@mantine/core'

interface Props {
  entry
}
import { useStyles } from './styles'
import { openModal } from '@mantine/modals'
import ImageViewer from '../ImageViewer'

const EntryPending = (props: Props) => {
  const {} = props
  const { classes } = useStyles()

  const openVoteModal = (type) => {
    openModal({
      centered: true,
      title: 'Votos ' + (type == 'for' ? 'a favor ✅' : 'en contra ❌'),
      children: (
        <>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            {type == 'for' ? (
              <>
                {votesFor.map((vote, index) => {
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
            ) : (
              <>
                {votesAgainst.map((vote, index) => {
                  return (
                    <div
                      key={'userlistocmponentag' + index}
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
            )}
          </div>
        </>
      ),
    })
  }

  // @ts-ignore
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {}, [])

  const votesFor = props.entry?.votes.filter((vote) => vote.type == 'for')
  const votesAgainst = props.entry?.votes.filter((vote) => vote.type == 'against')

  return (
    <div className={classes.notSubmitted}>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.label}>Tracker</div>
          <ImageViewer image={props.entry?.tracker_file_signed_url} />
        </Grid.Col>

        <Grid.Col span={4}>
          <div className={classes.label}>Pose</div>
          <ImageViewer image={props.entry?.pose_file_signed_url} />
        </Grid.Col>

        <Grid.Col span={4}>
          <div style={{ height: '50%' }}>
            <div className={classes.label}>Calorias</div>
            <Text weight={600} style={{ marginTop: '0px' }}>
              {props.entry?.calories == '' ? '-' : props.entry?.calories}
            </Text>
          </div>
          <div style={{ height: '50%' }}>
            <div className={classes.label}>Minutos Ejercicio</div>
            <Text weight={600} style={{ marginTop: '0px' }}>
              {props.entry?.minutes == '' ? '-' : props.entry?.minutes}
            </Text>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text weight={600} size="lg">
              Votos
            </Text>
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text weight={600} size="md">
            A favor ✅
          </Text>
          <Avatar.Group spacing="sm" onClick={() => openVoteModal('for')}>
            {votesFor?.map((vote, index) => {
              console.log(vote)
              if (index < 3) {
                return <Avatar key={vote.id + 'for'} src={vote.user.avatar} radius="xl" />
              }
            })}
            {votesFor?.length > 3 && <Avatar radius="xl">+{votesFor.length - 3}</Avatar>}
          </Avatar.Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text weight={600} size="md">
            En contra ❌
          </Text>
          <Avatar.Group spacing="sm" onClick={() => openVoteModal('against')}>
            {votesAgainst?.map((vote, index) => {
              if (index < 3) {
                return <Avatar key={vote.id + 'ag'} src={vote.user.avatar} radius="xl" />
              }
            })}
            {votesAgainst?.length > 3 && <Avatar radius="xl">+{votesFor.length - 3}</Avatar>}
          </Avatar.Group>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default EntryPending
