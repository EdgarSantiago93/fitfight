import React from 'react'
import { Button } from '@mantine/core'
import { ChevronLeft } from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'

interface Props {}
const ShareCard = (props: Props): React.ReactElement => {
  const {} = props
  const entryUser = props['entryUser']

  const { classes } = useStyles()
  moment.locale('es')

  React.useEffect(() => {}, [])

  return (
    <>
      <title>FitFight | Enero 30</title>
      <meta name="description" content={`${entryUser.name} subió una entrada`} />

      <meta property="og:url" content="https://bartolos.site" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={'FitFight | Enero 30'} />
      <meta property="og:description" content={`${entryUser.name} subió una entrada`} />
      <meta property="og:image" content={`https://bartolos.site${entryUser.avatar}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="bartolos.site" />
      <meta property="twitter:url" content="https://bartolos.site" />
      <meta
        name="twitter:title"
        content={`FitFight | ${moment().format('MMMM')} ${moment().format('DD')}`}
      />
      <meta name="twitter:description" content={`${entryUser.name} subió una entrada`} />
      <meta name="twitter:image" content={`https://bartolos.site${entryUser.avatar}`} />

      <div className={classes.wrapper}>
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

export default ShareCard
