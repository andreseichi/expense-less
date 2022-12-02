import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { RiCheckLine, RiDeleteBinLine } from "react-icons/ri";

import {
  deleteTransaction,
  useTransactions,
} from "../../services/hooks/useTransactions";
import { queryClient } from "../../services/queryClient";
import { animationGridItem, MotionFlex } from "../../styles/animations";

import { categoryIcon } from "../../utils/categoryIcon";

export function Transactions() {
  const toast = useToast();
  const { onClose } = useDisclosure();

  const { data, isLoading } = useTransactions();

  const deleteTransactionMutation = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });

  async function handleDeleteTransaction(id: number) {
    const response = await deleteTransactionMutation.mutateAsync(id);

    if (response?.status === 204) {
      toast({
        title: `Transaction ${response.data} deleted`,
        description: "Your transaction has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Error ${response?.status}`,
        description: `${response?.data.map((error: string) => error)}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  }

  return (
    <Box w="100%">
      <Flex gap="4" direction="column" w="100%" mx="auto" align="center">
        {isLoading ? (
          <HStack spacing={6} mt={10}>
            <Spinner color="red.500" />
            <Text>Loading Transactions...</Text>
          </HStack>
        ) : (
          data?.transactions.map((transaction, index) => (
            <MotionFlex
              key={transaction.id}
              justify="space-between"
              w="100%"
              align="center"
              variants={animationGridItem}
              initial="hidden"
              animate="visible"
              custom={index - 0.5}
            >
              <Flex align="center" _hover={{ cursor: "pointer" }}>
                <Icon
                  as={categoryIcon[transaction.Category.name]}
                  fontSize="35"
                />
                <Tooltip label={transaction.description} aria-label="tooltip">
                  <Box ml="8">
                    <Text fontSize="xl" fontWeight="bold">
                      {transaction.name}
                    </Text>
                    <Text fontSize="sm" mt="1">
                      {String(transaction.date)}
                    </Text>
                  </Box>
                </Tooltip>
              </Flex>

              <Flex align="center" justifyContent="end" gap={6}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color={transaction.type === "income" ? "#50DA7E" : "#E3170A"}
                >
                  {transaction.amount}
                </Text>

                <Popover>
                  <PopoverTrigger>
                    <Button
                      aria-label="Delete transaction"
                      bg="pink.500"
                      _hover={{ background: "pink.600" }}
                      _active={{ background: "pink.700" }}
                    >
                      <Icon as={RiDeleteBinLine} fontSize="20" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    bg="teal.300"
                    color="gray.800"
                    borderColor="teal.800"
                  >
                    <PopoverArrow bg="teal.500" />
                    <PopoverCloseButton />
                    <PopoverHeader borderColor="teal.800">
                      Delete transaction {transaction.name}?
                    </PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete the {transaction.name}{" "}
                      transaction?
                    </PopoverBody>
                    <PopoverFooter
                      borderColor="teal.800"
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        disabled={deleteTransactionMutation.isLoading}
                        leftIcon={
                          deleteTransactionMutation.isLoading ? (
                            <Spinner color="white" size="sm" />
                          ) : (
                            <RiCheckLine />
                          )
                        }
                        size="sm"
                        bg="pink.500"
                        _hover={{ background: "pink.600" }}
                        _active={{ background: "pink.700" }}
                        color="white"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Flex>
            </MotionFlex>
          ))
        )}
      </Flex>
    </Box>
  );
}
