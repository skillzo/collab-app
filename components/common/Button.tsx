import React from "react";

type ButtonProps = {
  buttonText: string;
  isLoading?: boolean;
} & React.ComponentProps<"button">;

export default function Button({
  buttonText,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button className="primary-button" {...props}>
      {isLoading ? (
        <div className="w-7 h-7 animate-spin rounded-full border-t-2 border-white" />
      ) : (
        <span>{buttonText}</span>
      )}
    </button>
  );
}
