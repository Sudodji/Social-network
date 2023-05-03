import QuestionAnswer from '@mui/icons-material/QuestionAnswer'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Link, useNavigate } from "react-router-dom"
import { users } from './dataUsers'


const UserItems = () => {
  const navigate = useNavigate();
  return (
    <Card 
      variant='outlined'
      sx={{
        padding: 2,
        backgroundColor: '#F1F7FA',
        border: 'none',
        borderRadius: 3, 
      }}
    >
      {users.map(user => (
        
        <Link
          key={user._id} 
          to={`/profile/${user._id}`} 
          style={{
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            color: '#111',
            marginBottom: 12
          }}
        >
          <Box 
            sx={{
              position: 'relative', 
              marginRight: 2,  
              width: 50,
              height: 50
            }}
            >
            <Avatar 
              src={user.avatar}
              alt=''
              sx={{width: 46, height: 46, borderRadius: '50%'}}
            />
            {user.isOnline &&
            <Box 
              sx={{
                backgroundColor: '#4FB14F',
                border: '2px solid #F1F7FA',
                borderRadius: '50%', 
                width: 12, 
                height: 12, 
                position: 'absolute', 
                bottom: 0, 
                right: 0
              }}
              />
            }
          </Box>
          <span style={{fontSize: 14}}>{user.name}</span>
        </Link>
      ))}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/messages')}>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  )
}

export default UserItems