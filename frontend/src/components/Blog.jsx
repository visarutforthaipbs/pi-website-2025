import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Image,
  Stack,
  Badge,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  HStack,
  VStack,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { blogService } from "../services/blogService";

const BlogCard = ({ article }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Debug logging
  console.log("Article coverImage:", article.coverImage);

  return (
    <Card
      bg={cardBg}
      shadow="lg"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "xl",
      }}
      height="100%"
    >
      {/* Cover Image */}
      <Box position="relative" overflow="hidden" h="200px">
        {article.coverImage.url ? (
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
            loading="lazy"
            onLoad={(e) => {
              console.log("Image loaded successfully:", article.coverImage.url);
              // Hide any fallback placeholder
              const placeholder =
                e.target.parentElement.querySelector(".image-placeholder");
              if (placeholder) placeholder.style.display = "none";
            }}
            onError={(e) => {
              console.log("Image failed to load:", article.coverImage.url);
              e.target.style.display = "none";
              // Show fallback placeholder
              const placeholder =
                e.target.parentElement.querySelector(".image-placeholder");
              if (placeholder) placeholder.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback placeholder - only show when no image URL or image fails to load */}
        <Box
          className="image-placeholder"
          w="100%"
          h="100%"
          bg="gray.100"
          display={article.coverImage.url ? "none" : "flex"}
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          position="absolute"
          top="0"
          left="0"
        >
          <VStack spacing={2}>
            <Box w="60px" h="60px" bg="gray.300" borderRadius="md" />
            <Text color="gray.500" fontSize="sm">
              ไม่มีรูปภาพ
            </Text>
          </VStack>
        </Box>

        {/* Hover overlay - only show if there's an image */}
        {article.coverImage.url && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))"
            opacity="0"
            transition="opacity 0.3s ease"
            _hover={{ opacity: 1 }}
          />
        )}
      </Box>

      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          {/* Date Badge */}
          <Badge
            colorScheme="blue"
            variant="subtle"
            fontSize="xs"
            px={3}
            py={1}
            borderRadius="full"
          >
            {blogService.formatDate(article.publishAt)}
          </Badge>

          {/* Title */}
          <Heading
            size="md"
            color="#287bbf"
            lineHeight="tall"
            noOfLines={3}
            minH="72px"
          >
            {article.title}
          </Heading>

          {/* Read More Button */}
          <Button
            as={Link}
            href={blogService.getArticleUrl(article.slug)}
            isExternal
            colorScheme="blue"
            variant="outline"
            size="sm"
            rightIcon={<ExternalLinkIcon />}
            _hover={{
              bg: "#287bbf",
              color: "white",
              textDecoration: "none",
            }}
            transition="all 0.3s ease"
          >
            อ่านต่อ
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await blogService.getBlogs(page, 12);
      setArticles(data.articles);
      setPagination(data.pagination);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลบล็อกได้ กรุณาลองใหม่อีกครั้ง");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box
        minH="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="#287bbf" thickness="4px" />
          <Text color="gray.600">กำลังโหลดบทความ...</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxW="4xl" py={20}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="xl"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            เกิดข้อผิดพลาด
          </AlertTitle>
          <AlertDescription maxWidth="sm">{error}</AlertDescription>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={() => fetchBlogs(currentPage)}
          >
            ลองใหม่
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Box bg={bgGradient} minH="100vh">
      <Container maxW="7xl" py={12}>
        {/* Header Section */}
        <VStack spacing={8} mb={12} textAlign="center">
          <Heading size="2xl" color="#287bbf" fontWeight="bold">
            บทความและบล็อก
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="3xl" lineHeight="tall">
            ติดตามบทความและเรื่องราวที่น่าสนใจจากทีมงาน PI Website
            เพื่อรับข้อมูลข่าวสารและความรู้ที่เป็นประโยชน์
          </Text>
        </VStack>

        {/* Articles Grid */}
        {articles.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
            {articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        {pagination.pageCount > 1 && (
          <Flex justify="center" align="center" spacing={4}>
            <HStack spacing={2}>
              <Button
                leftIcon={<ChevronLeftIcon />}
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                variant="outline"
                colorScheme="blue"
              >
                ก่อนหน้า
              </Button>

              <HStack spacing={1}>
                {Array.from(
                  { length: pagination.pageCount },
                  (_, i) => i + 1
                ).map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    colorScheme={currentPage === page ? "blue" : "gray"}
                    variant={currentPage === page ? "solid" : "outline"}
                    size="sm"
                  >
                    {page}
                  </Button>
                ))}
              </HStack>

              <Button
                rightIcon={<ChevronRightIcon />}
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === pagination.pageCount}
                variant="outline"
                colorScheme="blue"
              >
                ถัดไป
              </Button>
            </HStack>
          </Flex>
        )}

        {/* Empty State */}
        {articles.length === 0 && !loading && (
          <Box textAlign="center" py={20}>
            <Heading size="lg" color="gray.500" mb={4}>
              ไม่มีบทความในขณะนี้
            </Heading>
            <Text color="gray.400">กรุณาลองใหม่อีกครั้งในภายหลัง</Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Blog;
