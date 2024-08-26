import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/globalAPI';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPhoto = async () => {
        const data = {
            textQuery: trip?.userPreferences?.place?.label
        };
        const result = await GetPlaceDetails(data).then(resp => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        trip && GetPhoto();
    }, [trip])
    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all'>
                <img src={photoUrl ? photoUrl : '/placeholder.png'} className='w-full h-[220px] object-cover rounded-xl' />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userPreferences?.place?.label}</h2>
                    <p className='text-sm text-gray-500'>{trip?.userPreferences?.numDays} Days {trip?.userPreferences?.budget} Trip </p>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCard
