import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FaThumbsUp, FaComment, FaCalendarAlt } from "react-icons/fa";
import { getStatusColor, getCategoryIcon } from "../../utils/cardHelpers";

/**
 * ProjectCard Component
 * Displays a project with its details, votes, and comments
 */
const ProjectCard = React.memo(({ project, votes, comments }) => {
  return (
    <Card
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
        bg: "gray.50",
      }}
      transition="all 0.3s ease"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.100"
      h="full"
      role="article"
      aria-label={`โครงการ: ${project.title || "Untitled Project"}`}
    >
      {/* Project Image/Thumbnail */}
      <Box position="relative" h="200px" bg="gradient.hero" overflow="hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            w="full"
            h="full"
            objectFit="cover"
            loading="lazy"
            fallback={
              <Flex
                w="full"
                h="full"
                align="center"
                justify="center"
                bg="blackAlpha.600"
                color="white"
              >
                <VStack spacing={2}>
                  <Text fontSize="4xl" role="img" aria-label={project.category}>
                    {getCategoryIcon(project.category)}
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    textAlign="center"
                    px={4}
                  >
                    {project.category || "General Project"}
                  </Text>
                </VStack>
              </Flex>
            }
          />
        ) : (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            align="center"
            justify="center"
            bg="blackAlpha.600"
            color="white"
          >
            <VStack spacing={2}>
              <Text fontSize="4xl" role="img" aria-label={project.category}>
                {getCategoryIcon(project.category)}
              </Text>
              <Text fontSize="sm" fontWeight="600" textAlign="center" px={4}>
                {project.category || "General Project"}
              </Text>
            </VStack>
          </Flex>
        )}

        {/* Status Badge */}
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={getStatusColor(project.status)}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight="700"
        >
          {project.status || "Active"}
        </Badge>
      </Box>

      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          {/* Project Title */}
          <Heading
            size="md"
            color="gray.800"
            lineHeight="1.3"
            noOfLines={2}
            fontWeight="700"
          >
            {project.title || "Untitled Project"}
          </Heading>

          {/* Project Description */}
          <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={3}>
            {project.description || "No description available."}
          </Text>

          {/* Project Stats */}
          <HStack justify="space-between" w="full">
            <HStack spacing={4}>
              <HStack spacing={1}>
                <Icon as={FaThumbsUp} color="primary.500" boxSize={4} />
                <Text fontSize="sm" color="gray.600" fontWeight="600">
                  {votes || 0}
                </Text>
              </HStack>

              <HStack spacing={1}>
                <Icon as={FaComment} color="accent.500" boxSize={4} />
                <Text fontSize="sm" color="gray.600" fontWeight="600">
                  {comments || 0}
                </Text>
              </HStack>
            </HStack>

            {/* View More Button (Non-interactive) */}
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="500"
              bg="gray.50"
              px={3}
              py={1}
              borderRadius="full"
            >
              ดูรายละเอียด
            </Text>
          </HStack>

          {/* Project Date */}
          {project.createdTime && (
            <HStack spacing={1} opacity={0.8}>
              <Icon as={FaCalendarAlt} color="gray.500" boxSize={3} />
              <Text fontSize="xs" color="gray.500" fontWeight="500">
                {new Date(project.createdTime).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    createdTime: PropTypes.string,
  }).isRequired,
  votes: PropTypes.number,
  comments: PropTypes.number,
};

ProjectCard.defaultProps = {
  votes: 0,
  comments: 0,
};

export default ProjectCard;
