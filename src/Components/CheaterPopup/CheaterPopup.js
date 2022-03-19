import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InspectorCheaterImage from '../../assets/images/cheat-inspector.png'

const CheaterPopup = ({ isVisible, setVisibility, cheatReasons, cheaterImage }) => {

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
                    <div className='d-flex'>
                        {cheaterImage ?
                            <img className='w-50' alt='cheater' src={cheaterImage} />
                            :
                            null
                        }
                        <img className={cheaterImage ? 'w-50' : 'w-100'} alt='detector' src={InspectorCheaterImage} />
                    </div>
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
