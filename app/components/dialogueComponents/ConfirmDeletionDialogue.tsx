import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

type Props = {
  handleClose: any,
  handleDeleteAsset: any,
  open: boolean
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeletionDialogue({handleClose, handleDeleteAsset: handleDeleteAsset, open}: Props) {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Danger Zone!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='navbar__button' onClick={() => {handleDeleteAsset(); handleClose()}}>DELETE</button>
          <button className='navbar__button' onClick={handleClose}>CANCEL</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}