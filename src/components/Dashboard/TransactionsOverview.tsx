import {
  Box,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useTransactions } from "../../services/hooks/useTransactions";
import { TimelineRow } from "./TimelineRow";

interface TransactionsOverviewProps {
  title: string;
}

export function TransactionsOverview({ title }: TransactionsOverviewProps) {
  const textColor = useColorModeValue("white.300", "gray.300");

  const { data: transactions, isLoading } = useTransactions();
  const transactionAmountColor =
    Number(transactions?.totalTransactionsMonthly) > 0
      ? "green.500"
      : "red.500";

  return (
    <Box maxH="100%" ml={4}>
      <Box p="0px 0px 35px 14px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            <Text fontWeight="bold" as="span" color={transactionAmountColor}>
              {transactions?.totalTransactionsMonthly ?? `$00.00`}
            </Text>{" "}
            this month.
          </Text>
        </Flex>
      </Box>
      <Box ps="20px" pe="0px" mb="31px" position="relative">
        <Flex direction="column">
          {isLoading ? (
            <VStack spacing={6} mt={10}>
              <Spinner color="red.500" />
              <Text textAlign="center">Loading {title}...</Text>
            </VStack>
          ) : (
            transactions?.monthlyTransactions.map((row, index, arr) => (
              <TimelineRow
                key={row.id}
                logo={row.Category.name}
                title={row.name}
                date={row.date}
                index={index}
                arrLength={arr.length}
              />
            ))
          )}
        </Flex>
      </Box>
    </Box>
  );
}
