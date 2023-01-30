import React from 'react'
import { ThemeIcon, Loader, LoadingOverlay, Container } from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'

import EntryNotSubmitted from '../../Components/EntryNotSubmitted'
import NoEntry from '../../Components/NoEntry'
import EntryRated from '../../Components/EntryRated'
import DayToCome from '../../Components/DayToCome'
import PageHeader from '../../Components/PageHeader'

interface Props {}
const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const entries = props['entries']
  const { classes, cx } = useStyles()
  moment.locale('es')
  const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

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
      return <EntryRated entry={selection.entry} />
    }
    if (!selection.entry?.is_validated && selection.entry?.status == 'pending') {
      return <EntryRated entry={selection.entry} />
    }
    if (selection.entry?.status == 'forced_rest') {
      return <div>Se acabo la semna</div>
    }
    if (moment().format('DD') < selection.date) {
      return <DayToCome />
    }
    if (!selection.entry) {
      return <NoEntry />
    }
  }
  const setDayAndIndex = (day: any, index: number) => {
    setSelectedDay(day)
    setSelectedDayIndex(index)
  }

  //@ts-ignore
  const [shouldVote, setShouldVote] = React.useState(false)

  return (
    <>
      <div className={classes.wrapper}>
        <LoadingOverlay visible={isLoadingOverlay} overlayBlur={2} />

        <PageHeader user={user} showCal={true} showLb={true} />
        {/*  */}

        {/*  */}

        {!shouldVote && (
          <Container
            className={classes.missingVotesContainer}
            sx={(theme) => ({
              backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
            })}
            onClick={() => (window.location.href = '/vote')}
          >
            <div>
              <div className={classes.missingVotesContainer_top}>12 entradas por votar</div>
              <div className={classes.missingVotesContainer_bottom}>Mostrar detalles</div>
            </div>

            <div className={classes.missingVotesContainer_icon}>
              <ThemeIcon variant="light" radius="xl" size="lg">
                <ChevronRight />
              </ThemeIcon>
            </div>
          </Container>
        )}

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
