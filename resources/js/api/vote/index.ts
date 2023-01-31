import { instance } from '../'

export const voteOnEntry = async (data: any) => {
  return instance.post('/vote_on_entry', data).then((response) => {
    return response.data
  })
}
