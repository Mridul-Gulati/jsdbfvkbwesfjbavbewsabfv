import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetList, SelectTravelList } from '../constants/options';
import { Button } from '../components/UI/Button';
import { toast } from 'sonner';
import { chatSession } from '../service/Model';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/UI/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/UI/input';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [data, setData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp?.access_token),
        onError: (error) => console.log('Login error:', error),
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (data?.numDays > 7 || data?.numDays < 1) {
            toast('Please enter a valid number of days');
            return;
        }
        if (!data?.place || !data?.numDays || !data?.budget || !data?.people) {
            toast('Please fill all the fields');
            return;
        }
        setLoading(true);
        const Final_Prompt = AI_PROMPT
            .replace('{place}', data?.place?.label)
            .replace('{numDays}', data?.numDays)
            .replace('{people}', data?.people)
            .replace('{budget}', data?.budget)
            .replace('{numDays}', data?.numDays);

        try {
            const result = await chatSession.sendMessage(Final_Prompt);
            setLoading(false);
            console.log(JSON.parse(result?.response?.text()));
            saveTrip(result?.response?.text());
        } catch (error) {
            console.log('Error generating trip:', error);
            setLoading(false);
        }
    };

    const saveTrip = async (tripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        let parsedTripData;
        try {
            parsedTripData = JSON.parse(tripData);
        } catch (error) {
            console.error('Error parsing trip data:', error);
            setLoading(false);
            toast('Error processing trip data. Please try again.');
            return;
        }

        try {
            await setDoc(doc(db, "trips", docId), {
                userPreferences: data,
                trip: parsedTripData,
                userEmail: user?.email,
                id: docId
            });
            setLoading(false);
            navigate(`/view-trip/${docId}`);
        } catch (error) {
            console.error('Error saving trip to Firestore:', error);
            setLoading(false);
            toast('Error saving trip. Please try again.');
        }
    };

    const getUserProfile = async (tokenInfo) => {
        try {
            const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo}`,
                    Accept: 'Application/json'
                }
            });
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            onGenerateTrip();
        } catch (error) {
            console.log('Error in API call:', error);
            setOpenDialog(false);
        }
    };

    return (
        <div className='flex justify-center mt-10'>
            <div className='bg-white px-5 py-10 sm:px-10 md:px-20 lg:px-32 xl:px-40 shadow-lg rounded-lg max-w-4xl w-full'>
                <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl'>
                    Create Your <span className='text-[#7F57F1]'>Dream Trip</span> 🏝️
                </h2>
                <p className='mt-3 text-gray-500 text-base md:text-lg lg:text-xl'>
                    Welcome to your journey's starting point! Here, you can create a personalized travel itinerary that perfectly aligns with your interests, budget, and schedule.
                </p>
                <div className='mt-12 md:mt-16 flex flex-col gap-8 md:gap-10'>
                    <div>
                        <h2 className='text-lg md:text-xl lg:text-2xl my-3 font-medium'>What is your dream destination?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => { setPlace(v); handleInputChange('place', v) }
                            }}
                        />
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl lg:text-2xl my-3 font-medium'>How long will your trip be?</h2>
                        <Input placeholder={'Enter number of days'} type="number" onChange={(e) => handleInputChange('numDays', e.target.value)} />
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl lg:text-2xl my-3 font-medium'>What is your budget?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 cursor-pointer'>
                            {SelectBudgetList.map((item, index) => (
                                <div key={index} onClick={() => handleInputChange('budget', item.title)} className={`p-4 border rounded-lg hover:shadow-lg ${data?.budget == item.title && 'border-[#7F57F1] shadow-lg'}`}>
                                    <h2 className='text-3xl md:text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl lg:text-2xl my-3 font-medium'>Who all will accompany you?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 cursor-pointer'>
                            {SelectTravelList.map((item, index) => (
                                <div key={index} onClick={() => handleInputChange('people', item.people)} className={`p-4 border rounded-lg hover:shadow-lg ${data?.people == item.people && 'border-[#7F57F1] shadow-lg'}`}>
                                    <h2 className='text-3xl md:text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='my-5 flex justify-center'>
                    <Button disabled={loading} onClick={onGenerateTrip} className='mt-10'>
                        {loading ? <AiOutlineLoading3Quarters className='animate-spin w-6 h-6' /> : 'Generate Itinerary'}
                    </Button>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <div className='flex gap-2 items-center'>
                                    <img src='/logo.png' alt='logo' className='h-10 w-15' />
                                    <h1 className='font-bold text-black'>Wander <span className='text-[#7F57F1]'>Together</span></h1>
                                </div>
                                <h2 className='font-bold text-lg mt-5 text-black'>Sign in with Google</h2>
                                <p className='mt-2 mb-4 text-[#7F57F1]'>Sign in to Generate your personalised travel itinerary</p>

                                <Button disabled={loading} onClick={() => {
                                    login();
                                    setOpenDialog(false);
                                }} className='w-full mt-5 flex gap-4'>
                                    <FcGoogle className='w-7 h-7' />Sign in with Google
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateTrip;
