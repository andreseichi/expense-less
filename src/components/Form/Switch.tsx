import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  SwitchProps as ChakraSwitchProps,
  Switch as ChakraSwitch,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SwitchProps extends ChakraSwitchProps {
  name: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
}

const SwitchBase: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { name, label, error = null, required = false, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSwitch
        name={name}
        id={name}
        focusBorderColor="pink.500"
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Switch = forwardRef(SwitchBase);
