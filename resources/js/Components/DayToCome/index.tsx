import React from 'react'

import { useStyles } from './styles'

const DayToCome = () => {
  const { classes } = useStyles()

  React.useEffect(() => {}, [])
  const getImg = (min = 0, max = 100) => {
    let difference = max - min
    let rand = Math.random()
    rand = Math.floor(rand * difference)
    rand = rand + min
    if (rand == 7) {
      rand = 6
    }
    return rand
  }
  return (
    <div className={classes.noEntry}>
      <div className={classes.label}>Aún no llega este día</div>
      <div>
        <img src={`/img/dogs/${getImg(1, 7)}.png`} alt="" className={classes.dogImg} />
      </div>
    </div>
  )
}

export default DayToCome
