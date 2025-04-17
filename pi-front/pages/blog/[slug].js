import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { cmsService } from "../../services/cmsService";
import ErrorBoundary from "../../components/ErrorBoundary";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
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
      } catch (error) {
        setError("Failed to fetch the blog post. Please try again later.");
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Box minH="100vh" bg="white">
        <Flex justifyContent="center" alignItems="center" h="400px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
            mr={4}
          />
          <Text>Loading...</Text>
        </Flex>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box minH="100vh" bg="white">
        <Container maxW="container.md" py={8}>
          <Alert status="error" borderRadius="md" mb={8}>
            <AlertIcon />
            <Text>{error || "Post not found"}</Text>
          </Alert>
          <Button
            as={RouterLink}
            to="/blog"
            leftIcon={<ChevronLeftIcon />}
            colorScheme="blue"
          >
            Back to Blog
          </Button>
        </Container>
      </Box>
    );
  }

  const { attributes } = post;
  const imageUrl = cmsService.getImageUrl(attributes.featuredImage);

  return (
    <ErrorBoundary>
      <Box minH="100vh" bg="white">
        <Container maxW="container.md" py={8}>
          <Box as="header" mb={8}>
            <Heading as="h1" size="xl" mb={4}>
              {attributes.title}
            </Heading>
            <Breadcrumb>
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
          </Box>

          <Box>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={attributes.title}
                borderRadius="md"
                objectFit="cover"
                w="100%"
                h="400px"
                mb={6}
              />
            )}

            <Text fontSize="sm" color="gray.600" mb={6}>
              Posted on {new Date(attributes.publishedAt).toLocaleDateString()}
            </Text>

            <Box
              dangerouslySetInnerHTML={{ __html: attributes.content }}
              sx={{
                p: {
                  marginBottom: "1em",
                  lineHeight: 1.8,
                },
              }}
            />

            <Button
              as={RouterLink}
              to="/blog"
              leftIcon={<ChevronLeftIcon />}
              colorScheme="blue"
              mt={8}
            >
              Back to Blog
            </Button>
          </Box>
        </Container>
      </Box>
    </ErrorBoundary>
  );
}

export default BlogPost;
