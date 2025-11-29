import Image from 'next/image';
import supverselogo from '@/public/supverse-logo.png';

export default function SupverseLogo() {
    return (
        <>
            <Image
            alt="Supverse Logo"
            src={supverselogo}
            height={8}
            width={130}
            className="hidden md:block pt-5"
            priority={true}
            />
            <Image
            alt="Supverse Logo"
            src={supverselogo}
            height={6}
            width={110}
            className="block md:hidden pt-6"
            priority={true}
            />
            
        </>  
    );
}