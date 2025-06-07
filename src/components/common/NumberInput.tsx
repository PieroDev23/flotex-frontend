import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

interface NumberInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step = 1, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

// For compatibility with the form
export const NumberInputRoot = ({ children, ...props }: { children: React.ReactNode; min?: number; step?: number; value?: string; onValueChange?: (details: { value: string }) => void }) => {
  return <div {...props}>{children}</div>;
};

export const NumberInputField = forwardRef<HTMLInputElement, NumberInputProps & { register?: any }>(
  ({ register, ...props }, ref) => {
    return <NumberInput ref={ref} {...props} {...register} />;
  }
);

NumberInputField.displayName = "NumberInputField";
