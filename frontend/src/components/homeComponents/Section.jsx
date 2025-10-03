import React from "react";
import PropTypes from "prop-types";
import { Box, Container, VStack, Heading, Text, Badge } from "@chakra-ui/react";
import FloatingShapes from "../FloatingShapes";

/**
 * Section Component
 * Reusable section wrapper with consistent styling
 */
const Section = ({
  badge,
  title,
  description,
  children,
  bgColor = "white",
  action,
}) => {
  return (
    <FloatingShapes variant="section">
      <Box bg={bgColor} py={{ base: 16, md: 24 }}>
        <Container maxW="7xl">
          <VStack spacing={{ base: 12, md: 16 }}>
            <VStack spacing={6} textAlign="center" maxW="4xl">
              {badge && (
                <Badge
                  bg="primary.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {badge}
                </Badge>
              )}
              {title && (
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="300"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text
                  color="gray.600"
                  fontSize="xl"
                  maxW="3xl"
                  lineHeight="1.8"
                  fontWeight="400"
                >
                  {description}
                </Text>
              )}
            </VStack>
            {children}
            {action}
          </VStack>
        </Container>
      </Box>
    </FloatingShapes>
  );
};

Section.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
  action: PropTypes.node,
};

Section.defaultProps = {
  bgColor: "white",
};

export default Section;
