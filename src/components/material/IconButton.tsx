import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

interface IconButtonProps {
  className?: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  children: ReactElement | [ReactElement];
  label: string;
  icon?: JSX.Element;
  onClick?: Function;
  size?: 'small' | 'medium' | 'large';
}

function IconButton (props: IconButtonProps): ReactElement {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        margin: theme.spacing(1)
      },
      extendedIcon: {
        marginRight: theme.spacing(1)
      }
    })
  )

  const classes = useStyles({})

  const _onClick = (): void => {
    setTimeout(() => props.onClick && props.onClick(), 400)
  }

  let componentClasses = classes.margin

  if (props.className) {
    componentClasses += ` ${props.className}`
  }

  return (
    <Fab
      size={props.size || 'small'}
      color={props.color || 'secondary'}
      aria-label={props.label}
      className={componentClasses}
      onClick={_onClick}
    >
      {props.children}
    </Fab>
  )
}

IconButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  size: PropTypes.string
}

export default IconButton
