import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";

import { useTransactions } from "../../services/hooks/useTransactions";
import { animationGridItem, MotionFlex } from "../../styles/animations";

import { categoryIcon } from "../../utils/categoryIcon";

export function Transactions() {
  const { data } = useTransactions();

  return (
    <Box w="100%">
      <Flex gap="4" direction="column" w="100%" mx="auto" align="center">
        {data?.transactions.map((transaction, index) => (
          <MotionFlex
            key={transaction.id}
            justify="space-between"
            w="100%"
            align="center"
            _hover={{ cursor: "pointer" }}
            variants={animationGridItem}
            initial="hidden"
            animate="visible"
            custom={index - 0.5}
          >
            <Flex align="center">
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

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={transaction.type === "income" ? "#50DA7E" : "#E3170A"}
            >
              {transaction.amount}
            </Text>
          </MotionFlex>
        ))}
      </Flex>
    </Box>
  );
}
