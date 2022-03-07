import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Button, colors, IconButton, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Colors } from '../../../../constants/Colors';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NoContentComponent from '../../../../Components/NoContentComponent/NoContentComponent';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import useImageResolver from '../../../../hooks/useImageResolver';
import { MarkExamServices } from '../../../../apis/Services/MarkExamService';
import { useParams } from 'react-router-dom';
import showSuccessMsg from '../../../../hooks/showSuccessMsg';
import HandleErrors from '../../../../hooks/handleErrors';

const StudentsList = ({ students }) => {
    const imageResolver = useImageResolver()

    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const goToThisStudent = (id) => {
        history.push(`${location.pathname}/${id}`)
    }

    const markAllHandler = () => {
        MarkExamServices.markAllAutomatic(params?.examId)
            .then(res => {
                showSuccessMsg("Mark All Student Successfully!")
            })
            .catch(err => HandleErrors(err))
    }

    return (
        <div>
            <div className="d-flex justify-content-end">
                <Button onClick={markAllHandler} color='success' variant="contained">Mark All <CheckOutlinedIcon /></Button>
            </div>
            <Paper className='mt-3' elevation={3}>
                <List>
                    {students?.map(item => (
                        <ListItem onClick={() => goToThisStudent(item.student_id)}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={imageResolver(item?.image)} />
                                </ListItemAvatar>
                                <ListItemText
                                    primaryTypographyProps={item?.isMarked && { color: Colors.success, fontWeight: 'bolder' }}
                                    primary={`${item.name}`}
                                    secondary={item?.isMarked && `Mark: ${item.mark}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                    }
                    {!students?.length ?
                        <NoContentComponent text={"No submittion yet"} />
                        :
                        null
                    }
                </List>
            </Paper>
        </div>
    )
}

export default StudentsList