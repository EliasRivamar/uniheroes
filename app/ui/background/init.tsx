import Image from 'next/image';
import bginit from '@/public/bg-init.png';

interface BackgroundProps {
    children?:React.ReactNode;
}

export default function Background({children}: BackgroundProps) {
    return (
        <div className='relative w-full h-screen overflow-x-hidden bg-black'>
            <Image
            alt="Init Background"
            src={bginit}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{
                objectFit: 'cover',
                }}
            className='z-0'
            priority={true}
            />
            <div className='relative z-10'>
                {children}
            </div>
        </div>
    );
}