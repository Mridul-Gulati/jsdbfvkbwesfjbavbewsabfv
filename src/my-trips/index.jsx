import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripCard from './components/userTripCard';

function MyTrips() {

    useEffect(() => {
        GetTrips();
    }, []);
    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    const GetTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigation('/');
            return;
        }
        const q = query(collection(db, 'trips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            setUserTrips(prevVal => [...prevVal, doc.data()]);
        });
    }
    return (
        <div className='flex justify-center mt-10'>
            <div className='bg-white sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 py-10 shadow-lg rounded-lg max-w-3xl w-full'>
                <h2 className='font-bold text-3xl'>My Trips</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                    {userTrips.length > 0 ? userTrips.map((trip, index) => (
                        <UserTripCard key={index} trip={trip} />
                    ))
                        : [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyTrips
