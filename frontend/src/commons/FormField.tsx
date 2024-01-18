import { ReactNode } from 'react';

type FormFieldProps = {
  label?: string;
  error?: string | boolean;
  children: ReactNode;
  className?: string;
}
export const FormField = ({
  error,
  children,
  label,
  className,
}:FormFieldProps) => {
  return (
    <fieldset>
      <label className={className}>{label}</label>
      {children}
      {error && <small>{error}</small>}
    </fieldset>
  );
};
