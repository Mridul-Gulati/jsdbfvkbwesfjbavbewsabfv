import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/globalAPI';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async () => {
        const data = {
            textQuery: trip?.userPreferences?.place?.label
        };
        await GetPlaceDetails(data).then(resp => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        trip && GetPhoto();
    }, [trip]);

    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-transform'>
                <img
                    src={photoUrl ? photoUrl : '/placeholder.png'}
                    className='w-full h-[180px] sm:h-[220px] md:h-[240px] object-cover rounded-xl'
                    alt='trip destination'
                />
                <div className='mt-3 px-2'>
                    <h2 className='font-bold text-lg md:text-xl'>{trip?.userPreferences?.place?.label}</h2>
                    <p className='text-sm md:text-base text-gray-500'>
                        {trip?.userPreferences?.numDays} Days {trip?.userPreferences?.budget} Trip
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCard;
