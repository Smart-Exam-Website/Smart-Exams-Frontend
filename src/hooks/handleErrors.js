import { showError } from '../redux/actions/AppActions'
import { store } from '../redux/store'

export default function HandleErrors(err) {
    //Showing Toast Function
    const showErrorToast = (msg) => {
        store.dispatch(
            showError(msg)
        )
    }

    if (err?.response?.data?.message) {
        showErrorToast(err?.response?.data?.message)
    } else if (typeof err?.response?.data === 'string' || err?.response?.data instanceof String) {
        showErrorToast(err?.response?.data)
    } else if (err?.message) {
        showErrorToast(err?.message)
    } else if (typeof err === 'string' || err instanceof String) {
        showErrorToast(err)
    } else {
        showErrorToast("UNKNOWN_ERROR")
    }
}