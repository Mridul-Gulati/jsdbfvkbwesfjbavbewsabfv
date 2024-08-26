import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/information';
import { useParams } from 'react-router-dom';
import Hotels from '../components/Hotels';
import Routine from '../components/Routine';
import Footer from '../components/Footer';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripId && getTrip();
    }, [tripId]);

    const getTrip = async () => {
        const docRef = doc(db, 'trips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            toast('Trip not found');
        }
    };

    return (
        <div className='p-5 sm:p-10 md:px-16 lg:px-28 xl:px-36'>
            {trip && (
                <>
                    <InfoSection trip={trip} />

                    <Hotels trip={trip} />

                    <Routine trip={trip} />

                    <Footer trip={trip} />
                </>
            )}
        </div>
    );
}

export default ViewTrip;
