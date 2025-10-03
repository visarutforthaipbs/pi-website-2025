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
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { blogService } from "../../services/blogService";

/**
 * BlogCard Component
 * Displays a blog article with thumbnail and link
 */
const BlogCard = React.memo(({ article }) => {
  return (
    <Card
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      shadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
      }}
      transition="all 0.3s ease"
      h="full"
      role="article"
      aria-label={`บทความ: ${article.title}`}
    >
      {/* Always show image container, with fallback */}
      <Box position="relative" height="200px" overflow="hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          objectFit="cover"
          w="100%"
          h="100%"
          loading="lazy"
          fallback={
            <Box
              w="100%"
              h="100%"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaExternalLinkAlt} color="gray.400" boxSize={8} />
            </Box>
          }
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-b, transparent, blackAlpha.600)"
        />
      </Box>

      <CardBody p={6}>
        <VStack align="start" spacing={4} h="full">
          <VStack align="start" spacing={2} flex={1}>
            <Heading
              size="md"
              color="gray.800"
              fontWeight="600"
              lineHeight="1.3"
              noOfLines={2}
            >
              {article.title}
            </Heading>
            <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={3}>
              {article.description || article.excerpt}
            </Text>
          </VStack>

          <HStack justify="space-between" w="full" align="center">
            <HStack spacing={2} align="center">
              <Icon as={FaCalendarAlt} color="gray.400" boxSize={3} />
              <Text fontSize="xs" color="gray.500">
                {article.publishedAt}
              </Text>
            </HStack>
            <Button
              as={Link}
              href={blogService.getArticleUrl(article.slug)}
              isExternal
              size="sm"
              variant="ghost"
              rightIcon={<ExternalLinkIcon />}
              color="primary.500"
              fontWeight="600"
              _hover={{
                color: "primary.700",
                bg: "primary.50",
                textDecoration: "none",
              }}
            >
              อ่านเพิ่มเติม
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
});

BlogCard.displayName = "BlogCard";

BlogCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    excerpt: PropTypes.string,
    thumbnail: PropTypes.string,
    publishedAt: PropTypes.string,
  }).isRequired,
};

export default BlogCard;
