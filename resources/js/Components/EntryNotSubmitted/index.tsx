import React from 'react'
import {
  // ActionIcon,
  Button,
  Grid,
  TextInput,
  // Image,
} from '@mantine/core'
// import {
//   //  CirclePlus,
//   Arm,
// } from 'tabler-icons-react'
interface Props {}
import { useStyles } from './styles'

const EntryNotSubmitted = (props: Props) => {
  const {} = props
  const { classes } = useStyles()

  return (
    <div className={classes.notSubmitted}>
      <Grid>
        <Grid.Col span={6}>
          <div className={classes.label}>Tracker</div>
          <div
            style={{
              backgroundImage: 'url(https://placedog.net/500/800)',
            }}
            className={classes.image}
          ></div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div className={classes.label}>Pose</div>
          <div
            style={{
              backgroundImage: 'url(https://placedog.net/500/800)',
            }}
            className={classes.image}
          ></div>
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Calorias" radius="md" size="md" />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Minutos ejercicio" radius="md" size="md" />
        </Grid.Col>
        <Grid.Col span={12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
              alignContent: 'center',
            }}
          >
            <Button component="a" href="#" variant="subtle" leftIcon={<>😴</>}>
              Hoy es descanso
            </Button>
            <Button component="a" href="#" variant="outline" leftIcon={<>💪</>}>
              Vamos
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default EntryNotSubmitted
