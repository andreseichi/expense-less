import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { animationGridItem, MotionFlex } from "../../styles/animations";

interface MiniStatisticsProps {
  label: string;
  amount: string | undefined;
  icon: React.ReactNode;
  animationDelay: number;
}

const MiniStatistics = ({
  label,
  amount = "$0",
  icon,
  animationDelay,
}: MiniStatisticsProps) => {
  return (
    <MotionFlex
      flexDirection="row"
      align="center"
      justify="center"
      w="100%"
      bg="gray.50"
      borderRadius="md"
      p={4}
      variants={animationGridItem}
      custom={animationDelay}
    >
      <Stat me="auto">
        <StatLabel fontSize="sm" color="black" fontWeight="bold" pb=".1rem">
          {label}
        </StatLabel>
        <Flex>
          <StatNumber fontSize="lg" color="pink.500">
            {amount}
          </StatNumber>
          <StatHelpText
            alignSelf="flex-end"
            justifySelf="flex-end"
            m="0px"
            // color={percentage > 0 ? "green.400" : "red.400"}
            fontWeight="bold"
            ps="3px"
            fontSize="md"
          >
            {/* {percentage > 0 ? `+${percentage}%` : `${percentage}%`} */}
          </StatHelpText>
        </Flex>
      </Stat>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"12px"}
        h={"45px"}
        w={"45px"}
        bg="pink.500"
        fontSize={24}
      >
        {icon}
      </Flex>
    </MotionFlex>
  );
};

export default MiniStatistics;
