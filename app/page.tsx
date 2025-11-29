import Link from 'next/link';
import Background from '@/app/ui/background/init';
import SupverseLogo from './ui/home/supverselogo';
import FAQ from './ui/home/FAQ';

export default function Page() {
  return (
    <Background>
        <header className="flex flex-row justify-between mx-10 items-center lg:mx-28">
          <SupverseLogo />
          <div className="flex mt-3 h-1/2">
            <Link
            href="/login"
            className="bg-red-700 w-20 py-3 text-center antialiased text-white text-sm font-medium rounded-md hover:bg-red-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg active:scale-95">
              <span>Sign In</span>
              </Link>
          </div>
        </header>
        <div className="flex justify-center flex-col">
          <div className="flex flex-col font-ne gap-3 w-full pt-32 md:pt-80 lg:pt-24 text-center antialiased">
            <h1 className="text-7xl tracking-wide lg:px-96 text-white font-bold">All Heroes In One Place</h1>
            <p className=" text-2xl text-white font-normal">Don't have an Account? Join us!</p>
          </div>
          <div className="flex justify-center mt-5 font-ne text-center antialiased">
            <Link
            href="/register"
            className="bg-red-700 py-3 px-4 text-white text-md font-medium rounded-md hover:bg-red-600 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg active:scale-95">
              <span>Register</span>
            </Link>
          </div>
          </div>
          <div className="mt-14 md:mt-[370px] lg:mt-32 text-white overflow-x-hidden 
          flex justify-center w-[200%] rounded-t-[100%] bg-gradient-to-b
            from-[rgba(20,1,1,0.6)] via-black to-black h-[600px] -ml-[50%]
            backdrop-blur-md">
              <FAQ />
          </div>
          <footer className="text-gray-800 text-center">
            <small>Todos los derechos reservados</small>
          </footer>
    </Background>
  );
}