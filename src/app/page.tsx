import React from 'react'

import Navbar from '@/components/Navbar'
import Header from '@/components/Home/Header'
import Footer from '@/components/Footer'
import Fetures from '@/components/Home/Fetures'
import Blog from '@/components/Home/Blog'

const page = () => {
  return (
    <>
    <Navbar />
    <Header />
    <Fetures />
    <Blog />
    <Footer />
    </>
  )
}

export default page