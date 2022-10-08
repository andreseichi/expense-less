import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  RiAddFill,
  RiMoneyDollarCircleLine,
  RiShoppingCartLine,
  RiWallet3Line,
} from "react-icons/ri";
import MiniStatistics from "../components/Dashboard/MiniStatistics";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Transactions } from "../components/Transactions";
import { useTransactions } from "../services/hooks/useTransactions";

export default function Dashboard() {
  const { data } = useTransactions();

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
            />
          </Flex>

          <SimpleGrid
            w="100%"
            columns={{ sm: 1, md: 2, xl: 3 }}
            spacing="24px"
            my="5"
          >
            <MiniStatistics
              label="Total Expense"
              amount={data?.totalExpenses}
              icon={<RiShoppingCartLine />}
            />
            <MiniStatistics
              label="Total Income"
              amount={data?.totalIncomes}
              icon={<RiMoneyDollarCircleLine />}
            />
            <MiniStatistics
              label="Net"
              amount={data?.net}
              icon={<RiWallet3Line />}
            />
          </SimpleGrid>

          <Transactions />
        </Flex>
      </Flex>
    </Flex>
  );
}
