import { Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@mui/material/Alert';
import { showSuccess } from '../../redux/actions/AppActions';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessToast = () => {
    const successMsg = useSelector(state => state.app.successMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        successMsg && setTimeout(() => {
            dispatch(showSuccess(null))
        }, 3000);

    }, [successMsg, dispatch])

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={successMsg}
            key={'success1'}
        >
            <Alert severity={"success"}>{successMsg}</Alert>
        </Snackbar>
    )
}

export default SuccessToast
