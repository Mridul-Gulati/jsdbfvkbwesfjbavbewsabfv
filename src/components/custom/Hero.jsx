import React from 'react'
import { Button } from '../UI/Button'
import { Link } from 'react-router-dom'
import Footer from '../../view-trip/components/Footer'

function Hero() {
    return (
        <div className='flex flex-col items-center px-4 md:px-16 lg:px-28 xl:px-56 gap-6 md:gap-8 lg:gap-9 mt-8 md:mt-10'>
            <h1 className='font-extrabold text-3xl md:text-4xl lg:text-5xl text-center mt-12 md:mt-16'>
                <span className='text-[#7F57F1]'>AI Powered</span> Personalised Travel Itinerary Generator
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-gray-500 text-center'>
                Experience Your Perfect Adventure with AI-Powered, Personalized Travel Itineraries Tailored Just for You
            </p>

            <Link to={'/create-trip'}>
                <Button>Try for Free</Button>
            </Link>

            <img src='./landing.png' alt='landing' className='w-full max-w-md md:max-w-lg lg:max-w-xl' />
            <Footer />
        </div>
    )
}

export default Hero
