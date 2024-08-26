import React, { useState } from 'react';
import { Button } from '../../components/UI/Button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/UI/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/UI/dialog"
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <img className='h-10 w-10 rounded-full' src='./logo.png' alt='logo' />
                    <h1 className='font-bold text-xl'>Wander <span className='text-[#7F57F1]'>Together</span></h1>
                </div>
            </a>

            <div className='flex md:hidden items-center'>
                {menuOpen ? (
                    <AiOutlineClose onClick={() => setMenuOpen(!menuOpen)} className='cursor-pointer w-8 h-8' />
                ) : (
                    <AiOutlineMenu onClick={() => setMenuOpen(!menuOpen)} className='cursor-pointer w-8 h-8' />
                )}
            </div>

            <div className={`flex-col md:flex-row md:flex ${menuOpen ? 'flex' : 'hidden'} absolute md:relative top-16 left-0 md:top-0 md:left-auto md:space-x-4 bg-white md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-md md:shadow-none z-10`}>
                {user ?
                    <div className='flex flex-col md:flex-row md:items-center gap-2'>
                        <a href='/create-trip'>
                            <Button variant='outline' className='rounded-full w-full md:w-auto'>+ Create Trip</Button>
                        </a>
                        <a href='/my-trips'>
                            <Button variant='outline' className='rounded-full w-full md:w-auto'>My Trips</Button>
                        </a>
                        <div className='hidden md:flex items-center'>
                            <Popover>
                                <PopoverTrigger>
                                    <img src={user?.picture} alt='user' className='h-10 w-10 rounded-full' />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Button variant='outline' className='rounded-full w-full md:w-auto' onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        window.location.reload();
                                    }}>Logout</Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button variant='outline' className='rounded-full w-full md:w-auto' onClick={() => {
                            googleLogout();
                            localStorage.clear();
                            window.location.reload();
                        }}>Logout</Button>
                    </div> :
                    <Button onClick={() => setOpenDialog(true)} className='w-full md:w-auto'>Sign In</Button>
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
