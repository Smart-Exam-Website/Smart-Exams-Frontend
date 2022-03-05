import { Typography } from '@mui/material'
import React from 'react'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const NoContentComponent = ({ text }) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <DoNotDisturbAltIcon color='error' />
            <Typography className='ms-1' color={'error'}>{text}</Typography>
        </div>
    )
}

export default NoContentComponent