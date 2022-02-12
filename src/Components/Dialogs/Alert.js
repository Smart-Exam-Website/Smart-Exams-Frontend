import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../../redux/actions/AppActions';
import { Button } from '@mui/material';

const Alert = () => {
    const alertObject = useSelector(state => state.app.alertObject)
    const dispatch = useDispatch()
    const closeHandler = () => {
        dispatch(hideAlert())
    }
    const confirmHandler = () => {
        alertObject?.alertFunction()
    }

    return (
        <Dialog
            open={Boolean(alertObject?.header)}
            onClose={closeHandler}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alertObject?.header}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertObject?.details}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler} autoFocus>Cancel</Button>
                <Button color='error' onClick={confirmHandler}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Alert