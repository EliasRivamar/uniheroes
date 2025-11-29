'use client';

import { Button } from './button';
import { createUser, State } from '@/app/lib/actions';
import {useActionState} from 'react';

export default function RegisterForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);
  return (
    <form action={formAction}>
      <div className='font-ne antialiased'>
        <div className="flex flex-col gap-4">
            <div className='relative'>
              <input
                className="block
                rounded-md
                px-6 pt-6 pb-1
                w-full
                font-normal
                text-md text-white
              bg-[rgba(61,61,63,0.85)]
                appearance-none
                focus:outline-none focus:ring-0
                transition-transform duration-300 transform focus:scale-105
                peer"
                id="username"
                type="username"
                name="username"
                placeholder=""
                required
                aria-describedby="username-error"
              />
              <label
            htmlFor="username"
            className="absolute 
            text-md
            text-zinc-400
            font-normal
            duration-150 transform -translate-y-3 scale-95 -translate-x-2
            top-4 z-10 origin-[0]
            left-6 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-3 peer-focus:-translate-x-2"
            >
              Username
            </label>
            <div id="username-error" aria-live="polite" aria-atomic="true">
        {state.errors?.username &&
          state.errors.username.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
          <div className='relative'>
              <input
                className="block
                rounded-md
                px-6 pt-6 pb-1
                w-full
                font-normal text-md text-white
              bg-[rgba(61,61,63,0.85)]
                appearance-none
                outline-none ring-0 border-transparent border-none shadow-none
                focus:outline-none focus:ring-0 focus:border-transparent focus:border-none focus:shadow-none
                transition-transform duration-300 transform focus:scale-105
                peer"
                id="email"
                type="email"
                name="email"
                placeholder=" "
                required
                aria-describedby="email-error"
              />
              <label
            htmlFor="email"
            className="absolute 
            text-md font-normal
            text-zinc-400
            duration-150 transform -translate-y-3 scale-95 -translate-x-2
            top-4 z-10 origin-[0]
            left-6 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-3 peer-focus:-translate-x-2"
            >
              Email
            </label>
            <div id="email-error" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
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
              text-md text-white font-normal
            bg-[rgba(61,61,63,0.85)]
              appearance-none
              outline-none ring-0 border-transparent border-none shadow-none
              focus:outline-none focus:ring-0 focus:border-transparent focus:border-none focus:shadow-none
              transition-transform duration-300 transform focus:scale-105
              peer"
              placeholder=" "
              aria-describedby="password-error"
              />
              <label
            htmlFor="password"
            className="absolute 
            text-md
            text-zinc-400 text-normal
            duration-150 transform -translate-y-3 scale-95 -translate-x-2
            top-4 z-10 origin-[0]
            left-6 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0 peer-focus:scale-95 peer-focus:-translate-y-3 peer-focus:-translate-x-2"
            >
              Password
            </label>
            <div id="password-error" aria-live="polite" aria-atomic="true">
        {state.errors?.password &&
          state.errors.password.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
          </div>
          </div>
          <Button type="submit"
          className="bg-red-700 px-6 pt-3 pb-3 font-bold text-center text-white text-md rounded-md w-full mt-10 hover:bg-red-600 transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-black hover:shadow-lg active:scale-95">
          Create Account
        </Button>
        </div>
    </form>
  );
}
