import { Box } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

const Card:FC<PropsWithChildren> = ({children}) => {
	return (
		<Box
			sx={{
				border: '1px solid #ccc',
				borderRadius: '10px',
				padding: 2,
				marginTop: 4,
			}}
		>
			{children}
		</Box>
	)
}

export default Card
