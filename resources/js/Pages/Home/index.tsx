import React from 'react'
import {
  // ActionIcon,
  Avatar,
  Group,
  Image,
  ThemeIcon,
  Loader,
  Grid,
  TextInput,
  Menu,
} from '@mantine/core'
import {
  //  CirclePlus,
  ChevronRight,
  Logout,
} from 'tabler-icons-react'
import { useStyles } from './styles'
import moment from 'moment'

import EntryNotSubmitted from '../../Components/EntryNotSubmitted'

interface Props {}
const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const { classes, cx } = useStyles()

  const daysEs = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

  const getCurrentWeek: any = () => {
    var currentDate = moment()
    var weekStart = currentDate.clone().startOf('isoWeek')
    var days: any = []
    for (var i = 0; i <= 6; i++) {
      let c = moment(weekStart).add(i, 'days')
      let v = {
        day: daysEs[c.format('d')],
        date: c.format('DD'),
        month: c.format('MMMM'),
      }
      days.push(v)
    }
    return days
  }

  moment.locale('es-mx')
  React.useEffect(() => {}, [])
  // @ts-ignore
  const [selectedDay, setSelectedDay] = React.useState(moment().format('DD'))
  // @ts-ignore

  const [isLoading, setisLoading] = React.useState()
  return (
    <>
      <div className={classes.wrapper}>
        <Group>
          <Image src="/img/logo_h.png" width={95} />
        </Group>

        <div className={classes.greeting}>
          <div>
            <div className={classes.greeting_text}>Buenos dias,</div>
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

        <div className={classes.missingVotesContainer}>
          <div>
            <div className={classes.missingVotesContainer_top}>12 entradas por votar</div>
            <div className={classes.missingVotesContainer_bottom}>Mostrar detalles</div>
          </div>

          <div className={classes.missingVotesContainer_icon}>
            <ThemeIcon variant="light" radius="xl" size="xl">
              <ChevronRight />
            </ThemeIcon>
          </div>
        </div>

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
            {getCurrentWeek().map((day, index) => {
              return (
                <div
                  key={'datebutton' + index}
                  className={cx(
                    classes.dateContainer,
                    selectedDay == day.date ? classes.selectedDay : null,
                    moment().format('DD') == day.date ? classes.today : null
                  )}
                  onClick={() => setSelectedDay(day.date)}
                >
                  <div className={classes.day}>{day.day}</div>
                  <div className={classes.date}>{day.date}</div>
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

            <EntryNotSubmitted />
          </div>

          <div className={classes.notSubmitted}>
            not submitted
            <Grid>
              <Grid.Col span={6}>foto de tracker</Grid.Col>
              <Grid.Col span={6}>foto de pose</Grid.Col>
              <Grid.Col span={6}>
                <TextInput placeholder="Your name" label="Calorias" radius="md" size="md" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Your name"
                  label="Minutos ejercicio"
                  radius="md"
                  size="md"
                />
              </Grid.Col>
            </Grid>
          </div>
          <div className={classes.inprogress}>inprogress</div>
          <div className={classes.valid}>valid</div>
          <div className={classes.invalid}>invalid</div>
        </div>
      </div>
    </>
  )
}

export default Home
