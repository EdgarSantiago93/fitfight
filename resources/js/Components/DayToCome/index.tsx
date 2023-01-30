import React from 'react'

import { useStyles } from './styles'

const DayToCome = () => {
  const { classes } = useStyles()

  React.useEffect(() => {}, [])

  return (
    <div className={classes.noEntry}>
      <div className={classes.label}>Day to come</div>
      <div>📅</div>
    </div>
  )
}

export default DayToCome
