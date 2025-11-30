
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }

import '@/app/ui/global.css';
import FloatingMenu from './ui/center/menu';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>
          <div>
            <FloatingMenu />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}