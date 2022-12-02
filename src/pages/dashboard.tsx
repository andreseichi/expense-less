import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useCallback, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RiAddFill,
  RiMoneyDollarCircleLine,
  RiShoppingCartLine,
  RiWallet3Line,
} from "react-icons/ri";
import * as yup from "yup";

import MiniStatistics from "../components/Dashboard/MiniStatistics";
import { TransactionsOverview } from "../components/Dashboard/TransactionsOverview";
import { Input } from "../components/Form/Input";
import { Switch } from "../components/Form/Switch";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Transactions } from "../components/Transactions";
import { useCategories } from "../services/hooks/useCategories";
import {
  createTransaction,
  useTransactions,
} from "../services/hooks/useTransactions";
import { queryClient } from "../services/queryClient";
import { MotionGrid } from "../styles/animations";
import { currency } from "../utils/mask";

type newTransactionFormData = {
  name: string;
  description: string;
  amount: string;
  type: string;
  categoryId: number;
};

const newTransactionFormSchema = yup.object().shape({
  type: yup.string().required("Type required"),
  amount: yup.string().typeError("Value is required"),
  description: yup.string().required("Description required"),
  name: yup.string().required("Name of transaction required"),
  categoryId: yup.number().required("Category required"),
});

export default function Dashboard() {
  const { data } = useTransactions();
  const { data: categories } = useCategories();
  const toast = useToast();

  const initialRefModal = useRef(null);
  const finalRefModal = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, reset } =
    useForm<newTransactionFormData>({
      resolver: yupResolver(newTransactionFormSchema),
    });
  const errors = formState.errors;

  const handleCloseModal = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    currency(e);
  }, []);

  const createTransactionMutation = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });

  const handleNewTransaction: SubmitHandler<newTransactionFormData> = async (
    values
  ) => {
    let amountNumber = Number(values.amount.replace(",", "").replace(".", ""));
    amountNumber = amountNumber < 100 ? amountNumber * 100 : amountNumber;
    let type = values.type === "true" ? "expense" : "income";

    const data = {
      ...values,
      amount: amountNumber,
      type,
    };

    const response = await createTransactionMutation.mutateAsync(data);

    if (response?.status === 201) {
      toast({
        title: `Transaction ${data.name} created`,
        description: "Your transaction has been created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
    } else {
      toast({
        title: `Error ${response?.status}`,
        description: `${response?.data.map((error: string) => error)}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
        <Sidebar />

        <Flex flexDirection="column" w="100%">
          <Breadcrumb fontWeight="medium" fontSize="md" w="100%">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex justify="space-between" align="center" mt="2">
            <Text fontSize="4xl" fontWeight="bold">
              Transactions
            </Text>

            <Icon
              as={RiAddFill}
              fontSize="4xl"
              ml="2"
              bg="pink.500"
              rounded="full"
              onClick={onOpen}
              _hover={{
                cursor: "pointer",
                bg: "pink.600",
              }}
            />
          </Flex>

          <MotionGrid
            w="100%"
            columns={{ sm: 1, md: 2, xl: 3 }}
            spacing="24px"
            my="5"
            initial="hidden"
            animate="visible"
          >
            <MiniStatistics
              label="Total Expense"
              amount={data?.totalExpenses}
              icon={<RiShoppingCartLine />}
              animationDelay={1}
            />
            <MiniStatistics
              label="Total Income"
              amount={data?.totalIncomes}
              icon={<RiMoneyDollarCircleLine />}
              animationDelay={2}
            />
            <MiniStatistics
              label="Net"
              amount={data?.net}
              icon={<RiWallet3Line />}
              animationDelay={3}
            />
          </MotionGrid>
          <SimpleGrid w="100%" columns={{ sm: 1, md: 4 }} spacing="24px" my="5">
            <GridItem colSpan={3}>
              <Transactions />
            </GridItem>
            <GridItem colSpan={1}>
              <TransactionsOverview title="Monthly Overview" key={2} />
            </GridItem>
          </SimpleGrid>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        blockScrollOnMount
        initialFocusRef={initialRefModal}
        finalFocusRef={finalRefModal}
      >
        <ModalOverlay />
        <ModalContent bg="green.500">
          <ModalHeader>Register new transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex
              as="form"
              w="100%"
              flexDir="column"
              onSubmit={handleSubmit(handleNewTransaction)}
            >
              <Stack spacing="4">
                <Input
                  {...register("name")}
                  name="name"
                  label="Name"
                  type="text"
                  error={errors.name}
                />
                <Input
                  {...register("description")}
                  name="description"
                  label="Description"
                  type="text"
                  error={errors.description}
                />
                <Input
                  {...register("amount")}
                  name="amount"
                  label="Value $"
                  type="string"
                  error={errors.amount}
                  onKeyUp={handleKeyUp}
                />

                <Switch
                  {...register("type")}
                  name="type"
                  label="Expense"
                  error={errors.type}
                />

                <Select
                  {...register("categoryId")}
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  size="lg"
                >
                  {categories?.categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </Stack>

              <Button
                type="submit"
                mt="6"
                colorScheme="pink"
                size="lg"
                isLoading={formState.isSubmitting}
              >
                Create
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
