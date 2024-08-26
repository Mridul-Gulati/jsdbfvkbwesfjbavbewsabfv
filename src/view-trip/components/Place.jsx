import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/globalAPI';

function Place({ place }) {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async () => {
        const data = {
            textQuery: place?.placeName,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        place && GetPhoto();
    }, [place]);

    return (
        <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName}
            target='_blank'
            rel='noreferrer'
        >
            <div className='border rounded-xl p-4 sm:p-5 mt-2 flex flex-col sm:flex-row gap-4 sm:gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img
                    src={photoUrl ? photoUrl : '/placeholder.png'}
                    className='w-full h-[150px] sm:h-[130px] object-cover rounded-xl'
                    alt={place?.placeName}
                />
                <div className='flex flex-col justify-center'>
                    <h2 className='font-bold text-lg sm:text-xl'>{place?.placeName}</h2>
                    <p className='text-sm sm:text-base text-gray-500 mt-1'>{place?.placeDetails}</p>
                </div>
            </div>
        </Link>
    );
}

export default Place;
