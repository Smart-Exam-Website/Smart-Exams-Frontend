import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InspectorCheaterImage from '../../assets/images/cheat-inspector.png'

const CheaterPopup = ({ isVisible, setVisibility, cheatReasons }) => {

    const handleClose = () => {
        setVisibility(false);
    };

    return (
        <div>
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle color='error' id="alert-dialog-title">
                    {"CHEAT ATTEMPT !!"}
                </DialogTitle>
                <DialogContent>
                    <img className='w-100' alt='detector' src={InspectorCheaterImage} />
                    <DialogContentText id="alert-dialog-description">
                        You're trying to cheat by <b className='text-uppercase'>{cheatReasons?.join(' & ')}</b> and we have reported that attempt to your instructor.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CheaterPopup
