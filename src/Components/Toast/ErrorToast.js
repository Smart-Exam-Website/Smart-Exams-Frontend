import { Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@mui/material/Alert';
import { showError } from '../../redux/actions/AppActions';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorToast = () => {
    const errorMsg = useSelector(state => state.app.errorMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        errorMsg && setTimeout(() => {
            dispatch(showError(null))
        }, 3000);

    }, [errorMsg, dispatch])

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={errorMsg}
            key={'error1'}
            autoHideDuration={3000}
        >
            <Alert severity={"error"}>{errorMsg}</Alert>
        </Snackbar>
    )
}

export default ErrorToast
