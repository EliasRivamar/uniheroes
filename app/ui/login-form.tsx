'use client';
import { Suspense } from 'react';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Button } from './button';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/protected';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <form action={formAction}>
      <div>
        <div className="flex flex-col gap-4 font-ne antialiased">
          <div className='relative'>
              <input
                className="block
                rounded-md
                px-6 pt-6 pb-1
                w-full
                text-md text-white
              bg-[rgba(61,61,63,0.85)]
                appearance-none
                outline-none ring-0 border-transparent border-none shadow-none
                focus:outline-none focus:ring-0 focus:border-transparent focus:border-none focus:shadow-none
                transition-transform duration-300 transform focus:scale-105
                peer"
                id="email"
                type="email"
                name="email"
                placeholder=""
                required
              />
              <label
              htmlFor="email"
              className="absolute 
              text-md
              text-white
              font-normal
              duration-150 transform -translate-y-3 scale-95 -translate-x-2
              top-4 z-10 origin-[0]
              left-6 peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-3 peer-focus:-translate-x-2"
              >
              Email
              </label>
          </div>
          <div className='relative'>
              <input
              id="password"
              name="password"
              type="password"
              required
              className="block
              rounded-md
              px-6 pt-6 pb-1
              w-full
              text-md text-white
            bg-[rgba(61,61,63,0.85)]
              appearance-none
              outline-none ring-0 border-transparent border-none shadow-none
              focus:outline-none focus:ring-0 focus:border-transparent focus:border-none focus:shadow-none
              transition-transform duration-300 transform focus:scale-105
              peer"
              placeholder=" "
              />
              <label
              htmlFor="password"
              className="absolute 
              text-md
              text-white
              font-normal
              duration-150 transform -translate-y-3 scale-95 -translate-x-2
              top-4 z-10 origin-[0]
              left-6 peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-3 peer-focus:-translate-x-2"
              >
              Password
              </label>
          </div>
        </div>
          <input type="hidden" name='redirectTo' value={callbackUrl}></input>
          <Button className="bg-red-700 font-bold px-6 pt-3 pb-3 text-center text-white text-md rounded-md w-full hover:bg-red-600 transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg active:scale-95">
          Log In 
        </Button>
        <div className="flex mt-8 justify-center">
          <a href="#" className=" text-zinc-400 font-normal text-md">Forgot Password?</a>
        </div>
        <div
          className="flex h-8 items-end space-x-1 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        </div>
    </form>
  );
}
