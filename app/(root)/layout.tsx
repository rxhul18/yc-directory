import React from 'react'
import Navbar from '../comoponents/Navbar'

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='font-work-sans'>
        <Navbar />
        {children}
    </main>
  )
}
