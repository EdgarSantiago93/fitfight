import React from 'react'
import { Button } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { useStyles } from './styles'
// import heicConvert from 'heic-convert'

const ImageViewer = ({ image, isSmall = false, isHeic = false }) => {
  const { classes, cx } = useStyles()

  React.useEffect(() => {}, [image])

  const [imageUrl, _setImageUrl] = React.useState(
    `${isHeic ? 'https://cpmvzflwta.cloudimg.io/' : ''}${image}`
  )

  const openPhotoModal = () => {
    openModal({
      centered: true,
      children: (
        <>
          <div>
            <img src={imageUrl} alt="" className={classes.photoView} />
          </div>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <Button onClick={() => closeAllModals()}>Cerrar</Button>
          </div>
        </>
      ),
    })
  }

  return (
    <>
      {image ? (
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          key={imageUrl}
          className={cx(isSmall ? classes.smallImage : classes.image)}
          onClick={() => openPhotoModal()}
        ></div>
      ) : (
        <div className={cx(isSmall ? classes.noImageSmall : classes.noImage)} key={imageUrl}>
          🤷🏼‍♂️
        </div>
      )}
    </>
  )
}

export default ImageViewer
