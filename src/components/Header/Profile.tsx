import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>André Tashiro</Text>
          <Text color="gray.300" fontSize="small">
            andre_seichi@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="André Tashiro"
        src="https://github.com/andreseichi.png"
      />
    </Flex>
  );
}
