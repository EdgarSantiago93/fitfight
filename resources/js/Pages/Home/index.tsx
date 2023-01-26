import React from 'react'
import { Button, Text, ActionIcon } from '@mantine/core'
import { CirclePlus } from 'tabler-icons-react'

interface Props {}

const Home = (props: Props): React.ReactElement => {
  const {} = props
  const user = props['user']

  return (
    <>
      <div>
        <Text>Buenos dias,</Text>
        <Text>{user.name}</Text>
      </div>
      this is the first start of sth new
      <Button>Click me!</Button>;
      <div>
        <ActionIcon size={70} radius={100} variant="filled">
          <CirclePlus size={34} />
        </ActionIcon>
      </div>
    </>
  )
}

export default Home
