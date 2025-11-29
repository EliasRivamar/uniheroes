import localFont from 'next/font/local';

export const nfont = localFont({
    src: [
        {
        path: './NetflixSans-Bold.otf',
        weight: '700',
        style: "normal",
        },
        {
        path: './NetflixSans-Light.otf',
        weight: '300',
        style: "normal",
        },
        {
        path: './NetflixSans-Medium.otf',
        weight: '500',
        style: "normal",
        },
        {
        path: './NetflixSans-Regular.otf',
        weight: '400',
        style: "normal",
        },        
    ],
    variable:'--font-n',
})