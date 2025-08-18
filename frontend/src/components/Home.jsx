import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Badge,
  Card,
  CardBody,
  Flex,
  Image,
  Skeleton,
  Avatar,
} from "@chakra-ui/react";
import {
  FaUsers,
  FaChartBar,
  FaComments,
  FaProjectDiagram,
  FaCalendarAlt,
  FaThumbsUp,
  FaExternalLinkAlt,
  FaRocket,
  FaHeart,
  FaComment,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaPlay,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import FloatingShapes from "./FloatingShapes";
import WordCloudInput from "./WordCloudInput";
import SEOHead from "./SEOHead";
import CONFIG from "../config.js";
import { blogService } from "../services/blogService";

const ProjectCard = ({ project, votes, comments }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "draft":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "environment":
        return "🌱";
      case "education":
        return "📚";
      case "healthcare":
        return "🏥";
      case "technology":
        return "💻";
      case "community":
        return "🤝";
      default:
        return "🚀";
    }
  };

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
                  <Text fontSize="4xl">
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
              <Text fontSize="4xl">{getCategoryIcon(project.category)}</Text>
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
};

const BlogCard = ({ article }) => {
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
    >
      {/* Always show image container, with fallback */}
      <Box position="relative" height="200px" overflow="hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          objectFit="cover"
          w="100%"
          h="100%"
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
              size="sm"
              variant="ghost"
              rightIcon={<FaExternalLinkAlt />}
              color="primary.500"
              fontWeight="600"
              _hover={{
                color: "primary.700",
                bg: "primary.50",
              }}
            >
              อ่านเพิ่มเติม
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const EventCard = ({ event }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("th-TH", { month: "short" });
    return { day, month };
  };

  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "workshop":
        return "primary";
      case "seminar":
        return "secondary";
      case "conference":
        return "accent";
      case "training":
        return "primary";
      default:
        return "primary";
    }
  };

  const { day, month } = formatEventDate(event.date);

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
    >
      <CardBody p={6}>
        <HStack spacing={4} align="start" h="full">
          {/* Date Box */}
          <VStack
            spacing={0}
            bg={`${getEventTypeColor(event.type)}.500`}
            color="white"
            p={3}
            borderRadius="xl"
            minW="70px"
            textAlign="center"
          >
            <Text fontSize="2xl" fontWeight="bold" lineHeight="1">
              {day}
            </Text>
            <Text fontSize="xs" textTransform="uppercase" fontWeight="600">
              {month}
            </Text>
          </VStack>

          {/* Event Details */}
          <VStack align="start" spacing={3} flex={1} h="full">
            <VStack align="start" spacing={2} flex={1}>
              <Badge
                colorScheme={getEventTypeColor(event.type)}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
              >
                {event.type}
              </Badge>

              <Heading
                size="md"
                color="gray.800"
                fontWeight="600"
                lineHeight="1.3"
                noOfLines={2}
              >
                {event.title}
              </Heading>

              <Text
                color="gray.600"
                fontSize="sm"
                lineHeight="1.6"
                noOfLines={2}
              >
                {event.description}
              </Text>
            </VStack>

            <VStack spacing={2} align="start" w="full">
              <HStack spacing={2} align="center">
                <Icon as={FaClock} color="gray.400" boxSize={3} />
                <Text fontSize="xs" color="gray.500">
                  {event.time}
                </Text>
              </HStack>

              {event.location && (
                <HStack spacing={2} align="center">
                  <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={3} />
                  <Text fontSize="xs" color="gray.500" noOfLines={1}>
                    {event.location}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Button
              size="sm"
              colorScheme={getEventTypeColor(event.type)}
              variant="ghost"
              rightIcon={<FaArrowRight />}
              fontWeight="600"
              alignSelf="flex-start"
              _hover={{
                bg: `${getEventTypeColor(event.type)}.50`,
              }}
            >
              สมัครเข้าร่วม
            </Button>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

const ModernStat = ({ number, label, icon, color }) => {
  return (
    <VStack
      spacing={3}
      p={6}
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      transition="all 0.3s ease"
    >
      <Text fontSize="3xl" mb={-2}>
        {icon}
      </Text>
      <Text
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="900"
        color={`${color}.500`}
        lineHeight="1"
      >
        {number}
      </Text>
      <Text color="gray.600" fontSize="sm" fontWeight="600" textAlign="center">
        {label}
      </Text>
    </VStack>
  );
};

const ModernFeature = ({ title, text, icon, emoji, gradient }) => {
  return (
    <Card
      bg="gray.800"
      borderColor="gray.700"
      borderWidth="1px"
      _hover={{
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        borderColor: "primary.500",
      }}
      transition="all 0.3s ease"
      cursor="pointer"
    >
      <CardBody p={8}>
        <VStack spacing={6} align="start">
          <HStack>
            <Box
              bgGradient={gradient}
              p={3}
              borderRadius="xl"
              color="white"
              _groupHover={{ transform: "rotate(5deg)" }}
              transition="all 0.3s ease"
            >
              {icon}
            </Box>
            <Text fontSize="2xl">{emoji}</Text>
          </HStack>

          <VStack align="start" spacing={3}>
            <Heading size="md" color="white" fontWeight="700">
              {title}
            </Heading>
            <Text color="gray.300" fontSize="sm" lineHeight="1.6">
              {text}
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"primary.600"}
        rounded={"full"}
        bg={"white"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color={"white"}>
        {title}
      </Text>
      <Text color={"primary.50"}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [projectVotes, setProjectVotes] = useState({});
  const [projectComments, setProjectComments] = useState({});

  useEffect(() => {
    fetchFeaturedProjects();
    fetchFeaturedBlogs();
    fetchUpcomingEvents();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const response = await blogService.getBlogs(1, 3); // Get first 3 blogs

      // Transform articles to include proper thumbnail mapping
      const transformedArticles =
        response.articles?.map((article) => ({
          id: article.id,
          title: article.title,
          description: article.excerpt || article.title, // Use excerpt or fallback to title
          thumbnail: article.coverImage?.url, // Map coverImage.url to thumbnail
          publishedAt: blogService.formatDate(article.createdAt), // Format the date
        })) || [];

      setFeaturedBlogs(transformedArticles);
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
      // Use mock data if API fails
      setFeaturedBlogs([
        {
          id: 1,
          title: "นวัตกรรมเทคโนโลยีเพื่อสังคม",
          description:
            "ค้นพบเทคโนโลยีใหม่ๆ ที่กำลังเปลี่ยนแปลงวิถีชีวิตของคนไทย",
          thumbnail: null,
          publishedAt: "2 วันที่แล้ว",
        },
        {
          id: 2,
          title: "การศึกษายุคดิจิทัล",
          description: "แนวโน้มการเรียนรู้ที่จะเปลี่ยนแปลงการศึกษาไทยในอนาคต",
          thumbnail: null,
          publishedAt: "5 วันที่แล้ว",
        },
        {
          id: 3,
          title: "เมืองอัจฉริยะและการพัฒนาที่ยั่งยืน",
          description:
            "วิสัยทัศน์การพัฒนาเมืองไทยให้เป็นเมืองอัจฉริยะที่เป็นมิตรกับสิ่งแวดล้อม",
          thumbnail: null,
          publishedAt: "1 สัปดาห์ที่แล้ว",
        },
      ]);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchFeaturedProjects = async () => {
    try {
      setLoadingProjects(true);

      // Fetch projects and votes in parallel like the Projects page does
      const [projectsRes, votesRes, commentsRes] = await Promise.all([
        fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.PROJECTS}`),
        fetch(`${CONFIG.API_BASE_URL}/api/projects/votes/all`),
        fetch(`${CONFIG.API_BASE_URL}/api/projects/comments/stats`),
      ]);

      if (!projectsRes.ok) {
        throw new Error(`HTTP error! status: ${projectsRes.status}`);
      }

      const projectsData = await projectsRes.json();
      const projectsList = projectsData.data || [];

      // Handle votes
      let votesData = {};
      if (votesRes.ok) {
        const votesResponse = await votesRes.json();
        votesData = votesResponse.votes || {};
      }

      // Handle comments
      let commentsData = {};
      if (commentsRes.ok) {
        const commentsResponse = await commentsRes.json();
        commentsData = commentsResponse.data || {};
      }

      // Store votes and comments data
      setProjectVotes(votesData);
      setProjectComments(commentsData);

      // Combine projects with their vote counts and sort by votes
      const projectsWithVotes = projectsList.map((project) => ({
        ...project,
        votes: votesData[project.id] || project.votes || 0, // Use API votes or fallback to project votes
      }));

      // Sort by votes (highest first) and get top 3
      const topVotedProjects = projectsWithVotes
        .sort((a, b) => (b.votes || 0) - (a.votes || 0))
        .slice(0, 3);

      setFeaturedProjects(topVotedProjects);
    } catch (err) {
      console.error("Error fetching featured projects:", err);
      // Use mock data if API fails (with high vote counts to simulate top voted)
      const mockProjects = [
        {
          id: 3,
          title: "การติดตามสุขภาพชุมชน",
          description:
            "เสริมพลังชุมชนท้องถิ่นด้วยเครื่องมือสำหรับการรวบรวมและวิเคราะห์ข้อมูลสุขภาพ",
          category: "healthcare",
          status: "completed",
          votes: 156,
          createdTime: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: 1,
          title: "แพลตฟอร์มนวัตกรรมเมืองอัจฉริยะ",
          description:
            "สร้างโซลูชันเมืองที่ยั่งยืนผ่านความคิดริเริ่มเทคโนโลยีที่ขับเคลื่อนโดยชุมชน",
          category: "technology",
          status: "active",
          votes: 127,
          createdTime: new Date().toISOString(),
        },
        {
          id: 2,
          title: "เครือข่ายการศึกษาสีเขียว",
          description:
            "เชื่อมโยงโรงเรียนทั่วประเทศไทยเพื่อแบ่งปันแนวปฏิบัติที่ดีและทรัพยากรด้านสิ่งแวดล้อม",
          category: "education",
          status: "active",
          votes: 89,
          createdTime: new Date(Date.now() - 86400000).toISOString(),
        },
      ];

      setFeaturedProjects(mockProjects);

      // Set mock votes and comments data
      setProjectVotes({
        1: 127,
        2: 89,
        3: 156,
      });
      setProjectComments({
        1: 12,
        2: 8,
        3: 18,
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      setLoadingEvents(true);
      console.log("🔄 Fetching events from API...");

      // Fetch events from the real API
      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.EVENTS}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 API Response:", data);

      if (data.data && Array.isArray(data.data)) {
        console.log("📅 Raw events data:", data.data);

        // Filter and sort upcoming events (events with date >= today)
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        console.log("📆 Current date:", today);

        const upcoming = data.data
          .filter((event) => {
            if (!event.date) return false;
            const eventDate = new Date(event.date);
            console.log(
              `🔍 Checking event "${event.title}": ${event.date} -> ${eventDate} >= ${today}?`,
              eventDate >= today
            );
            return eventDate >= today;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        console.log("✅ Filtered upcoming events:", upcoming);
        setUpcomingEvents(upcoming);
      } else {
        console.warn("No events data received from API");
        setUpcomingEvents([]);
      }
    } catch (err) {
      console.error("Error fetching upcoming events:", err);
      setUpcomingEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  return (
    <Box>
      <SEOHead
        title="หน้าหลัก"
        description="แพลตฟอร์มการมีส่วนร่วมสาธารณะของไทยพีบีเอส เพื่อสร้างปัญญารวมหมู่ โหวตโครงการ แสดงความคิดเห็น และร่วมกิจกรรมเพื่อพัฒนาสังคมไทย"
        keywords="PI, Thai PBS, การมีส่วนร่วม, โหวตโครงการ, ความคิดเห็น, ปัญญารวมหมู่, สื่อสาธารณะ"
        url="/"
      />

      {/* Nesta-Inspired Hero Section with Floating Shapes */}
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
            inset={0} // = top/left/right/bottom 0
            bgImage="url('/logo/pi-pattern.svg')"
            bgRepeat="no-repeat"
            bgSize="cover" // use "contain" if you prefer full image always visible
            bgPosition="center"
            opacity={0.04}
            pointerEvents="none"
            zIndex={0}
            aria-hidden="true"
          />

          <Container maxW="7xl" position="relative" zIndex={1}>
            <VStack spacing={12} textAlign="center">
              {/* Interactive Word Cloud */}
              <WordCloudInput />
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Featured Projects Section - โปรเจ็กต์เด่น */}
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
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {featuredProjects.map((project) => (
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

      {/* Featured Blog Articles Section - บทความเด่น */}
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
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {featuredBlogs.map((article) => (
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
