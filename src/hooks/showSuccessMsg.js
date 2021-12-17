import { showSuccess } from '../redux/actions/AppActions'
import { store } from "../redux/store"

export default function showSuccessMsg(msg) {

    store.dispatch(
        showSuccess(msg)
    )

    return null
}