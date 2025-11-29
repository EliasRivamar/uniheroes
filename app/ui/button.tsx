import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "bg-red-600 rounded-md w-full mt-10 hover:bg-red-800 transition",
        className,
      )}
    >
      {children}
    </button>
  );
}
