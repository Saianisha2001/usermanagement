/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

interface InputProps {
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  defaultValue,
}) => {
  return (
    <input
      className='shadow appearance-auto border border-black rounded w-full py-2 px-3 bg-white text-black placeholder-black leading-tight focus:outline-none focus:shadow-outline'
      type='text'
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
