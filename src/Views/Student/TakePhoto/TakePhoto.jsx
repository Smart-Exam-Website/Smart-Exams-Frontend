import Webcam from "react-webcam";
import { useRef, useCallback } from "react";
import Button from '@mui/material/Button';

// const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user"
// };

const TakePhoto = (props) => {
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {


            const imageSrc = webcamRef.current.getScreenshot();
            props.captured(imageSrc)
            props.clicked()

        },





        [webcamRef,props]
    );

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <Webcam
                    audio={false}
                    // height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                // width={1280}
                // videoConstraints={videoConstraints}
                />

            </div>
            {/* {imgSrc && (
                <img src={imgSrc} alt="555" />

            )} */}
            <div className="d-flex justify-content-center">
                <Button
                    className='btn m-2 p-2 text-white'
                    size="small"
                    variant="contained"
                    color='success'
                    onClick={capture}
                >
                    Capture
                </Button>

            </div>
        </div>
    );
};
export default TakePhoto;
