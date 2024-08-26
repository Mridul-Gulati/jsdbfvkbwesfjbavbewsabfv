import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/globalAPI';

function HotelCard({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        };
        const result = await GetPlaceDetails(data).then(resp => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        hotel && GetPhoto();
    }, [hotel])
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + hotel?.hotelAddress} target='_blank' rel='noreferrer'>
            <div className='bg-white shadow-md p-5 mt-5 hover:scale-105 transition-all'>
                <img src={photoUrl ? photoUrl : '/placeholder.png'} className='w-full h-40 object-cover rounded-xl' />
                <div className='my-2'>
                    <h2 className='font-medium '>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm text-[#7F57F1]'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm '>⭐️ {hotel?.rating}</h2>

                </div>
            </div>
        </Link>
    )
}

export default HotelCard
