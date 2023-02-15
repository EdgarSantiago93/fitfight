import React from 'react'
import { getS3Token, uploadToS3, getMediaSignedURL } from '../../api/media'
import { Loader, Button } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { useStyles } from './styles'

const ImageUploaderTest = ({ form, formValue, loading }) => {
  const { classes } = useStyles()
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [isUploading, setIsUploading] = React.useState(false)
  const [fileReady, setFileReady] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileInput = (e) => uploadFile(e.target.files[0])

  const checkHeic = (url): boolean => {
    if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
      return true
    }
    return false
  }
  const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file)
    console.log(imageBitmap)
    console.log(imageBitmap.width)
    console.log(imageBitmap.height)
    // Draw to canvas
    const canvas = document.createElement('canvas')
    // const canvas = document.getElementById('test') as HTMLCanvasElement
    canvas.width = imageBitmap.width
    canvas.height = imageBitmap.height
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(imageBitmap, 0, 0)

    // Turn into Blob
    // const blob: Blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality))

    // Turn Blob into File

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            resolve(new Blob())
          }
        },
        type,
        quality
      )
    })
    return new File([blob as BlobPart], file.name, {
      type: blob.type,
    })
  }

  // Get the selected file from the file input
  // const input = document.querySelector('.my-image-field')
  // input.addEventListener('change', async (e) => {
  //   // Get the files
  //   const { files } = e.target

  //   // No files selected
  //   if (!files.length) return

  //   // We'll store the files in this data transfer object
  //   const dataTransfer = new DataTransfer()

  //   // For every file in the files list
  //   for (const file of files) {
  //     // We don't have to compress files that aren't images
  //     if (!file.type.startsWith('image')) {
  //       // Ignore this file, but do add it to our result
  //       dataTransfer.items.add(file)
  //       continue
  //     }

  //     // We compress the file by 50%
  //     const compressedFile = await compressImage(file, {
  //       quality: 0.5,
  //       type: 'image/jpeg',
  //     })

  //     // Save back the compressed file instead of the original file
  //     dataTransfer.items.add(compressedFile)
  //   }

  //   // Set value of the file input to our new files list
  //   e.target.files = dataTransfer.files
  // })

  const uploadFile = async (file) => {
    setIsUploading(true)
    loading(true)
    if (!checkHeic(file.name)) {
      console.log('no es heic, compressing')
      const compressedFile = await compressImage(file, {
        quality: 0.5,
        type: 'image/jpeg',
      })
      file = compressedFile
    }

    // console.log(compressedFile)

    // this is the loading function from the parent component
    const requestObject = {
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    }
    console.log(requestObject)
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
    if (url?.toLowerCase().includes('.heic') || url?.toLowerCase().includes('.heif')) {
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
      {/* <div>
        <canvas id="test"></canvas>
      </div> */}

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

export default ImageUploaderTest
