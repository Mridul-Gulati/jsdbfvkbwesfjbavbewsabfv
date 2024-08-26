import React, { useState } from 'react';
import { Button } from '../../components/UI/Button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp?.access_token),
        onError: (error) => {
            console.log('Login error:', error);
            setOpenDialog(false);
        },
    });

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
            window.location.reload();
        } catch (error) {
            console.log('Error in API call:', error);
            setOpenDialog(false);
        }
    }

    return (
        <div className='p-3 shadow-sm flex justify-between items-center'>
            <a href='/'>
                <div className='flex gap-2 items-center'>
                    <img className='h-[50px] rounded-full w-[65px]' src='./logo.png' alt='logo' />
                    <h1 className='font-bold text-xl'>Wander <span className='text-[#7F57F1]'>Together</span></h1>
                </div>
            </a>

            <div>
                {user ?
                    <div className='flex gap-2 items-center'>
                        <a href='/create-trip'>
                            <Button variant='outline' className='rounded-full'>+ Create Trip</Button>
                        </a>
                        <a href='/my-trips'>
                            <Button variant='outline' className='rounded-full'> My Trips </Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} alt='user' className='h-[40px] w-[40px] rounded-full' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer' onClick={() => {
                                    googleLogout();
                                    localStorage.clear();
                                    window.location.reload();
                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div> :
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                }
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

                            <Button onClick={() => {
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
    );
}

export default Header;