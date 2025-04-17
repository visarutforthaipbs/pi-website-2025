import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { cmsService } from "../services/cmsService";
import ErrorBoundary from "./ErrorBoundary";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await cmsService.getBlogPost(slug);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(
          err.message === "Post not found"
            ? "The requested blog post could not be found."
            : "Failed to fetch the blog post. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="white">
        <Flex justifyContent="center" alignItems="center" minH="400px">
          <Flex direction="column" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
              mb={4}
            />
            <Text>Loading article...</Text>
          </Flex>
        </Flex>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box minH="100vh" bg="white">
        <Flex justifyContent="center" alignItems="center" minH="400px" p={5}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            maxW="500px"
            borderRadius="md"
            p={5}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {error || "The requested blog post could not be found."}
            </AlertDescription>
            <Button
              as={RouterLink}
              to="/blog"
              mt={4}
              leftIcon={<ChevronLeftIcon />}
              colorScheme="blue"
              variant="outline"
            >
              Back to Blog
            </Button>
          </Alert>
        </Flex>
      </Box>
    );
  }

  const { attributes } = post;
  const readingTime = calculateReadingTime(attributes.content);

  return (
    <ErrorBoundary>
      <Box minH="100vh" bg="white">
        {attributes.featuredImage && (
          <Box position="relative" h="500px" bgColor="gray.100" mb="40px">
            <Image
              src={cmsService.getImageUrl(attributes.featuredImage)}
              alt={attributes.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              h="200px"
              bgGradient="linear(to-b, transparent, rgba(0, 0, 0, 0.3))"
            />
          </Box>
        )}
        <Container maxW="800px" px={5}>
          <Box as="header" mb={8}>
            <Breadcrumb fontSize="sm" color="gray.600" mb={4}>
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/blog">
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text>{attributes.title}</Text>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading
              as="h1"
              size="xl"
              fontWeight="800"
              color="gray.800"
              lineHeight="1.3"
              letterSpacing="-0.5px"
            >
              {attributes.title}
            </Heading>
          </Box>
          <Box>
            <Box mb={8} pb={6} borderBottom="1px solid" borderColor="gray.200">
              <Flex alignItems="center" mb={4} fontSize="sm" color="gray.600">
                <Text>{cmsService.formatDate(attributes.publishedAt)}</Text>
                <Text mx={2}>•</Text>
                <Text fontWeight="500" color="blue.600">
                  {readingTime} min read
                </Text>
              </Flex>
              {attributes.excerpt && (
                <Text fontSize="lg" color="gray.700" fontStyle="italic">
                  {attributes.excerpt}
                </Text>
              )}
            </Box>
            <Box fontSize="md" lineHeight="1.8" color="gray.700">
              {attributes.content.split("\n").map((paragraph, index) =>
                paragraph ? (
                  <Text key={index} mb={5}>
                    {paragraph}
                  </Text>
                ) : (
                  <Box key={index} h={4} />
                )
              )}
            </Box>
            <Box mt={16} pt={8} borderTop="1px solid" borderColor="gray.200">
              <Flex justify="center">
                <Button
                  as={RouterLink}
                  to="/blog"
                  leftIcon={<ChevronLeftIcon />}
                  colorScheme="blue"
                  variant="outline"
                  mb={8}
                >
                  Back to Blog
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </ErrorBoundary>
  );
}

export default BlogPost;
