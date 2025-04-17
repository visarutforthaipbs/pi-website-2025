import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { cmsService } from "../services/cmsService";
import ErrorBoundary from "./ErrorBoundary";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await cmsService.getBlogPosts(currentPage);
        setPosts(response.data);
        setTotalPages(response.meta.pagination.pageCount);
        setError(null);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (loading) {
    return (
      <Box minH="100vh" bg="white">
        <Flex justifyContent="center" alignItems="center" h="400px">
          <Flex direction="column" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="xl"
              mb={4}
            />
            <Text>Loading posts...</Text>
          </Flex>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="white">
        <Flex justifyContent="center" alignItems="center" h="400px">
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
            <AlertDescription maxWidth="sm">{error}</AlertDescription>
          </Alert>
        </Flex>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Box minH="100vh" bg="white">
        <Box
          py={20}
          textAlign="center"
          bg="brand.50"
          bgGradient="linear(135deg, brand.50, brand.100)"
          mb={15}
          position="relative"
        >
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            color="brand.900"
            mb={3}
          >
            Blog
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="600px" mx="auto">
            ข่าวสารและบทความจากเรา
          </Text>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="4px"
            bgGradient="linear(90deg, transparent, brand.500, transparent)"
            opacity={0.5}
          />
        </Box>

        <Container maxW="container.xl" px={5} pb={16}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {posts.map((post) => (
              <LinkBox as="article" key={post.id}>
                <Box
                  h="100%"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                  bg="white"
                >
                  {post.attributes.featuredImage && (
                    <Box
                      position="relative"
                      paddingTop="56.25%"
                      bg="gray.100"
                      overflow="hidden"
                    >
                      <Image
                        src={cmsService.getImageUrl(
                          post.attributes.featuredImage
                        )}
                        alt={post.attributes.title}
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s ease"
                      />
                    </Box>
                  )}
                  <Box p={6}>
                    <Flex direction="column" spacing={3}>
                      <Text fontSize="sm" color="gray.500" mb={2}>
                        {cmsService.formatDate(post.attributes.publishedAt)}
                      </Text>
                      <Heading
                        as="h2"
                        size="md"
                        fontWeight="700"
                        color="gray.800"
                        lineHeight="1.3"
                        transition="color 0.2s"
                        _hover={{ color: "brand.500" }}
                        mb={3}
                      >
                        <LinkOverlay
                          as={RouterLink}
                          to={`/blog/${post.attributes.slug}`}
                        >
                          {post.attributes.title}
                        </LinkOverlay>
                      </Heading>
                      <Text color="gray.600" fontSize="md" mb={4}>
                        {post.attributes.excerpt ||
                          (post.attributes.content
                            ? post.attributes.content.substring(0, 150) + "..."
                            : "No excerpt available")}
                      </Text>
                    </Flex>
                    <Button
                      as={RouterLink}
                      to={`/blog/${post.attributes.slug}`}
                      variant="link"
                      colorScheme="yellow"
                      fontWeight="600"
                      color="brand.500"
                      rightIcon={<ChevronRightIcon />}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>

          {totalPages > 1 && (
            <Flex justify="center" align="center" mt={16} gap={5}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                colorScheme="yellow"
                leftIcon={<ChevronLeftIcon />}
              >
                Previous
              </Button>
              <Text color="gray.600" fontWeight="500">
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                isDisabled={currentPage === totalPages}
                colorScheme="yellow"
                rightIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </Flex>
          )}
        </Container>
      </Box>
    </ErrorBoundary>
  );
}

export default Blog;
