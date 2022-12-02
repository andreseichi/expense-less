import { Flex, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { RiBarChartFill, RiDashboardLine } from "react-icons/ri";
import { useCategories } from "../../services/hooks/useCategories";
import { NavCategory } from "./NavCategory";

import { categoryIcon } from "../../utils/categoryIcon";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

type Category = {
  id: number;
  name: string;
};

export function SidebarNav() {
  const { data, isLoading } = useCategories();

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/graphics" icon={RiBarChartFill}>
          Graphics
        </NavLink>
      </NavSection>

      <Flex justify="space-between">
        <NavSection title="CATEGORIES">
          {isLoading ? (
            <VStack spacing={6} mt={10}>
              <Spinner color="red.500" />
              <Text textAlign="center">Loading categories...</Text>
            </VStack>
          ) : (
            data?.categories.map((category: Category) => (
              <NavCategory key={category.id} icon={categoryIcon[category.name]}>
                {category.name}
              </NavCategory>
            ))
          )}
        </NavSection>
      </Flex>
    </Stack>
  );
}
