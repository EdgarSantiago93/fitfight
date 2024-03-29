import React from 'react'
import { ThemeIcon, Loader, LoadingOverlay, Container, ActionIcon } from '@mantine/core'
import { ChevronRight, Photo } from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'

import EntryNotSubmitted from '../../Components/EntryNotSubmitted'
import NoEntry from '../../Components/NoEntry'
import EntryRated from '../../Components/EntryRated'
import DayToCome from '../../Components/DayToCome'
import PageHeader from '../../Components/PageHeader'
import RestDay from '../../Components/RestDay'
import ForcedRest from '../../Components/ForcedRest'
import { openModal } from '@mantine/modals'

interface Props {}
const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const entries = props['entries']
  const earliestEntry = props['earliestEntry']
  const entriesToVoteOn = props['entriesToVoteOn']
  const { classes, cx } = useStyles()
  moment.locale('es')
  const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

  const getCurrentWeek: any = () => {
    var currentDate = moment()
    var weekStart = currentDate.clone().startOf('isoWeek')
    var days: any = []
    for (var i = 0; i <= 6; i++) {
      const momentDate = moment(weekStart).add(i, 'days')
      const userEntry = entries.find((e) => e.created_at.day == momentDate.format('DD'))

      const dateObj = {
        day: daysEs[momentDate.format('d')],
        date: momentDate.format('DD'),
        month: momentDate.format('MMMM'),
        monthNumber: momentDate.format('MM'),
        entry: userEntry,
        fullDate: momentDate.format(),
      }
      days.push(dateObj)
    }
    return days
  }

  const [currentWeek, _setCurrentWeek] = React.useState(() => getCurrentWeek())
  const [selectedDay, setSelectedDay] = React.useState(moment().format('DD'))
  const [selectedDayIndex, setSelectedDayIndex] = React.useState(moment().isoWeekday() - 1)
  const [isLoading, _setisLoading] = React.useState()
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
    // if (!day.entry && moment().isSame(day.fullDate, 'day')) {
    //   return ''
    //   // return <EntryNotSubmitted overlayLoad={setIsLoadingOverlay} />
    // }

    // if (day.entry?.is_rest_day) {
    //   return '😴'
    // }
    // if (day.entry?.is_validated && day.entry?.status == 'validated') {
    //   return '✅'
    // }
    // if (!day.entry?.is_validated && day.entry?.status == 'pending') {
    //   return '🕒'
    // }
    // if (!day.entry?.is_validated && day.entry?.status == 'rejected') {
    //   return '👎'
    // }
    // // if (day.entry?.status == 'forced_rest') {
    // //   return <ForcedRest />
    // // }

    // if (moment(day.fullDate) > moment()) {
    //   return ''
    // }

    // if (!day.entry) {
    //   return '❌'
    // }
    const selection = currentWeek[selectedDayIndex]

    if (!selection.entry && moment().isSame(selection.fullDate, 'day')) {
      return <EntryNotSubmitted overlayLoad={setIsLoadingOverlay} />
    }
    if (selection.entry?.is_rest_day) {
      return <RestDay key={selection.entry.id} />
    }
    if (selection.entry?.is_validated && selection.entry?.status == 'validated') {
      return <EntryRated key={selection.entry.id} entry={selection.entry ?? currentEntry} />
    }
    if (!selection.entry?.is_validated && selection.entry?.status == 'pending') {
      return <EntryRated key={selection.entry.id} entry={selection.entry ?? currentEntry} />
    }
    if (!selection.entry?.is_validated && selection.entry?.status == 'rejected') {
      return <EntryRated key={selection.entry.id} entry={selection.entry ?? currentEntry} />
    }
    if (selection.entry?.status == 'forced_rest') {
      return <ForcedRest key={Date.now() + 'fr'} />
    }
    if (moment(selection.fullDate) > moment()) {
      return <DayToCome />
    }
    if (!selection.entry) {
      return <NoEntry />
    }
    if (moment().format('DD') > selection.date && moment().format('MM') <= selection.monthNumber) {
      return <DayToCome />
    }
    return <> </>
  }

  const [currentEntry, setCurrentEntry] = React.useState(null)
  const setDayAndIndex = (day: any, index: number) => {
    setSelectedDay(day)
    setSelectedDayIndex(index)
    setCurrentEntry(currentWeek[index].entry)
  }

  const [shouldVote, _setShouldVote] = React.useState(entriesToVoteOn.length > 0 ? true : false)
  const showTodaysModal = () => {
    openModal({
      centered: true,
      title: 'Primera entrada',
      children: (
        <>
          <div>
            Esta es la pose del día: <br />
            {earliestEntry.id ? (
              <img
                src={earliestEntry.pose_file_signed_url}
                alt=""
                style={{ width: '100%', maxWidth: '350px', borderRadius: '10px' }}
              />
            ) : (
              <div>
                <br />
                Todavía no hay una entrada para hoy, sube la primera
              </div>
            )}
          </div>
        </>
      ),
    })
  }

  const getEmoji = (day: any) => {
    // {day.entry?.is_rest_day ? '😴' : null}
    // {!day.entry && moment().format('DD') > day?.date
    //   ? //  && moment().format('MM') >= day.monthNumber
    //     '❌'
    //   : null}
    // {day.entry?.is_validated &&
    // day.entry?.status == 'validated' &&
    // !day.entry?.is_rest_day
    //   ? '✅'
    //   : null}

    // {!day.entry?.is_validated &&
    // day.entry?.status == 'pending' &&
    // !day.entry?.is_rest_day
    //   ? '🕒'
    //   : null}

    // {!day.entry?.is_validated &&
    // day.entry?.status == 'rejected' &&
    // !day.entry?.is_rest_day
    //   ? '👎'
    //   : null}

    // if (!day.entry && moment().format('DD') == day.date) {
    if (!day.entry && moment().isSame(day.fullDate, 'day')) {
      return ''
      // return <EntryNotSubmitted overlayLoad={setIsLoadingOverlay} />
    }

    if (day.entry?.is_rest_day) {
      return '😴'
    }
    if (day.entry?.is_validated && day.entry?.status == 'validated') {
      return '✅'
    }
    if (!day.entry?.is_validated && day.entry?.status == 'pending') {
      return '🕒'
    }
    if (!day.entry?.is_validated && day.entry?.status == 'rejected') {
      return '👎'
    }
    // if (day.entry?.status == 'forced_rest') {
    //   return <ForcedRest />
    // }

    if (moment(day.fullDate) > moment()) {
      return ''
    }

    if (!day.entry) {
      return '❌'
    }
    // if (moment().format('DD') < day.date) {
    //   return <DayToCome />
    // }
  }
  return (
    <>
      <div className={classes.wrapper}>
        <LoadingOverlay visible={isLoadingOverlay} overlayBlur={2} />

        <PageHeader user={user} showCal={true} showLb={true} showToday={true} />

        {shouldVote && (
          <Container
            className={classes.missingVotesContainer}
            sx={(theme) => ({
              backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FBAB3E', deg: 45 }),
            })}
            onClick={() => (window.location.href = '/vote')}
          >
            <div>
              <div className={classes.missingVotesContainer_top}>
                {entriesToVoteOn.length} entradas por votar
              </div>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div className={classes.todayDateContainer}>
                <div>{moment().format('DD [de] ')}</div>
                <div style={{ textTransform: 'capitalize', marginLeft: '3px' }}>
                  {moment().format('MMMM')}
                </div>
              </div>
              <div className={classes.todayLabel}>Hoy</div>
            </div>

            <ActionIcon
              color="#F04336"
              size="lg"
              radius="xl"
              variant="light"
              onClick={showTodaysModal}
              style={{ marginLeft: '13px', marginTop: '5px' }}
            >
              <Photo size={26} />
            </ActionIcon>
          </div>

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
            rejected  -> 👎
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
                    {getEmoji(day)}
                    {/* {day.entry?.is_rest_day ? '😴' : null}
                    {!day.entry && moment().format('DD') > day?.date
                      ? //  && moment().format('MM') >= day.monthNumber
                        '❌'
                      : null}
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

                    {!day.entry?.is_validated &&
                    day.entry?.status == 'rejected' &&
                    !day.entry?.is_rest_day
                      ? '👎'
                      : null} */}
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
            {/* {currentEntry} */}

            {generateComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
