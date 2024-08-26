import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/globalAPI';

function HotelCard({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        hotel && GetPhoto();
    }, [hotel]);

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
            target="_blank"
            rel="noreferrer"
        >
            <div className="bg-white shadow-md p-4 sm:p-5 mt-4 sm:mt-5 hover:scale-105 transition-transform rounded-lg">
                <img
                    src={photoUrl ? photoUrl : '/placeholder.png'}
                    alt={hotel?.hotelName}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                />
                <div className="mt-3">
                    <h2 className="font-medium text-base sm:text-lg">{hotel?.hotelName}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">📍 {hotel?.hotelAddress}</p>
                    <p className="text-sm sm:text-base text-[#7F57F1] mt-1">💰 {hotel?.price}</p>
                    <p className="text-sm sm:text-base mt-1">⭐️ {hotel?.rating}</p>
                </div>
            </div>
        </Link>
    );
}

export default HotelCard;
