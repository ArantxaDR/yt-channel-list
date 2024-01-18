import { ReactNode } from 'react';

type ButtonProps = {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  className,
  children,
  disabled,
  onClick,
  ...otherProps
}: ButtonProps) => {
  const customClassName = () => {
    const base =
      'font-bold shadow rounded-lg px-4 py-2 hover:bg-primary-dark hover:text-secondary-light';

    if (disabled) {
      return `bg-primary-light text-secondary-dark border`;
    }

    return `bg-secondary text-primary border border-primary-dark ${base}`;
  };

  return (
    <button className={`${customClassName()} ${className} `} {...otherProps} onClick={onClick}  >
      {children}
    </button>
  );
};