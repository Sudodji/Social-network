import { Box, ImageList, ImageListItem } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { collection, onSnapshot } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from '../../../types'
import { useAuth } from '../../providers/useAuth'
import Card from '../../ui/Card'


const Posts:FC = () => {
	const { db } = useAuth()
	const [posts, setPosts] = useState<IPost[]>([])
	useEffect(() => {
		const unsub = onSnapshot(collection(db, 'posts'), doc => {
			const array:IPost[] = []
			doc.forEach((d: any) => {
				array.push(d.data())
			})
			setPosts(array)
		})

		return () => {
			unsub()
		}
	}, [])
	return (
		<>
			{posts.map((post, index) => (
				<Card key={`Post-${index}`}>
					<Link
						key={post.author._id}
						to={`/profile/${post.author._id}`}
						style={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							color: '#111',
							marginBottom: 12,
						}}
					>
						<Box
							sx={{
								position: 'relative',
								marginRight: 2,
								width: 50,
								height: 50,
							}}
						>
							<Avatar
								src={post.author.avatar}
								alt=''
								sx={{ width: 46, height: 46, borderRadius: '50%' }}
							/>
							<Box
								sx={{
									backgroundColor: '#4FB14F',
									border: '2px solid #F1F7FA',
									borderRadius: '50%',
									width: 12,
									height: 12,
									position: 'absolute',
									bottom: 0,
									right: 0,
								}}
							/>
						</Box>
						<div>
							<div style={{ fontSize: 14 }}>{post.author.name}</div>
							<div style={{ fontSize: 14, opacity: '0.6' }}>
								{String(post.createdAt)}
							</div>
						</div>
					</Link>
					<p>{post.content}</p>
					{post.images?.length && (
						<ImageList variant='masonry' cols={3} gap={8}>
							{post.images?.map(image => (
								<ImageListItem key={image}>
									<img src={image} alt={''} loading='lazy' />
								</ImageListItem>
							))}
						</ImageList>
					)}
				</Card>
			))}
		</>
	)
}

export default Posts
