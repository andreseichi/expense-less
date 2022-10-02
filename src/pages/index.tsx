import {
  Button,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../components/Form/Input";
import { api } from "../services/api";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail required").email("Invalid e-mail"),
  password: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Password required"),
});

export default function SignIn() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });
  const errors = formState.errors;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const response = await api.post("/signin", values);

    if (response.status === 200) {
      const { token } = response.data;

      window.localStorage.setItem("@Expenseless:token", token);

      router.push("/dashboard");
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      flexDirection="column"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            {...register("email")}
            type="email"
            name="email"
            label="E-mail"
            error={errors.email}
          />
          <Input
            {...register("password")}
            type="password"
            name="password"
            label="Password"
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Login
        </Button>

        <Text fontSize="sm" mt="4" textAlign="center">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <ChakraLink fontWeight="bold" display="inline-block">
              Register Now
            </ChakraLink>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
