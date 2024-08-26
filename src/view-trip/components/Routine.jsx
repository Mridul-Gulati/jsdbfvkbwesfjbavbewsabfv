import React from 'react';
import Place from './Place';

function Routine({ trip }) {
    return (
        <div className='p-4 md:p-6 lg:p-8'>
            <h2 className='font-bold text-xl sm:text-2xl md:text-3xl mt-5'>
                Places to Visit
            </h2>
            <div>
                {trip?.trip?.itinerary && trip?.trip?.itinerary.map((item, index) => (
                    <div key={index} className='p-4 md:p-5 mt-5 border rounded-lg shadow-sm'>
                        {/* Optional Image: Uncomment if needed */}
                        {/* <img src={item?.placeImageUri} className='w-full h-40 object-cover rounded-xl' /> */}
                        <div className='my-2'>
                            <h2 className='font-bold text-lg sm:text-xl'>Day {item?.day}</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5'>
                                {item?.plan?.map((place, index) => (
                                    <div key={index} className='flex flex-col gap-2'>
                                        <h2 className='font-medium text-sm sm:text-base text-[#7F57F1]'>⏰ {place?.time}</h2>
                                        <Place place={place} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Routine;
