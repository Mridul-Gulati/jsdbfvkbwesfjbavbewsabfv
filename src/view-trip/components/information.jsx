import React, { useEffect, useState } from 'react'
import { Button } from '../../components/UI/Button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '../../service/globalAPI'
import { PHOTO_REF_URL } from '../../service/globalAPI';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/UI/popover"
import { ShareSocial } from 'react-share-social'

function InfoSection({ trip }) {
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
        <div>
            <img className='h-[340px] w-full object-cover rounded-xl' src={photoUrl ? photoUrl : '/placeholder.png'} alt='trip' />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userPreferences?.place?.label}
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                            📅 {trip?.userPreferences?.numDays} days
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                            💵 {trip?.userPreferences?.budget} trip
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>
                            👥 {trip?.userPreferences?.people}
                        </h2>
                    </div>
                </div>
                <Popover>
                    <PopoverTrigger>
                        <Button>
                            <IoIosSend />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex gap-2 items-center'>
                            <img src='/logo.png' alt='logo' className='h-10 w-15' />
                            <h1 className='font-bold'>Wander <span className='text-[#7F57F1]'>Together</span></h1>
                        </div>
                        <ShareSocial
                            url={window.location.href}
                            socialTypes={['whatsapp', 'facebook', 'twitter']}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default InfoSection
