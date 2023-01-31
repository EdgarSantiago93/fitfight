import React from 'react'

import { useStyles } from './styles'

const RestDay = () => {
  const { classes } = useStyles()

  React.useEffect(() => {}, [])

  return (
    <div className={classes.noEntry}>
      <div className={classes.label}>Día de descanso</div>
      <div>😴</div>
    </div>
  )
}

export default RestDay
