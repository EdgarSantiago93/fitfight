import React from 'react'
import { Loader, LoadingOverlay } from '@mantine/core'
import { useStyles } from './styles'
import moment from 'moment'

import { useForm } from '@mantine/form'
import ImageUploader from '../../Components/ImageUploader'

interface Props {}
const Test = (props: Props): React.ReactElement => {
  const {} = props

  const { classes } = useStyles()
  moment.locale('es')

  const [isLoading, setisLoading] = React.useState()
  const [isLoadingOverlay, _setIsLoadingOverlay] = React.useState(false)

  React.useEffect(() => {}, [])

  const form = useForm({
    initialValues: {
      first_img: false,
      scd_img: false,
      thrd_img: false,
    },
  })

  return (
    <>
      <div className={classes.wrapper}>
        TEST
        <LoadingOverlay visible={isLoadingOverlay} overlayBlur={2} />
        {/* <PageHeader user={user} showCal={true} showLb={true} showToday={true} /> */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div className={classes.todayDateContainer}>
                <div>{moment().format('DD [de] ')}</div>
                <div style={{ textTransform: 'capitalize', marginLeft: '3px' }}>
                  {moment().format('MMMM')}
                </div>
              </div>
              <div className={classes.todayLabel}>TEST UPLOAD</div>
            </div>
          </div>

          <div className={classes.entryDescription}>
            {isLoading && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
                <Loader variant="bars" />
              </div>
            )}
            {/* {currentEntry} */}
            <div className={classes.label}>1</div>
            <ImageUploader
              formValue="first_img"
              form={form}
              loading={setisLoading}
              key="first_img_key"
            />
            <div className={classes.label}>2</div>
            <ImageUploader
              formValue="scd_img"
              form={form}
              loading={setisLoading}
              key="scnd_img_key"
            />
            <div className={classes.label}>3</div>

            <ImageUploader
              formValue="thrd_img"
              form={form}
              loading={setisLoading}
              key="thrd_img_key"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Test
