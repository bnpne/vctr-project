import dynamic from 'next/dynamic'
import React from 'react'
// import Artboard from '@components/artboard'

const Artboard = dynamic(() => import('@components/artboard'), { ssr: false })

const Index = () => {
  return (
    <div>
      <Artboard />
    </div>
  )
}

export default Index
