import React from 'react'
import { Button, Grid, TextInput, Text } from '@mantine/core'

interface Props {
  overlayLoad
}
import { useStyles } from './styles'
import { closeAllModals, openConfirmModal } from '@mantine/modals'
import moment from 'moment'
// import ImageUploader from '../../Components/ImageUploader'
import ImageUploaderTest from '../../Components/ImageUploaderTest'
import { useForm } from '@mantine/form'
import { createEntry } from '../../api/entry'

const EntryNotSubmitted = (props: Props) => {
  const form = useForm({
    initialValues: {
      pose_img: false,
      tracker_img: false,
      calories: '',
      minutes: '',
      is_rest_day: false,
    },
  })

  const {} = props
  const { classes } = useStyles()

  const openSubmitRestDayModal = () =>
    openConfirmModal({
      title: 'Día de descanso',
      centered: true,
      children: (
        <Text size="sm">
          Vas a subir un día de descanso para el día de hoy({moment().format('DD')}), solo puedes
          tener un día de descanso por semana. ¿Estás seguro de continuar?
        </Text>
      ),
      labels: { confirm: '😴 Continuar', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => processRestDay(),
    })

  const openSubmitModal = () =>
    openConfirmModal({
      title: 'Entrada para ' + moment().format('DD') + ' de ' + moment().format('MMMM'),
      centered: true,
      children: (
        <Text size="sm">
          Vas a subir una entrada para el día de hoy({moment().format('DD')} de{' '}
          {moment().format('MMMM')}). <b>No</b> se puede modificar después, ¿Estás seguro de
          continuar?
        </Text>
      ),
      labels: { confirm: '💪 Vamos', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => processEntry(),
    })

  const openConfirmEmptyModal = () =>
    openConfirmModal({
      title: 'Tienes campos vacios',
      centered: true,
      children: (
        <Text size="sm">
          Tienes campos vacios. &nbsp;<b>No</b> podrás modificar esta entrada después, ¿Estás seguro
          de continuar?
        </Text>
      ),
      labels: { confirm: 'Confirmar', cancel: 'Regresar' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => processEntry(true),
    })

  const processRestDay = () => {
    form.values.is_rest_day = true
    processEntry().then(() => {
      form.values.is_rest_day = false
    })
  }

  const processEntry = async (override = false) => {
    if (!form.isDirty() && override === false && form.values.is_rest_day === false) {
      closeAllModals()
      return setTimeout(() => {
        openConfirmEmptyModal()
      }, 300)
    }
    props.overlayLoad(true)
    const processEntryCall = await createEntry(form.values)
    if (processEntryCall?.success) {
      window.location.reload()
    } else {
      props.overlayLoad(false)
    }
  }

  const [trackerLoading, setTrackerLoading] = React.useState(false)
  const [poseLoading, setPoseLoading] = React.useState(false)

  React.useEffect(() => {}, [])

  return (
    <div className={classes.notSubmitted}>
      <Grid>
        <Grid.Col span={6}>
          <div className={classes.label}>Tracker</div>
          <ImageUploaderTest
            formValue="tracker_img"
            form={form}
            loading={setTrackerLoading}
            key="tracker_img_key"
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <div className={classes.label}>Pose</div>
          <ImageUploaderTest
            formValue="pose_img"
            form={form}
            loading={setPoseLoading}
            key="pose_img_key"
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput label="Calorias" radius="md" size="md" {...form.getInputProps('calories')} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Minutos ejercicio"
            radius="md"
            size="md"
            {...form.getInputProps('minutes')}
          />
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
            <Button
              component="a"
              href="#"
              variant="subtle"
              leftIcon={<>😴</>}
              onClick={() => openSubmitRestDayModal()}
              disabled={poseLoading || trackerLoading}
            >
              Hoy es descanso
            </Button>
            <Button
              component="a"
              href="#"
              variant="outline"
              leftIcon={<>💪</>}
              onClick={() => openSubmitModal()}
              disabled={poseLoading || trackerLoading}
            >
              Vamos
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default EntryNotSubmitted
