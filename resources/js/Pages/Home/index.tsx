import React from 'react'
import { ActionIcon, Avatar, Box, Group, Image, ThemeIcon } from '@mantine/core'
import { CirclePlus, ChevronRight } from 'tabler-icons-react'
import { useStyles } from './styles'
interface Props {}
const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']
  const { classes } = useStyles()
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
            <Avatar src={user.avatar} size={40} radius={100} />
          </div>
        </div>

        <div className={classes.missingVotesContainer}>
          <div>
            <div className={classes.missingVotesContainer_top}>12 votos faltantes</div>
            <div className={classes.missingVotesContainer_bottom}>Mostrar</div>
          </div>

          <div className={classes.missingVotesContainer_icon}>
            <ThemeIcon variant="light" radius="xl" size="xl">
              <ChevronRight />
            </ThemeIcon>
          </div>
        </div>

        <Box
          sx={(theme) => ({
            height: 40,
            backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FCAD3F', deg: 90 }),
            color: theme.white,
          })}
        >
          Custom gradient
        </Box>

        <div className={classes.actionButton}>
          <ActionIcon
            size={70}
            radius={100}
            variant="filled"
            sx={(theme) => ({
              // height: 40,
              backgroundImage: theme.fn.gradient({ from: '#F04336', to: '#FCAD3F', deg: 90 }),
              color: theme.white,
            })}
          >
            <CirclePlus size={34} />
          </ActionIcon>
        </div>
      </div>
    </>
  )
}

export default Home
