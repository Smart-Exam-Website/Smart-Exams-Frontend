import _axios from "../axios-instance";

export class UploadServices {
    static uploadImage(file) {
        const formDate = new FormData()
        formDate.append('image', file)
        return _axios.post('/image-upload', formDate, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }
}
