// @ts-nocheck,
import React from 'react'
import { getS3Token, uploadToS3, getMediaSignedURL } from '../../api/media'
import { Loader, Button } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { useStyles } from './styles'

const ImageUploader = ({ form, formValue, loading }) => {
  const { classes } = useStyles()
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [isUploading, setIsUploading] = React.useState(false)
  const [fileReady, setFileReady] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileInput = (e) => uploadFile(e.target.files[0])

  const uploadFile = async (file) => {
    setIsUploading(true)
    loading(true) // this is the loading function from the parent component
    const requestObject = {
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    }
    const getTokenCall = await getS3Token(requestObject)

    if (getTokenCall?.success) {
      //   setFileKey(getTokenCall?.data.key)
      await uploadToS3({ url: getTokenCall?.data.url, file: file }, transformProgress).then(
        async () => {
          await getMediaSignedURL({
            file_key: getTokenCall?.data.key,
            is_live: false,
            file_type: file.type,
          })
            .then((response) => {
              setPreviewUrl(() => generateUrl(response.data))
              setIsUploading(false)
              setFileReady(true)
              form.setFieldValue(formValue, getTokenCall?.data.id)
              loading(false)
            })
            .catch((_error) => {
              loading(false)
            })
        }
      )
    }
  }

  const generateUrl = (url) => {
    if (url.toLowerCase().includes('.heic') || url.toLowerCase().includes('.heif')) {
      return 'https://cpmvzflwta.cloudimg.io/' + url
    }
    return url
  }

  const transformProgress = (progress) => {
    let pre = Math.round(progress * 100)
    setUploadProgress(pre)
  }

  React.useEffect(() => {}, [])

  const openPhotoModal = () => {
    openModal({
      centered: true,
      children: (
        <>
          <div>
            <img src={previewUrl} alt="" className={classes.photoView} />
          </div>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <ButtonConfirm callback={deleteFile} text="Borrar" />
          </div>
        </>
      ),
    })
  }

  const deleteFile = () => {
    setPreviewUrl('')
    setFileReady(false)
    form.setFieldValue(formValue, '')
    setIsUploading(false)
    setUploadProgress(0)
    closeAllModals()
  }

  const ButtonConfirm = ({ callback, text }) => {
    const [isFirstTime, setIsFirstTime] = React.useState<boolean>(true)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [timeoutVar, setTimeoutVar] = React.useState<any>('')
    const handleClick = () => {
      if (isFirstTime) {
        setIsFirstTime(false)
        setTimeoutVar(() =>
          setTimeout(() => {
            setIsFirstTime(true)
          }, 2000)
        )
      } else {
        clearTimeout(timeoutVar)
        setIsLoading(true)
        callback()
      }
    }
    let variant = isFirstTime ? 'filled' : 'outline'
    return (
      <>
        {/* @ts-ignore */}
        <Button onClick={handleClick} variant={variant} loading={isLoading}>
          {isFirstTime ? text : 'Confirmar'}
        </Button>
      </>
    )
  }
  const handleInputRefClick = () => {
    if (isUploading) return
    if (inputRef.current === null) return
    inputRef.current.click()
  }

  return (
    <>
      {!fileReady ? (
        <div className={classes.uploadButton} onClick={handleInputRefClick}>
          {isUploading ? (
            <div className={classes.loaderProgress}>
              <Loader />
              {uploadProgress}%
            </div>
          ) : (
            '📸'
          )}
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${previewUrl})`,
          }}
          className={classes.image}
          onClick={() => openPhotoModal()}
        ></div>
      )}

      <input type="file" onChange={handleFileInput} ref={inputRef} style={{ display: 'none' }} />
    </>
  )
}

export default ImageUploader
