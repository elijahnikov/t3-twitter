import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

const button = cva(
  [
    "inline-flex items-center rounded-lg font-medium",
    "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
    "shadow-sm",
    "transition-colors duration-75",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-primary text-white border border-primary-500",
          "hover:bg-primary-600 hover:text-white active:bg-primary-700",
        ],
        secondary: [
          "bg-primary-100 text-primary border border-primary-100",
          "hover:bg-primary-200 active:bg-primary-300",
        ],
        outline: [
          "bg-none text-primary border border-primary",
          "hover:bg-primary-100 active:bg-primary-200",
        ],
        transparent: [
          "bg-none shadow-none",
          "hover:bg-primary-100",
          "active:bg-primary-200",
        ],
      },
      size: {
        base: "text-sm md:text-base px-3 py-1.5",
        sm: "text-xs md:text-sm px-2 py-1",
        large: "text-md md:text-lg px-7 py-3",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "text-gray-400",
      },
    },
    compoundVariants: [
      {
        disabled: true,
        intent: "primary",
        className: "bg-gray-200 border-none",
      },
      {
        disabled: true,
        intent: "secondary",
        className: "bg-gray-200 border-none",
      },
      {
        disabled: true,
        intent: "secondary",
        className: "bg-gray-200 border-none",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "base",
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {
  children: React.ReactNode;
  loading: boolean;
}

const Button = ({
  children,
  intent,
  size,
  fullWidth,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <button className={button({ intent, size, fullWidth, disabled })}>
      <span
        className={classNames(
          "leading-[1.25rem]",
          loading && "text-transparent"
        )}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute left-1/2 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current"
              d="M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
            ></path>
          </svg>
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  );
};

export default Button;
