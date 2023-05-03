import { Alert, Box, TextField } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { FC, useState } from 'react'
import { useAuth } from '../../providers/useAuth'


const AddPost: FC = () => {
	const [content, setContent] = useState('')
	const [error, setError] = useState('')
	const { user, db } = useAuth()
	const addPostHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && user) {
			try {
				await addDoc(collection(db, 'posts'), {
					author: user,
					content,
          createdAt: 'user.createdAt'
				})
			} catch (e: any) {
				setError(e)
			}
			setContent('')
		}
	}
	return (
		<>
			{error && (
				<Alert severity='error' style={{ marginBottom: 20 }}>
					{error}
				</Alert>
			)}
			<Box
				sx={{
					border: '1px solid #ccc',
					borderRadius: '10px',
					padding: 2,
				}}
			>
				<TextField
					label='Расскажи, что у тебя нового'
					variant='outlined'
					InputProps={{
						sx: { borderRadius: '25px', bgcolor: '#F8F8F8', border: 'none' },
					}}
					sx={{
						width: '100%',
					}}
					onKeyPress={addPostHandler}
					onChange={e => setContent(e.target.value)}
					value={content}
				/>
			</Box>
		</>
	)
}

export default AddPost
