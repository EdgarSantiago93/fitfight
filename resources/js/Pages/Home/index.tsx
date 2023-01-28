import React from 'react'
import {
  Avatar,
  Group,
  Image,
  ThemeIcon,
  Loader,
  Menu,
  LoadingOverlay,
  Container,
} from '@mantine/core'
import { ChevronRight, Logout } from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'

import EntryNotSubmitted from '../../Components/EntryNotSubmitted'

interface Props {}
const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const entries = props['entries']
  const { classes, cx } = useStyles()
  moment.locale('es')
  const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

  const getGreeting = (): string => {
    const currentHour = moment().hour()
    if (currentHour >= 6 && currentHour < 12) {
      return 'Buenos días'
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Buenas tardes'
    } else if (currentHour >= 18 || currentHour < 6) {
      return 'Buenas noches'
    }
    return 'Hola'
  }

  const getCurrentWeek: any = () => {
    var currentDate = moment()
    var weekStart = currentDate.clone().startOf('isoWeek')
    var days: any = []
    for (var i = 0; i <= 6; i++) {
      let c = moment(weekStart).add(i, 'days')

      let userEntry = entries.find((e) => e.created_at.day == c.format('DD'))
      let v = {
        day: daysEs[c.format('d')],
        date: c.format('DD'),
        month: c.format('MMMM'),
        entry: userEntry,
      }
      days.push(v)
    }
    return days
  }
  // @ts-ignore
  const [currentWeek, setCurrentWeek] = React.useState(() => getCurrentWeek())
  // @ts-ignore
  const [selectedDay, setSelectedDay] = React.useState(moment().format('DD'))
  // @ts-ignore
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(moment().isoWeekday() - 1)
  // @ts-ignore
  const [isLoading, setisLoading] = React.useState()
  const [isLoadingOverlay, setIsLoadingOverlay] = React.useState(false)

  React.useEffect(() => {}, [])
  const getDayContainerClasses = (day: any) => {
    return cx(
      classes.dateContainer,
      { [classes.today]: moment().format('DD') == day.date },
      { [classes.selectedDay]: selectedDay == day.date },
      { [classes.validated]: day.entry?.is_validated && day.entry?.status == 'validated' },
      {
        [classes.validatedSelected]:
          selectedDay == day.date && day.entry?.is_validated && day.entry?.status == 'validated',
      },
      { [classes.forcedRest]: day.entry?.status == 'forced_rest' },
      {
        [classes.pending]:
          !day.entry?.is_validated && !day.entry?.is_rest_day && day.entry?.status == 'pending',
      }
    )
  }

  const generateComponent = () => {
    const selection = currentWeek[selectedDayIndex]
    console.log('selection', selection)
    if (!selection.entry && moment().format('DD') == selection.date) {
      return <EntryNotSubmitted overlayLoad={setIsLoadingOverlay} />
    }
    if (selection.entry?.is_rest_day) {
      return <div>Es un dia de descanso</div>
    }
    if (selection.entry?.is_validated && selection.entry?.status == 'validated') {
      return <div>Ya fue validado</div>
    }
    if (!selection.entry?.is_validated && selection.entry?.status == 'pending') {
      return <div>Esperando validacion</div>
    }
    if (selection.entry?.status == 'forced_rest') {
      return <div>Se acabo la semna</div>
    }
    if (moment().format('DD') < selection.date) {
      return <div>El dia aun no llega</div>
    }
  }
  const setDayAndIndex = (day: any, index: number) => {
    setSelectedDay(day)
    setSelectedDayIndex(index)
  }

  return (
    <>
      <div className={classes.wrapper}>
        <LoadingOverlay visible={isLoadingOverlay} overlayBlur={2} />
        <Group>
          <Image src="/img/logo_h.png" width={95} />
        </Group>

        <div className={classes.greeting}>
          <div>
            <div className={classes.greeting_text}>{getGreeting()},</div>
            <div className={classes.greeting_text_name}>{user.name}</div>
          </div>

          <div className={classes.avatarContainer}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar src={user.avatar} size={40} radius={100} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<Logout size={14} />}
                  onClick={() => (window.location.href = 'logout')}
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        <Container
          className={classes.missingVotesContainer}
          sx={(theme) => ({
            backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
          })}
        >
          <div>
            <div className={classes.missingVotesContainer_top}>12 entradas por votar</div>
            <div className={classes.missingVotesContainer_bottom}>Mostrar detalles</div>
          </div>

          <div className={classes.missingVotesContainer_icon}>
            <ThemeIcon variant="light" radius="xl" size="xl">
              <ChevronRight />
            </ThemeIcon>
          </div>
        </Container>

        <div>
          <div className={classes.todayDateContainer}>
            <div>{moment().format('DD [de] ')}</div>
            <div style={{ textTransform: 'capitalize', marginLeft: '3px' }}>
              {moment().format('MMMM')}
            </div>
          </div>
          <div className={classes.todayLabel}>Hoy</div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignContent: 'center',
              marginTop: '10px',
            }}
          >
            {/* 
            no entry  -> ❌
            rest day  -> 😴
            validated -> ✅
            pending   -> 🕒
            */}
            {currentWeek.map((day, index) => {
              return (
                <div
                  key={'datebutton' + index}
                  // className={getDayContainerClasses(day)}
                  className={getDayContainerClasses(day)}
                  onClick={() => setDayAndIndex(day.date, index)}
                >
                  <div className={classes.day}>{day.day}</div>
                  <div className={classes.date}>{day.date}</div>
                  <div>
                    {day.entry?.is_rest_day ? '😴' : null}
                    {!day.entry && moment().format('DD') > day.date ? '❌' : null}
                    {day.entry?.is_validated &&
                    day.entry?.status == 'validated' &&
                    !day.entry?.is_rest_day
                      ? '✅'
                      : null}

                    {!day.entry?.is_validated &&
                    day.entry?.status == 'pending' &&
                    !day.entry?.is_rest_day
                      ? '🕒'
                      : null}
                  </div>
                </div>
              )
            })}
          </div>

          <div className={classes.entryDescription}>
            {isLoading && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
                <Loader variant="bars" />
              </div>
            )}

            {generateComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
