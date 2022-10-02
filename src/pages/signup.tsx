import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../components/Form/Input";
import { api } from "../services/api";

type SignUpFormData = {
  name: string;
  email: string;
  pictureUrl?: string;
  password: string;
  confirmPassword: string;
};

const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().required("E-mail required").email("Invalid e-mail"),
  pictureUrl: yup.string().url("Invalid URL"),
  password: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .label("confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUp() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  });
  const errors = formState.errors;

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    const response = await api.post("/signup", values);

    if (response.status === 201) {
      console.log("User created!");

      router.push("/");
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
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Stack spacing="4">
          <Input
            {...register("name")}
            type="text"
            name="name"
            label="Name"
            error={errors.name}
            required
          />
          <Input
            {...register("email")}
            type="email"
            name="email"
            label="E-mail"
            error={errors.email}
            required
          />
          <Input
            {...register("pictureUrl")}
            type="string"
            name="pictureUrl"
            label="Picture URL"
            error={errors.pictureUrl}
          />
          <Input
            {...register("password")}
            type="password"
            name="password"
            label="Password"
            error={errors.password}
            required
          />
          <Input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            label="Repeat password"
            error={errors.confirmPassword}
            required
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Register
        </Button>

        <Text fontSize="sm" mt="4" textAlign="center">
          Already have an account?{" "}
          <Link fontWeight="bold" display="inline-block">
            Sign in
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
