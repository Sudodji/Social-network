import { Avatar, Button, Card, Chip } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useAuth } from '../../providers/useAuth'

const User = () => {
  const {user, ga} = useAuth()
	return (
		<Card
			variant='outlined'
			sx={{
				padding: 2,
				backgroundColor: '#F1F7FA',
				border: 'none',
				borderRadius: 3,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
			}}
		>
      <Chip
        avatar={<Avatar alt='' src={user?.avatar} />}
        label={user?.name || 'Без имени'}
        variant='outlined'
      />
			<Button variant='outlined' onClick={() => signOut(ga)}>Выйти</Button>
		</Card>
	)
}

export default User
