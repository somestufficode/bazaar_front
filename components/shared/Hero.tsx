import React from 'react'
import Image from 'next/image'
// love u

const Hero = () => {
  return (
    <div className='container mx-auto mt-10 flex items-center justify-between px-6'>
      <div className='max-w-lg'>
        <h1 className='text-5xl font-bold leading-tight'>Discover Your Fashion with Us</h1>
        <p className='mt-4 text-gray-600'>Explore our curated collection of stylish clothing and accessories tailored to your unique taste.</p>
        <button className='mt-6 px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md'>EXPLORE NOW</button>
      </div>
      <div className='hidden lg:block'>
        <Image 
          src='/banner.jpg' 
          alt='Fashion model' 
          className='xlg roundedshadow-lg w-full max-w-sm'
          width={500}
          height={500}
          priority={true}
        />
      </div>
    </div>
  )
}

export default Hero
