import React from 'react'
import { Button } from '../UI/Button'
import { Link } from 'react-router-dom'
import Footer from '../../view-trip/components/Footer'
function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9 mt-10'>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#7F57F1]'>AI Powered</span> Personalised Travel Itinerary Generator
            </h1>
            <p className='text-xl text-gray-500 text-center'>Experience Your Perfect Adventure with AI-Powered, Personalized Travel Itineraries Tailored Just for You</p>

            <Link to={'/create-trip'}>
                <Button>Try for Free</Button>
            </Link>

            <img src='./landing.png' alt='landing' className='w-full' />
            <Footer />
        </div>
    )
}

export default Hero
