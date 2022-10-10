import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { categoryIcon } from "../../utils/categoryIcon";

interface TimelineRowProps {
  logo: any;
  title: string;
  date: string;
  index: number;
  arrLength: number;
}

export function TimelineRow({
  logo,
  title,
  date,
  index,
  arrLength,
}: TimelineRowProps) {
  const textColor = useColorModeValue("white.300", "gray.300");

  return (
    <Flex
      alignItems="stretch"
      minH="78px"
      justifyContent="start"
      mb="5px"
      position="relative"
    >
      <Flex direction="column" h="100%" position="absolute">
        <Icon
          as={categoryIcon[logo]}
          h={"30px"}
          w={"26px"}
          pe="6px"
          zIndex="1"
          position="relative"
          right={document.documentElement.dir === "rtl" ? "-8px" : ""}
          left={document.documentElement.dir === "rtl" ? "" : "-8px"}
        />
        <Box
          w="2px"
          bg="gray.200"
          h={index === arrLength - 1 ? "15px" : "100%"}
          alignSelf="stretch"
        ></Box>
      </Flex>

      <Flex direction="column" justifyContent="flex-start" h="100%" ml={6}>
        <Text fontSize="sm" color="pink.500" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color={textColor} fontWeight="normal">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}
