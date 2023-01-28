import { instance } from '../'

export const createEntry = async (data: any) => {
  return instance.post('/create_entry', data).then((response) => {
    return response.data
  })
}
