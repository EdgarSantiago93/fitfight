import { AxiosProgressEvent } from 'axios'
import { instance } from '../'

export const getS3Token = async (data: any) => {
  return instance.post('/get_media_token', data).then((response) => {
    return response.data
  })
}

export const uploadToS3 = async (data: any, setProgress) => {
  let p: any = 0
  return instance
    .put(data.url, data.file, {
      headers: {
        'Content-Type': data.file.type,
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        p = progressEvent.progress
        setProgress(p)
      },
    })
    .then(async (response) => {
      return response.data
    })
}

export const getMediaSignedURL = async (data: any) => {
  return instance.post('/get_signed_url', data).then((response) => {
    return response.data
  })
}
