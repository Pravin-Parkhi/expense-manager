import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core'

import './dialog-box.component.scss'

function DialogBox (props) {
  const { message, handleCloseCallback, proceedDeletionCallback } = props

  const handleClose = () => {
    handleCloseCallback()
  }

  const handleProceed = () => {
    proceedDeletionCallback()
  }

  return (
    <Dialog
      className='dialog-box'
      open
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      classes={{
        paper: 'paper'
      }}
    >
      <DialogTitle>Aer you sure you want to proceed?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>Cancel</Button>
        <Button onClick={handleProceed} color='primary' className='submit-btn'>Proceed</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox
