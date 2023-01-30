import React from 'react'
import { Grid, Text, Button, Avatar } from '@mantine/core'

interface Props {
  entry
  earliestEntry
}
import { useStyles } from './styles'
import ImageViewer from '../ImageViewer'

const EntryRated = (props: Props) => {
  const {} = props
  const { classes } = useStyles()

  // @ts-ignore
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    console.log('entry rated')
    console.log(props.earliestEntry)
  }, [])

  const ButtonConfirm = ({ callback, text, color }) => {
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
        callback()
      }
    }
    let variant = isFirstTime ? 'filled' : 'outline'
    return (
      <>
        <Button
          onClick={handleClick}
          //@ts-ignore
          variant={variant}
          loading={isLoading}
          color={color}
          style={{ width: '100%' }}
        >
          {isFirstTime ? text : 'Confirmar'}
        </Button>
      </>
    )
  }

  return (
    <div className={classes.notSubmitted}>
      <Grid
        sx={(theme) => ({
          backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
          borderRadius: '10px',
          marginBottom: '10px',
        })}
      >
        <Grid.Col span={12}>
          <div
            style={{
              display: 'flex',
              height: '35px',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '0px 8px',
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
            <ImageViewer image={props.earliestEntry?.tracker_file_signed_url} isSmall={true} />{' '}
          </div>
          <div>
            <div className={classes.label}>Pose</div>
            <ImageViewer image={props.earliestEntry?.pose_file_signed_url} isSmall={true} />{' '}
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
      <Grid>
        <Grid.Col span={12}>
          <div
            style={{
              display: 'flex',
              height: '35px',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '0px 8px',
            }}
          >
            <Avatar src={props.entry?.user?.avatar} radius="xl" size={35} />
            <div className={classes.label} style={{ marginLeft: '5px', letterSpacing: '-.5' }}>
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

        <Grid.Col span={6}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text weight={600} size="lg">
              Votos
            </Text>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ paddingLeft: '3px', paddingRight: '3px', width: '100%' }}>
              <ButtonConfirm callback={() => {}} text="👎" color="red" />
            </div>
            <div style={{ paddingLeft: '3px', paddingRight: '3px', width: '100%' }}>
              <ButtonConfirm callback={() => {}} text="👍" color="green" />{' '}
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default EntryRated
