import { Box, Center, Divider, Heading, HStack } from "@chakra-ui/react";
import React from "react";

export const Logo = () => {
  return (
    <HStack>
      <Box boxSize={10} borderWidth="thick" borderRadius="full"></Box>
      <Center h={10}>
        <Divider orientation="vertical" />
      </Center>
      <Heading
        size="md"
        fontWeight={900}
        bgGradient={"linear(to-r, green.200, pink.500)"}
        bgClip="text"
      >
        Martian
      </Heading>
    </HStack>
  );
};
