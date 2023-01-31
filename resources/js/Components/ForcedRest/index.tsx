import React from 'react'

import { useStyles } from './styles'

const ForcedRest = () => {
  const { classes } = useStyles()

  React.useEffect(() => {}, [])

  return (
    <div className={classes.noEntry}>
      <div className={classes.label}>Se acabó la semana</div>
      <div>🌙</div>
    </div>
  )
}

export default ForcedRest
