import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Badge,
  Skeleton,
  Card,
  CardBody,
  HStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import FloatingShapes from "./FloatingShapes";
import WordCloudInput from "./WordCloudInput";
import SEOHead from "./SEOHead";
import { ProjectCard, BlogCard, EventCard } from "./homeComponents";
import { useFeaturedProjects } from "../hooks/useFeaturedProjects";
import { useFeaturedBlogs } from "../hooks/useFeaturedBlogs";
import { useUpcomingEvents } from "../hooks/useUpcomingEvents";

/**
 * Home Page Component
 * Main landing page with featured projects, blogs, and events
 */
export default function Home() {
  // Custom hooks for data fetching
  const {
    projects: featuredProjects,
    loading: loadingProjects,
    votes: projectVotes,
    comments: projectComments,
  } = useFeaturedProjects();

  const { blogs: featuredBlogs, loading: loadingBlogs } = useFeaturedBlogs(3);

  const { events: upcomingEvents, loading: loadingEvents } =
    useUpcomingEvents();

  return (
    <Box>
      <SEOHead
        title="หน้าหลัก"
        description="แพลตฟอร์มการมีส่วนร่วมสาธารณะของไทยพีบีเอส เพื่อสร้างปัญญารวมหมู่ โหวตโครงการ แสดงความคิดเห็น และร่วมกิจกรรมเพื่อพัฒนาสังคมไทย"
        keywords="PI, Thai PBS, การมีส่วนร่วม, โหวตโครงการ, ความคิดเห็น, ปัญญารวมหมู่, สื่อสาธารณะ"
        url="/"
      />

      {/* Hero Section with Word Cloud */}
      <FloatingShapes variant="hero">
        <Box
          bg="white"
          py={{ base: 16, md: 24 }}
          position="relative"
          minH={{ base: "80vh", md: "100vh" }}
          display="flex"
          alignItems="center"
        >
          {/* Large Pattern Overlay */}
          <Box
            position="absolute"
            inset={0}
            bgImage="url('/logo/pi-pattern.svg')"
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
            opacity={0.04}
            pointerEvents="none"
            zIndex={0}
            aria-hidden="true"
          />

          <Container maxW="7xl" position="relative" zIndex={1}>
            <VStack spacing={12} textAlign="center">
              <WordCloudInput />
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Featured Projects Section */}
      <FloatingShapes variant="section">
        <Box bg="gray.50" py={{ base: 16, md: 24 }}>
          <Container maxW="7xl">
            <VStack spacing={{ base: 12, md: 16 }}>
              <VStack spacing={6} textAlign="center" maxW="4xl">
                <Badge
                  bg="secondary.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  โปรเจ็กต์เด่น
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="300"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  โปรเจค{" "}
                  <Text as="span" color="primary.500" fontWeight="700">
                    ที่ได้รับความนิยม
                  </Text>{" "}
                  <Text as="span" color="secondary.500" fontWeight="700">
                    มากที่สุด
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="xl"
                  maxW="3xl"
                  lineHeight="1.8"
                  fontWeight="400"
                >
                  สำรวจโปรเจ็กต์ที่ได้รับความสนใจสูงสุดจากชุมชน
                  ผ่านการโหวตของประชาชน
                </Text>
              </VStack>

              {loadingProjects ? (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} borderRadius="2xl" overflow="hidden">
                      <Skeleton height="200px" />
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
                            <Skeleton
                              height="32px"
                              width="80px"
                              borderRadius="full"
                            />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : featuredProjects.length === 0 ? (
                <VStack spacing={4} py={12}>
                  <Text fontSize="6xl" role="img" aria-label="No projects">
                    📁
                  </Text>
                  <Heading size="md" color="gray.600">
                    ไม่มีโปรเจคเด่น
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    ยังไม่มีโปรเจคที่ได้รับการโหวตในขณะนี้
                  </Text>
                </VStack>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {featuredProjects.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      votes={projectVotes[project.id] || project.votes || 0}
                      comments={projectComments[project.id] || 0}
                    />
                  ))}
                </SimpleGrid>
              )}

              <Button
                as={RouterLink}
                to="/projects"
                size="lg"
                rightIcon={<FaArrowRight />}
                colorScheme="primary"
                variant="outline"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="600"
                borderRadius="full"
                _hover={{
                  bg: "primary.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.3s ease"
              >
                ดูโปรเจ็กต์ทั้งหมด
              </Button>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Featured Blog Articles Section */}
      <FloatingShapes variant="section">
        <Box bg="white" py={{ base: 16, md: 24 }}>
          <Container maxW="7xl">
            <VStack spacing={{ base: 12, md: 16 }}>
              <VStack spacing={6} textAlign="center" maxW="4xl">
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
                  บทความเด่น
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="300"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  อัปเดต{" "}
                  <Text as="span" color="primary.500" fontWeight="700">
                    ข่าวสาร
                  </Text>{" "}
                  และ{" "}
                  <Text as="span" color="secondary.500" fontWeight="700">
                    บทความ
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="xl"
                  maxW="3xl"
                  lineHeight="1.8"
                  fontWeight="400"
                >
                  อ่านบทความล่าสุดเกี่ยวกับนวัตกรรม เทคโนโลยี
                  และการพัฒนาสังคมจากทีมงาน PI และผู้เชี่ยวชาญ
                </Text>
              </VStack>

              {loadingBlogs ? (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} borderRadius="2xl" overflow="hidden">
                      <Skeleton height="200px" />
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
                            <Skeleton
                              height="32px"
                              width="100px"
                              borderRadius="full"
                            />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : featuredBlogs.length === 0 ? (
                <VStack spacing={4} py={12}>
                  <Text fontSize="6xl" role="img" aria-label="No blogs">
                    📝
                  </Text>
                  <Heading size="md" color="gray.600">
                    ไม่มีบทความเด่น
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    ยังไม่มีบทความที่เผยแพร่ในขณะนี้
                  </Text>
                </VStack>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {featuredBlogs.slice(0, 3).map((article) => (
                    <BlogCard key={article.id} article={article} />
                  ))}
                </SimpleGrid>
              )}

              <Button
                as={RouterLink}
                to="/blog"
                size="lg"
                rightIcon={<FaArrowRight />}
                colorScheme="primary"
                variant="outline"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="600"
                borderRadius="full"
                _hover={{
                  bg: "primary.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.3s ease"
              >
                อ่านบทความทั้งหมด
              </Button>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Event Calendar Section */}
      <FloatingShapes variant="section">
        <Box bg="white" py={{ base: 16, md: 24 }}>
          <Container maxW="7xl">
            <VStack spacing={{ base: 12, md: 16 }}>
              <VStack spacing={6} textAlign="center" maxW="4xl">
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
                  กิจกรรมของเรา
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="300"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  ปฏิทิน{" "}
                  <Text as="span" color="primary.500" fontWeight="700">
                    กิจกรรม
                  </Text>{" "}
                  และ{" "}
                  <Text as="span" color="secondary.500" fontWeight="700">
                    อีเวนต์
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="xl"
                  maxW="3xl"
                  lineHeight="1.8"
                  fontWeight="400"
                >
                  เข้าร่วมกิจกรรมและอีเวนต์ที่น่าสนใจ
                  เพื่อเรียนรู้และพัฒนาทักษะไปด้วยกัน
                </Text>
              </VStack>

              {loadingEvents ? (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height="300px" borderRadius="2xl" />
                  ))}
                </SimpleGrid>
              ) : upcomingEvents.length === 0 ? (
                <VStack spacing={4} py={12}>
                  <Text fontSize="6xl" role="img" aria-label="No events">
                    📅
                  </Text>
                  <Heading size="md" color="gray.600">
                    ไม่มีกิจกรรมที่กำลังจะมาถึง
                  </Heading>
                  <Text color="gray.500" textAlign="center" maxW="md">
                    ติดตามกิจกรรมและอีเวนต์ใหม่ๆ ที่กำลังจะมาเร็วๆ นี้
                  </Text>
                </VStack>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </SimpleGrid>
              )}

              <Button
                as={RouterLink}
                to="/events"
                size="lg"
                colorScheme="primary"
                variant="outline"
                rightIcon={<FaCalendarAlt />}
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                borderRadius="full"
                _hover={{
                  bg: "primary.500",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                }}
                transition="all 0.3s ease"
              >
                ดูปฏิทินกิจกรรมทั้งหมด
              </Button>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>
    </Box>
  );
}
