import React, { ReactElement } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

function Spinner (props: any): ReactElement {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      progress: {
        color: props.color,
        margin: theme.spacing(2)
      }
    })
  )

  const classes = useStyles()

  return <CircularProgress className={classes.progress} />
}

export default Spinner
