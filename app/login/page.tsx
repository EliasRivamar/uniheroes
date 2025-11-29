import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import '@/app/ui/global.css';
import Background from '../ui/background/init';

export default function LoginPage() {
  return (
    <Background>
      <div className="flex justify-center font-ne pt-4">
        <div className="bg-[rgba(0,0,0,0.7)] backdrop-blur-[3px] px-10 md:px-16 pt-16 pb-7 self-center mt-8 rounded-[22px] md:rounded-[2vw] w-[300px] md:w-[630px] md:h-[500px] lg:h-[450px] lg:w-[450px]">
        <h2 className="text-white text-5xl mb-8 font-bold text-center">
            Sign In
        </h2>
        <Suspense>
          <LoginForm />
        </Suspense>
        </div>
      </div>
      <p className="text-white mt-5 font-normal text-center">
        ------New to Hero World?------
      </p>
      <div className="flex justify-center">
        <Link href='/register 'className="bg-[rgba(0,0,0,0.7)] font-bold backdrop-blur-[3px] py-3 px-6 text-white rounded-xl self-center mt-5 hover:bg-[rgba(42,35,35,0.7)] transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg active:scale-95">
        Create your Hero account
        </Link>
      </div>
    </Background>
  );
}