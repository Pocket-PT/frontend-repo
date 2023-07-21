import useId from 'hooks/useId';
import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { cls } from 'utils/cls';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactElement;
  bottomText?: string;
}

const Input = ({ label, children, bottomText, ...props }: InputProps) => {
  const child = Children.only(children);
  const generatedId = useId('input');
  const id = child.props.id ?? generatedId;
  const isError: boolean = child.props.error ?? false;

  return (
    <div className="w-full " {...props}>
      <label
        htmlFor={id}
        className=" inline-block py-[5px] text-[15px] font-medium leading-relaxed text-gray"
      >
        {label}
      </label>
      {cloneElement(child, {
        id,
        ...child.props,
      })}
      {bottomText != null ? (
        <p
          className={cls(
            ' mt-1 inline-block font-normal text-[15px]',
            isError ? 'text-dark' : 'text-gray',
          )}
        >
          {bottomText}
        </p>
      ) : null}
    </div>
  );
};

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
}

Input.TextField = forwardRef(
  (
    { error, ...props }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    console.log(error);
    return (
      <input
        className={cls(
          'w-full py-4 px-4 text-base leading-12 outline outline-1 outline-lightGray border-none rounded-md bg-white transition-all duration-200 focus:outline-mainPurple',
          error ? 'outline-red shadow-red' : 'border-opacity-20',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.TextField.displayName = 'TextField';

export default Input;
