import React from 'react'
import { Avatar, Group, Image, Menu, ActionIcon } from '@mantine/core'
import { useStyles } from './styles'
import { Logout, Medal, Home2, Calendar } from 'tabler-icons-react'

import moment from 'moment'

const PageHeader = ({
  user,
  showHome = false,
  showLb = false,
  showCal = false,
  showToday = false,
}) => {
  const { classes } = useStyles()
  moment.locale('es')

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

  return (
    <>
      <Group>
        <Image src="/img/logo_h.png" width={95} onClick={() => (window.location.href = '/')} />
      </Group>

      <div className={classes.greeting}>
        <div>
          <div className={classes.greeting_text}>{getGreeting()},</div>
          <div className={classes.greeting_text_name}>{user.name}</div>
        </div>

        <div className={classes.avatarContainer}>
          {showHome && (
            <ActionIcon
              color="#F04336"
              size="xl"
              radius="xl"
              variant="light"
              onClick={() => (window.location.href = '/')}
              style={{ marginRight: 5 }}
            >
              <Home2 size={34} />
            </ActionIcon>
          )}

          {showLb && (
            <ActionIcon
              color="#F04336"
              size="xl"
              radius="xl"
              variant="light"
              onClick={() => (window.location.href = '/lb')}
              style={{ marginRight: 5 }}
            >
              <Medal size={34} />
            </ActionIcon>
          )}

          {showToday && (
            <ActionIcon
              color="#F04336"
              size="xl"
              radius="xl"
              variant="light"
              onClick={() => (window.location.href = '/today')}
              style={{ marginRight: 5 }}
            >
              <Calendar size={34} />
            </ActionIcon>
          )}

          {showCal && <></>}

          {/* WIP */}
          {/* {showCal && (
            <ActionIcon
              color="#F04336"
              size="xl"
              radius="xl"
              variant="light"
              onClick={() => (window.location.href = '/cal')}
              style={{ marginRight: 5 }}
            >
              <Calendar size={34} />
            </ActionIcon>
          )} */}

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
    </>
  )
}

export default PageHeader
