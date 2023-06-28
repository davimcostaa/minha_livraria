import Image from 'next/image'
import React from 'react'
import styles from './Banner.module.css'

const Banner = ({ titulo }) => {

  return (
    
    <section className={styles.banner}>
          <div className={styles.backgroundImage}>
                <Image src="/livraria_fundo.jpg" layout="fill" objectFit="cover" />
            </div>
      <h1 className={styles.titulo}> {titulo}  </h1>
      
    </section>
  )
}

export default Banner