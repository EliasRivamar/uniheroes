'use server';

import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import '@/app/ui/global.css';
import Background from '../ui/background/init';

export default async function RegisterPage() {
  return (
    <Background>
      <div className="flex justify-center md:flex-row font-ne pt-8 md:pt-0">
        <div className="bg-[rgba(0,0,0,0.7)] backdrop-blur-[3px] px-10 md:px-16 pt-16 pb-7 self-center mt-8 rounded-[22px] md:rounded-[2vw] w-[300px] md:w-[630px] md:h-[500px] lg:h-[450px] lg:w-[450px]">
        <h2 className="text-white text-3xl mb-6 font-bold text-center md:mb-8 md:text-4xl">
            Create Account
        </h2>
        <Suspense>
          <RegisterForm/>
        </Suspense>
        </div>
      </div>
      <p className="text-white mt-5 font-normal text-center">
        ------Already have an account?------
      </p>
      <div className="flex justify-center">
        <Link 
        href="/login"
        className="bg-[rgba(0,0,0,0.7)] backdrop-blur-[3px] py-3 px-6 font-bold text-white rounded-xl self-center mt-5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:scale-105 hover:bg-[rgba(42,35,35,0.7)] hover:shadow-black hover: shadow-lg active:scale-95"
        >
          Sign In
        </Link>
      </div>
    </Background>
  );
}