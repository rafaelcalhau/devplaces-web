import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface DialogProps {
  description?: string;
  handleCancel?: Function;
  handleClose?: Function;
  handleSuccess?: Function;
  labelCancel?: string;
  labelOk?: string;
  open: boolean;
  title: string;
}

function MaterialDialog (props: DialogProps): React.ReactElement {
  const _handleCancel = (): void => {
    if (props.handleCancel) {
      props.handleCancel()
    }
  }

  const _handleClose = (): void => {
    if (props.handleClose) {
      props.handleClose()
    }
  }

  const _handleSuccess = (): void => {
    if (props.handleSuccess) {
      props.handleSuccess()
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={_handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      {
        props.description &&
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span dangerouslySetInnerHTML={{ __html: props ? props.description : '' }}></span>
          </DialogContentText>
        </DialogContent>
      }
      <DialogActions>
        <Button onClick={_handleCancel} color="primary">
          {(props && props.labelCancel) || 'Disagree'}
        </Button>
        <Button onClick={_handleSuccess} color="primary" autoFocus>
          {(props && props.labelOk) || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

MaterialDialog.propTypes = {
  handleCancel: PropTypes.func,
  handleClose: PropTypes.func,
  handleSuccess: PropTypes.func,
  open: PropTypes.bool.isRequired,
  labelCancel: PropTypes.string,
  labelOk: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default MaterialDialog
