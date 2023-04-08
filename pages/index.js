import Head from 'next/head'
import { Inter } from 'next/font/google'

//import Firebasedata from '../components/Firebasedata.'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'

import DataTable from '../components/DataTable'

import Firedatabase from '@/components/Firedatabase'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
      </Head>
     
      <Firedatabase />
    
    </div>
  )
}
