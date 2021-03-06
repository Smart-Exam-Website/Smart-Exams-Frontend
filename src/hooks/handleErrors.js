import { showError } from '../redux/actions/AppActions'
import { logout } from '../redux/actions/AuthActions'
import { store } from '../redux/store'

export default function HandleErrors(err) {
    //Showing Toast Function
    const showErrorToast = (msg) => {
        store.dispatch(
            showError(msg)
        )
    }


    if (err?.message) {
        showErrorToast(err?.message)
    } else if (typeof err === 'string' || err instanceof String) {
        showErrorToast(err)
    } else {
        showErrorToast("UNKNOWN_ERROR")
    }

    if (err?.message?.includes("Unauthenticated")) {
        store.dispatch(logout())
        localStorage.clear()
    }
}