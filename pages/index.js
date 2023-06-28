import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Menu from '@/components/Menu'
import Banner from '@/components/Banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Menu /> 

      <Banner titulo='Sua livraria' />
    </>
  )
}
