import React from 'react'
import { Button } from '@mantine/core'
import { ChevronLeft } from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'
import PageHeader from '../../Components/PageHeader'

interface Props {}
const NoParticipation = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']

  const { classes } = useStyles()
  moment.locale('es')

  React.useEffect(() => {}, [])

  return (
    <>
      <div className={classes.wrapper}>
        <PageHeader user={user} showHome={true} showCal={true} showLb={true} showToday={true} />

        <div>
          <div style={{ width: '100%', fontSize: '40px', textAlign: 'center' }}>✋🏼</div>
          Para votar tienes que participar hoy. <br />
          <br />
          - Sube una sesión de ejercicio.
          <br />
          - Marca hoy como día de descanso. <br /> - Si ya tienes 5 sesiones + 1 día de descanso
          esta semana, automaticamente puedes votar.
          <br />
          <br />
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Button
              onClick={() => (window.location.href = '/')}
              leftIcon={<ChevronLeft size={20} />}
            >
              Regresar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoParticipation
