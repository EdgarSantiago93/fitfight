import React from 'react'
import {
  PasswordInput,
  Paper,
  Container,
  Group,
  Button,
  Image,
  Center,
  Select,
  Avatar,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { login } from '../../api/auth'

interface Props {}

const Login = (props: Props): React.ReactElement => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  })

  const {} = props

  React.useEffect(() => {}, [])

  const users = props['users']
  const data = users.map((user) => {
    return {
      image: user.avatar,
      label: user.name,
      value: user.email,
    }
  })

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string
    label: string
    description: string
  }

  const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} radius={100} />

          <div>
            <Text size="md" weight="semi-bold">
              {label}
            </Text>
          </div>
        </Group>
      </div>
    )
  )

  const [isLoading, setIsLoading] = React.useState(false)

  const attemptLogin = async (data) => {
    setIsLoading(true)
    const apiCall = await login(data)
    console.log('apiCall', apiCall)
    if (apiCall?.success) {
      console.log('successss')
      return (window.location.href = '/')
    }
    setIsLoading(false)
  }

  return (
    <>
      <Container size={420} my={40}>
        <Center>
          <Image src="/img/full_logo.png" width={150} />
        </Center>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => attemptLogin(values))}>
            <Select
              label="Bartolo"
              placeholder="Escoge tu nombre"
              itemComponent={SelectItem}
              data={data}
              // searchable
              maxDropdownHeight={400}
              nothingFound="No hay nadie"
              filter={(value, item) =>
                item.label?.toLowerCase().includes(value.toLowerCase().trim()) || false
              }
              required={true}
              {...form.getInputProps('email')}
              disabled={isLoading}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
              disabled={isLoading}
            />
            <Button fullWidth mt="xl" type="submit" loading={isLoading}>
              Entrar
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Login
