import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, colors, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Colors } from '../../../../constants/Colors';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NoContentComponent from '../../../../Components/NoContentComponent/NoContentComponent';

const StudentsList = ({ students }) => {
    const hasMark = (mark) => {
        return mark || mark == 0
    }

    const history = useHistory()
    const location = useLocation()
    const goToThisStudent = (id) => {
        history.push(`${location.pathname}/${id}`)
    }
    return (
        <div>
            <List>
                {[{name:'hoss', mark:20, id:2}]?.map(item => (
                    <ListItem
                        onClick={() => goToThisStudent(item.id)}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <SettingsIcon fontSize='medium' color='secondary' />
                            </IconButton>
                        }>
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
                {![2]?.length?
                    <NoContentComponent text={"No submittion yet"}/>
                    :
                    null
                }
            </List>
        </div>
    )
}

export default StudentsList