import React from 'react'
import { Grid, Text, Button, Avatar } from '@mantine/core'

interface Props {
  entry
  earliestEntry
  isFirst?: boolean
  isOwn: boolean
}
import { useStyles } from './styles'
import ImageViewer from '../ImageViewer'
import { voteOnEntry } from '../../api/vote'

const EntryRated = (props: Props) => {
  const {} = props
  const { classes } = useStyles()

  // @ts-ignore
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    console.log('entry rated')
    console.log(props.earliestEntry)
    console.log('ENTRYYYY', props.entry)
  }, [])

  const ButtonConfirm = ({ callback, text, color, disabled }) => {
    const [isFirstTime, setIsFirstTime] = React.useState<boolean>(true)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [timeoutVar, setTimeoutVar] = React.useState<any>('')
    const handleClick = () => {
      if (isFirstTime) {
        setIsFirstTime(false)
        setTimeoutVar(() =>
          setTimeout(() => {
            setIsFirstTime(true)
          }, 2000)
        )
      } else {
        clearTimeout(timeoutVar)
        setIsLoading(true)
        callback().catch(() => {
          setIsLoading(false)
          setIsFirstTime(true)
        })
      }
    }
    let variant = isFirstTime ? 'filled' : 'outline'
    return (
      <>
        <Button
          onClick={handleClick}
          // @ts-ignore
          variant={variant}
          loading={isLoading}
          color={color}
          style={{ width: '100%' }}
          disabled={disabled}
        >
          {isFirstTime ? text : 'Confirmar'}
        </Button>
      </>
    )
  }

  const attemptVote = async (type) => {
    setIsLoading(true)
    console.log('attempting vote', type)
    const apiCall = await voteOnEntry({ entry_id: props.entry.id, type: type })
    console.log('apiCall', apiCall)
    if (apiCall?.success) {
      console.log('successss')
      return window.location.reload()
    }
    setIsLoading(false)
    throw 'error'
  }

  return (
    <div className={classes.notSubmitted}>
      <div>Primera entrada del día</div>
      <div className={classes.moduleBorderWrap}>
        <div className={classes.innerContainer} id="innerthingy">
          <Grid
            sx={() => ({
              borderRadius: '10px',
              padding: '8px',
              // marginBottom: '10px',
              // backgroundColor: theme.colors.white,
            })}
          >
            <Grid.Col span={12}>
              <div
                style={{
                  display: 'flex',
                  height: '35px',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  // padding: '0px 8px',
                  paddingBottom: '0px',
                }}
              >
                <Avatar src={props.earliestEntry?.user?.avatar} radius="xl" size={35} />
                <div className={classes.label} style={{ marginLeft: '5px', letterSpacing: '-.5' }}>
                  {props.earliestEntry?.user?.name}
                </div>
              </div>
            </Grid.Col>

            <Grid.Col
              span={12}
              style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0px' }}
            >
              <div>
                <div className={classes.label}>Tracker</div>
                <ImageViewer
                  image={props.earliestEntry?.tracker_file_signed_url}
                  isSmall={true}
                />{' '}
              </div>
              <div>
                <div className={classes.label}>Pose</div>
                <ImageViewer
                  image={props.earliestEntry?.pose_file_signed_url}
                  isSmall={true}
                />{' '}
              </div>
              <div>
                <div style={{ height: '50%' }}>
                  <div className={classes.label}>Calorias</div>
                  <Text weight={600} style={{ marginTop: '0px' }}>
                    {props.earliestEntry?.calories == '' ? '-' : props.earliestEntry?.calories}
                  </Text>
                </div>
                <div style={{ height: '50%' }}>
                  <div className={classes.label}>Minutos Ejercicio</div>
                  <Text weight={600} style={{ marginTop: '0px' }}>
                    {props.earliestEntry?.minutes == '' ? '-' : props.earliestEntry?.minutes}
                  </Text>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>

      {!props.entry && (
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No hay mas entradas para votar
        </div>
      )}

      {!props.isOwn && props.entry && (
        <Grid style={{ marginTop: '10px' }}>
          {!props.isFirst && (
            <>
              <Grid.Col span={12} style={{ padding: '0px 8px' }}>
                <div
                  style={{
                    display: 'flex',
                    height: '35px',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '0px',
                  }}
                >
                  <Avatar src={props.entry?.user?.avatar} radius="xl" size={35} />
                  <div
                    className={classes.label}
                    style={{ marginLeft: '5px', letterSpacing: '-.5' }}
                  >
                    {props.entry?.user?.name}
                  </div>
                </div>
              </Grid.Col>

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
            </>
          )}

          {props.isFirst && (
            <Grid.Col span={12}>
              <div>
                Esta es la primer entrada del día, todas las siguientes se calificarȧn con base en
                esta pose
              </div>
            </Grid.Col>
          )}

          <Grid.Col span={12}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Text weight={600} size="lg">
                Votos
              </Text>
            </div>
          </Grid.Col>

          <Grid.Col span={12}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ paddingLeft: '3px', paddingRight: '3px', width: '100%' }}>
                <ButtonConfirm
                  callback={() => attemptVote('against')}
                  text="👎"
                  color="red"
                  disabled={isLoading}
                />
              </div>
              <div style={{ paddingLeft: '3px', paddingRight: '3px', width: '100%' }}>
                <ButtonConfirm
                  callback={() => attemptVote('for')}
                  text="👍"
                  color="green"
                  disabled={isLoading}
                />
              </div>
            </div>
          </Grid.Col>
        </Grid>
      )}
    </div>
  )
}

export default EntryRated
