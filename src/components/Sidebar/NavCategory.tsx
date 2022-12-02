import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";
import { ElementType } from "react";

interface NavCategoryProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href?: string;
}

export function NavCategory({
  icon,
  href,
  children,
  ...rest
}: NavCategoryProps) {
  return (
    <Text>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text as="span" ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Text>
  );
}
