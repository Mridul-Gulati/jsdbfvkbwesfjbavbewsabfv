import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UI/Button';
import { IoIosSend } from 'react-icons/io';
import { GetPlaceDetails } from '../../service/globalAPI';
import { PHOTO_REF_URL } from '../../service/globalAPI';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/UI/popover';
import { ShareSocial } from 'react-share-social';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async () => {
        const data = {
            textQuery: trip?.userPreferences?.place?.label,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
            setPhotoUrl(photo_url);
        });
    };

    useEffect(() => {
        trip && GetPhoto();
    }, [trip]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <img
                className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover rounded-xl"
                src={photoUrl ? photoUrl : '/placeholder.png'}
                alt="trip"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                <div className="my-4 flex flex-col gap-2">
                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
                        {trip?.userPreferences?.place?.label}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-base">
                            📅 {trip?.userPreferences?.numDays} days
                        </h2>
                        <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-base">
                            💵 {trip?.userPreferences?.budget} trip
                        </h2>
                        <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-base">
                            👥 {trip?.userPreferences?.people}
                        </h2>
                    </div>
                </div>
                <Popover>
                    <PopoverTrigger>
                        <Button>
                            <IoIosSend className="text-xl sm:text-2xl" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 sm:w-80 lg:w-96">
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                            <img src='/logo.png' alt='logo' className="h-8 w-20 sm:h-10 sm:w-24" />
                            <h1 className="font-bold text-sm sm:text-base lg:text-lg">
                                Wander <span className="text-[#7F57F1]">Together</span>
                            </h1>
                        </div>
                        <ShareSocial
                            url={window.location.href}
                            socialTypes={['whatsapp', 'facebook', 'twitter']}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default InfoSection;
