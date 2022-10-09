import { SimpleGrid, SimpleGridProps, Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionGrid = motion<SimpleGridProps>(SimpleGrid);
export const MotionFlex = motion<FlexProps>(Flex);

export const animationGrid = {
  hidden: {
    opacity: 1,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

export const animationGridItem = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (i: number) => {
    const delay = 0.2 + i * 0.1;
    return {
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        opacity: {
          delay,
          duration: 1,
        },
      },
    };
  },
};
