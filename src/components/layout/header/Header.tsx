import { Search } from '@mui/icons-material'
import { FC, useState } from 'react'
import styles from './Header.module.css'
import logoImg from './vk-logo.png'
const Header: FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false)
	return (
		<header className={styles.header}>
			<div className={styles['image-wrapper']}>
				<img src={logoImg} alt='' />
			</div>
			<div className={styles.wrapper}>
        {!isSearchActive && (
          <Search />
        )}
				<input 
          type='text' 
          placeholder='Поиск' 
          onClick={() => setIsSearchActive(true)}
        />
			</div>
		</header>
	)
}

export default Header
