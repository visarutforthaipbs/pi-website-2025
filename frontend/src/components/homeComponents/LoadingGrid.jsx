import React from "react";
import PropTypes from "prop-types";
import {
  SimpleGrid,
  Card,
  CardBody,
  Skeleton,
  VStack,
  HStack,
} from "@chakra-ui/react";

/**
 * LoadingGrid Component
 * Displays skeleton loading cards in a grid
 */
const LoadingGrid = ({ columns = 3, count = 3, height = "200px" }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} spacing={8} w="full">
      {[...Array(count)].map((_, i) => (
        <Card key={i} borderRadius="2xl" overflow="hidden">
          <Skeleton height={height} />
          <CardBody p={6}>
            <VStack align="start" spacing={4}>
              <Skeleton height="24px" width="80%" />
              <VStack align="start" spacing={2} w="full">
                <Skeleton height="16px" width="100%" />
                <Skeleton height="16px" width="90%" />
                <Skeleton height="16px" width="70%" />
              </VStack>
              <HStack justify="space-between" w="full">
                <Skeleton height="20px" width="60px" />
                <Skeleton height="32px" width="80px" borderRadius="full" />
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

LoadingGrid.propTypes = {
  columns: PropTypes.number,
  count: PropTypes.number,
  height: PropTypes.string,
};

LoadingGrid.defaultProps = {
  columns: 3,
  count: 3,
  height: "200px",
};

export default LoadingGrid;
