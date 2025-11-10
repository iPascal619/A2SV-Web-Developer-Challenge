import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorId, className = '', ...props }, ref) => {
    return (
      <div className="food-input-group flex flex-col gap-2 w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="food-label text-[#424242] text-base font-normal"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`food-input bg-[#F5F5F5] border ${
            error ? 'border-[#FF3B30]' : 'border-transparent'
          } rounded-lg px-4 py-4 text-[#424242] text-lg placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#F17228] transition-colors ${className}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && errorId && (
          <span 
            id={errorId}
            className="food-error text-[#FF3B30] text-sm"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
