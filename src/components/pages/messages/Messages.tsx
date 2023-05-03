import { Send as SendIcon } from '@mui/icons-material'
import {
	Alert,
	Avatar,
	Divider,
	Fab,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { IMessage } from '../../../types'
import { useAuth } from '../../providers/useAuth'
import Card from '../../ui/Card'

const Messages: FC = () => {
	const { user, db } = useAuth()
	const [error, setError] = useState('')
	const [messages, setMessages] = useState<IMessage[]>([])
	const [message, setMessage] = useState('')
	useEffect(() => {
		const unsub = onSnapshot(query(collection(db, 'messages'), orderBy("createdAt", "asc")), doc => {
			const array: IMessage[] = []
			doc.forEach((d: any) => {
				array.push(d.data())
			})
			setMessages(array)
		})
		return () => {
			unsub()
		}
	}, [])
	const addMessageHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			await addDoc(collection(db, 'messages'), {
				user,
				message,
				createdAt: new Date()
			})
		} catch (e: any) {
			setError(e)
		}
		setMessage('')
	}
	return (
		<>
			{error && (
				<Alert severity='error' style={{ marginBottom: 20 }}>
					{error}
				</Alert>
			)}
			<Card>
				<List style={{ height: '65vh', overflowY: 'auto' }}>
					{messages.map((msg, index) => (
						<ListItem key={`Message-${index}`}>
							<Grid
								container
								sx={msg.user._id === user?._id ? { textAlign: 'right' } : {}}
							>
								<Grid display='flex' justifyContent={msg.user._id === user?._id? 'flex-end' : ''} item xs={12}>
									<Avatar
										src={msg.user.avatar}
										sx={{ width: '30px', height: '30px' }}
									/>
								</Grid>
								<Grid item xs={12}>
									<ListItemText secondary={msg.user.name} />
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										primary={msg.message}
										style={
											msg.user._id === user?._id ? { color: '#1976d2' } : {}
										}
									/>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
				<Divider />
				<Grid container style={{ padding: '20px' }}>
					<Grid item xs={11}>
						<TextField
							id='outlined-basic-email'
							label='Напишите что-нибудь'
							fullWidth
							onChange={e => setMessage(e.target.value)}
							value={message}
						/>
					</Grid>
					<Grid xs={1}>
						<Fab
							color='primary'
							onClick={addMessageHandler}
							style={{ marginLeft: 10 }}
						>
							<SendIcon />
						</Fab>
					</Grid>
				</Grid>
			</Card>
		</>
	)
}

export default Messages
