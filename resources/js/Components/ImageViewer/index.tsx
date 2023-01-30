import React from 'react'
import { Button } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { useStyles } from './styles'

const ImageViewer = ({ image, isSmall = false }) => {
  const { classes, cx } = useStyles()

  React.useEffect(() => {}, [])

  const openPhotoModal = () => {
    openModal({
      centered: true,
      children: (
        <>
          <div>
            <img src={image} alt="" className={classes.photoView} />
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
            backgroundImage: `url(${image})`,
          }}
          className={cx(isSmall ? classes.smallImage : classes.image)}
          onClick={() => openPhotoModal()}
        ></div>
      ) : (
        <div className={cx(isSmall ? classes.noImageSmall : classes.noImage)}>🤷🏼‍♂️</div>
      )}
    </>
  )
}

export default ImageViewer
