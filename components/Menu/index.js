import Link from 'next/link'
import React from 'react'
import styles from './Menu.module.css'
import { ImBooks } from 'react-icons/im';


const Menu = () => {
  return (
    <nav className={styles.menu}>
    <div className={styles.divIcone}>
        <Link href={'/'}>
            <ImBooks size={55} />
        </Link>
    </div>

    <div className={styles.links}>
        <Link href={'/autores'} className={styles.link}>
            Autores
        </Link>

        <Link href={'/editoras'} className={styles.link}>
            Editoras
        </Link>

        <Link href={'/livros'} className={styles.link}>
            Livros
        </Link>

        <Link href={'/usuarios'} className={styles.link}>
            Usuários
        </Link>

        <Link href={'/avaliacao'} className={styles.link}>
            Avaliação
        </Link>

        <Link href={'/dashboard'} className={styles.link}>
            Dashboard
        </Link>
    </div>
</nav>
  )
}

export default Menu