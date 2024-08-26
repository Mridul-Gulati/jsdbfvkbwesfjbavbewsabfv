import React from 'react'
import Place from './Place'

function Routine({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>
                Places to Visit
            </h2>
            <div>
                {trip?.trip?.itinerary && trip?.trip?.itinerary.map((item, index) => (
                    <div key={index} className='p-5 mt-5'>
                        {/* <img src={item?.placeImageUri} className='w-full h-40 object-cover rounded-xl' /> */}
                        <div className='my-2'>
                            <h2 className='font-bold text-lg '>Day {item?.day}</h2>
                            <div className='grid md:grid-cols-2 gap-5'>
                                {item?.plan?.map((place, index) => (
                                    <div key={index} className='items-center my-3'>
                                        <h2 className='font-medium text-sm text-[#7F57F1]'>⏰ {place?.time}</h2>
                                        <Place place={place} />
                                    </div>
                                ))
                                }
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Routine
