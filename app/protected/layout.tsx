import FloatingMenu from '../ui/center/menu';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        {/* <FloatingMenu /> */}
      </div>
      <div>{children}</div>
    </div>
  );
}