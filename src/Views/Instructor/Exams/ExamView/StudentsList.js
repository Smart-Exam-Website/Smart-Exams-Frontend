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

const StudentsList = ({ students }) => {
    const hasMark = (mark) => {
        return mark || mark == 0
    }

    const history = useHistory()
    const location = useLocation()
    const goToThisStudent = (id) => {
        history.push(`${location.pathname}/${id}`)
    }
    
    const markAllHandler = () => {

    }

    return (
        <div>
            <div className="d-flex justify-content-end">
                <Button onClick={markAllHandler} color='success' variant="contained">Mark All <CheckOutlinedIcon /></Button>
            </div>
            <Paper className='mt-3' elevation={3}>
                <List>
                    {[{ name: 'hoss', mark: 20, id: 2 }, { name: 'hoss', mark: 20, id: 2 }]?.map(item => (
                        <ListItem onClick={() => goToThisStudent(item.id)}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src="https://mui.com/static/images/avatar/3.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primaryTypographyProps={hasMark(item.mark) && { color: Colors.success, fontWeight: 'bolder' }}
                                    primary={`${item.name}`}
                                    secondary={hasMark(item.mark) && `Mark: ${item.mark}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                    }
                    {![2]?.length ?
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