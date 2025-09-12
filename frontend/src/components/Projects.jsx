import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  Icon,
  Skeleton,
  useColorModeValue,
  Image,
  Flex,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  useToast,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaUsers,
  FaThumbsUp,
  FaExternalLinkAlt,
  FaRocket,
  FaHeart,
  FaComment,
  FaFire,
  FaTrophy,
  FaPaperPlane,
  FaSync,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CONFIG from "../config.js";
import SEOHead from "./SEOHead";

const ProjectCard = ({
  project,
  onVote,
  onComment,
  votes,
  comments,
  hasVoted,
}) => {
  const [isLiked, setIsLiked] = useState(hasVoted);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [projectComments, setProjectComments] = useState(comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

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

  const handleVote = async (e) => {
    e.stopPropagation();
    if (hasVoted) {
      toast({
        title: "คุณโหวตแล้ว",
        description: "คุณโหวตโครงการนี้แล้ว",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await onVote(project.id);
      setIsLiked(true);
      toast({
        title: "โหวตสำเร็จ! 🎉",
        description: "ขอบคุณสำหรับการสนับสนุนโครงการนี้",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหวตได้ กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      toast({
        title: "กรุณาใส่ความคิดเห็น",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const newComment = await onComment(
        project.id,
        commentText,
        userName || "ผู้ใช้งาน"
      );
      setProjectComments([newComment, ...projectComments]);
      setCommentText("");
      toast({
        title: "ส่งความคิดเห็นสำเร็จ! 💬",
        description: "ขอบคุณสำหรับความคิดเห็น",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
        onClick={onOpen}
      >
        {/* Project Image/Thumbnail */}
        <Box position="relative" h="200px" bg="#287bbf" overflow="hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              w="full"
              h="full"
              objectFit="cover"
              loading="lazy"
              onError={(e) => {
                console.log("Image failed to load:", project.thumbnail);
                // Optional: You could trigger a refetch here
              }}
              fallback={
                <Flex
                  w="full"
                  h="full"
                  align="center"
                  justify="center"
                  bg="#287bbf"
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
                      {project.category || "โครงการทั่วไป"}
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
              bg="#287bbf"
              color="white"
            >
              <VStack spacing={2}>
                <Text fontSize="4xl">{getCategoryIcon(project.category)}</Text>
                <Text fontSize="sm" fontWeight="600" textAlign="center" px={4}>
                  {project.category || "โครงการทั่วไป"}
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

          {/* Vote Rank Badge */}
          {votes > 10 && (
            <Badge
              position="absolute"
              top={4}
              left={4}
              bg="#ffb200"
              color="white"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="700"
              leftIcon={<FaTrophy />}
            >
              🏆 ยอดนิยม
            </Badge>
          )}
        </Box>

        <CardBody p={6}>
          <VStack align="start" spacing={4}>
            {/* Project Title */}
            <Heading
              size="md"
              color="#287bbf"
              lineHeight="1.3"
              noOfLines={2}
              fontWeight="700"
            >
              {project.title || "โครงการไม่มีชื่อ"}
            </Heading>

            {/* Project Description */}
            <Text color="gray.600" fontSize="sm" lineHeight="1.6" noOfLines={3}>
              {project.description || "ไม่มีรายละเอียด"}
            </Text>

            {/* Project Stats */}
            <HStack justify="space-between" w="full">
              <HStack spacing={4}>
                <HStack spacing={1}>
                  <Icon as={FaThumbsUp} color="#287bbf" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="600">
                    {votes || 0}
                  </Text>
                </HStack>

                <HStack spacing={1}>
                  <Icon as={FaComment} color="#ffb200" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="600">
                    {projectComments.length || 0}
                  </Text>
                </HStack>
              </HStack>

              <HStack spacing={2}>
                {/* Visit Project Button */}
                {project.url && (
                  <IconButton
                    size="sm"
                    icon={<FaExternalLinkAlt />}
                    colorScheme="blue"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.url, "_blank");
                    }}
                    borderRadius="full"
                    color="#287bbf"
                    _hover={{
                      bg: "#287bbf",
                      color: "white",
                    }}
                    title="เยี่ยมชมโครงการ"
                  />
                )}

                <Button
                  size="sm"
                  leftIcon={<FaHeart />}
                  colorScheme={hasVoted ? "red" : "gray"}
                  variant={hasVoted ? "solid" : "ghost"}
                  onClick={handleVote}
                  borderRadius="full"
                  px={4}
                  bg={hasVoted ? "#ffb200" : "gray.100"}
                  color={hasVoted ? "white" : "gray.600"}
                  _hover={{
                    bg: hasVoted ? "#e5a000" : "#287bbf",
                    color: "white",
                  }}
                >
                  {hasVoted ? "โหวตแล้ว" : "โหวต"}
                </Button>
              </HStack>
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

      {/* Project Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#287bbf">
            <HStack>
              <Text fontSize="2xl">{getCategoryIcon(project.category)}</Text>
              <Text>{project.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={6}>
              {/* Project Image */}
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  w="full"
                  h="200px"
                  objectFit="cover"
                  borderRadius="lg"
                />
              )}

              {/* Project Description */}
              <Box>
                <Text fontSize="lg" color="gray.700" lineHeight="1.8">
                  {project.description || "ไม่มีรายละเอียด"}
                </Text>
              </Box>

              {/* Stats and Actions */}
              <HStack spacing={6} justify="space-between" w="full">
                <HStack spacing={6}>
                  <HStack>
                    <Icon as={FaThumbsUp} color="#287bbf" />
                    <Text fontWeight="600" color="#287bbf">
                      {votes || 0} โหวต
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaComment} color="#ffb200" />
                    <Text fontWeight="600" color="#ffb200">
                      {projectComments.length} ความคิดเห็น
                    </Text>
                  </HStack>
                </HStack>

                {/* Visit Project Button */}
                {project.url && (
                  <Button
                    leftIcon={<FaExternalLinkAlt />}
                    bg="#287bbf"
                    color="white"
                    size="sm"
                    onClick={() => window.open(project.url, "_blank")}
                    _hover={{ bg: "#236ba0" }}
                    borderRadius="full"
                  >
                    เยี่ยมชมโครงการ
                  </Button>
                )}
              </HStack>

              <Divider />

              {/* Comment Section */}
              <Box w="full">
                <Heading size="md" mb={4} color="#287bbf">
                  แสดงความคิดเห็น
                </Heading>

                {/* Comment Form */}
                <VStack spacing={4} mb={6}>
                  <Input
                    placeholder="ชื่อของคุณ (ไม่บังคับ)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    borderColor="gray.300"
                    _focus={{ borderColor: "#287bbf" }}
                  />
                  <Textarea
                    placeholder="แสดงความคิดเห็นของคุณ..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    borderColor="gray.300"
                    _focus={{ borderColor: "#287bbf" }}
                    maxLength={500}
                  />
                  <Button
                    leftIcon={<FaPaperPlane />}
                    bg="#ffb200"
                    color="white"
                    onClick={handleSubmitComment}
                    isLoading={isSubmitting}
                    loadingText="กำลังส่ง..."
                    _hover={{ bg: "#e5a000" }}
                    alignSelf="flex-end"
                  >
                    ส่งความคิดเห็น
                  </Button>
                </VStack>

                {/* Comments List */}
                <VStack spacing={4} align="start">
                  {projectComments.length > 0 ? (
                    projectComments.map((comment) => (
                      <Box
                        key={comment._id}
                        p={4}
                        bg="gray.50"
                        borderRadius="lg"
                        w="full"
                      >
                        <HStack justify="space-between" mb={2}>
                          <HStack>
                            <Avatar size="sm" name={comment.userName} />
                            <Text fontWeight="600" color="#287bbf">
                              {comment.userName}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "th-TH"
                            )}
                          </Text>
                        </HStack>
                        <Text color="gray.700">{comment.comment}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text color="gray.500" fontStyle="italic">
                      ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!
                    </Text>
                  )}
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProjectsLoadingSkeleton = () => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
    {[...Array(6)].map((_, i) => (
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
              <Skeleton height="32px" width="80px" borderRadius="full" />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    ))}
  </SimpleGrid>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("votes"); // votes, comments, date
  const [votes, setVotes] = useState({});
  const [comments, setComments] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      setLoading(true);

      // Cache-busting headers to ensure fresh data
      const fetchOptions = {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      };

      // Fetch projects, votes, and comments in parallel
      const [projectsRes, votesRes, commentsRes] = await Promise.all([
        fetch(
          `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.PROJECTS}`,
          fetchOptions
        ),
        fetch(`${CONFIG.API_BASE_URL}/api/projects/votes/all`, fetchOptions),
        fetch(
          `${CONFIG.API_BASE_URL}/api/projects/comments/stats`,
          fetchOptions
        ),
      ]);

      if (!projectsRes.ok)
        throw new Error(`Projects API error: ${projectsRes.status}`);

      const projectsData = await projectsRes.json();
      const projectsList = projectsData.data || [];

      // Handle votes
      let votesData = {};
      let userVotesList = [];
      if (votesRes.ok) {
        const votesResponse = await votesRes.json();
        votesData = votesResponse.votes || {};
        userVotesList = votesResponse.userVotes || [];
      }

      // Handle comments
      let commentsData = {};
      if (commentsRes.ok) {
        const commentsResponse = await commentsRes.json();
        commentsData = commentsResponse.data || {};
      }

      setProjects(projectsList);
      setVotes(votesData);
      setComments(commentsData);
      setUserVotes(userVotesList);
    } catch (err) {
      console.error("Error fetching projects data:", err);
      setError("ไม่สามารถโหลดข้อมูลโครงการได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (projectId) => {
    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}/api/projects/${projectId}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to vote");
      }

      const result = await response.json();

      // Update local state
      setVotes((prev) => ({
        ...prev,
        [projectId]: result.votes,
      }));

      setUserVotes((prev) => [...prev, projectId]);
    } catch (error) {
      throw error;
    }
  };

  const handleComment = async (projectId, comment, userName) => {
    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}/api/projects/${projectId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment, userName }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add comment");
      }

      const result = await response.json();

      // Update comment count
      setComments((prev) => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          count: (prev[projectId]?.count || 0) + 1,
        },
      }));

      return result.comment;
    } catch (error) {
      throw error;
    }
  };

  const getSortedProjects = (projectsList) => {
    return [...projectsList].sort((a, b) => {
      switch (sortBy) {
        case "votes":
          return (votes[b.id] || 0) - (votes[a.id] || 0);
        case "comments":
          return (comments[b.id]?.count || 0) - (comments[a.id]?.count || 0);
        case "date":
          return new Date(b.createdTime || 0) - new Date(a.createdTime || 0);
        default:
          return 0;
      }
    });
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.status?.toLowerCase() === filter;
  });

  const sortedProjects = getSortedProjects(filteredProjects);

  const filters = [
    {
      value: "all",
      label: "🌟 ทั้งหมด",
      count: projects.length,
      icon: FaRocket,
    },
    {
      value: "active",
      label: "🔥 กำลังดำเนินการ",
      count: projects.filter((p) => p.status?.toLowerCase() === "active")
        .length,
      icon: FaFire,
    },
    {
      value: "completed",
      label: "✅ เสร็จแล้ว",
      count: projects.filter((p) => p.status?.toLowerCase() === "completed")
        .length,
      icon: FaTrophy,
    },
    {
      value: "draft",
      label: "📝 ร่าง",
      count: projects.filter((p) => p.status?.toLowerCase() === "draft").length,
      icon: FaComment,
    },
  ];

  const sortOptions = [
    { value: "votes", label: "โหวตมากที่สุด", icon: FaThumbsUp },
    { value: "comments", label: "ความคิดเห็นมากที่สุด", icon: FaComment },
    { value: "date", label: "ล่าสุด", icon: FaCalendarAlt },
  ];

  return (
    <>
      <SEOHead
        title="โครงการ"
        description="ชมและโหวตโครงการที่น่าสนใจจากทีม PI Thai PBS พร้อมแสดงความคิดเห็นและสนับสนุนโครงการที่คุณชื่นชอบ"
        keywords="โครงการ, โหวต, ความคิดเห็น, PI projects, Thai PBS, การพัฒนา, นวัตกรรม"
        url="/projects"
      />

      <Box
        py={{ base: 16, md: 20 }}
        bg={useColorModeValue(
          "linear(to-b, blue.50, white)",
          "linear(to-b, gray.900, gray.800)"
        )}
        minH="100vh"
      >
        <Container maxW={"7xl"}>
          <VStack spacing={{ base: 8, md: 12 }}>
            {/* Modern Header */}
            <VStack spacing={6} textAlign="center">
              <Heading
                color={"#287bbf"}
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                lineHeight="1.1"
                textAlign="center"
              >
                โปรเจค{" "}
                <Text as="span" color="#ffb200">
                  ที่ได้ทำไป
                </Text>
              </Heading>

              <Text
                color={"gray.600"}
                fontSize={{ base: "lg", md: "xl" }}
                maxW="3xl"
                lineHeight="1.8"
              >
                ตัวอย่างผลงานบางส่วนของทีมเราภายใต้แนวคิดปัญญารวมหมู่
              </Text>

              {/* Refresh Button */}
              <Button
                onClick={fetchProjectsData}
                isLoading={loading}
                loadingText="กำลังโหลด..."
                leftIcon={<FaSync />}
                colorScheme="blue"
                variant="outline"
                size="sm"
                borderRadius="full"
                _hover={{
                  bg: "#287bbf",
                  color: "white",
                }}
              >
                รีเฟรชข้อมูล
              </Button>
            </VStack>

            {/* Sort Options */}
            <Stack
              spacing={4}
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="center"
            >
              <Text color="gray.600" fontWeight="600" mb={{ base: 2, md: 0 }}>
                เรียงตาม:
              </Text>
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    variant={sortBy === option.value ? "solid" : "ghost"}
                    bg={sortBy === option.value ? "#287bbf" : "transparent"}
                    color={sortBy === option.value ? "white" : "#287bbf"}
                    size="sm"
                    borderRadius="full"
                    px={4}
                    leftIcon={<Icon as={option.icon} />}
                    _hover={{
                      bg: sortBy === option.value ? "#236ba0" : "#287bbf",
                      color: "white",
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </HStack>
            </Stack>

            {/* Modern Filter Tabs */}
            <HStack
              spacing={4}
              flexWrap="wrap"
              justify="center"
              direction={{ base: "column", sm: "row" }}
              as={Stack}
              w="full"
            >
              {filters.map((filterOption) => (
                <Button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  variant={filter === filterOption.value ? "solid" : "ghost"}
                  bg={filter === filterOption.value ? "#ffb200" : "transparent"}
                  color={filter === filterOption.value ? "white" : "#287bbf"}
                  size="md"
                  borderRadius="full"
                  px={6}
                  rightIcon={
                    <Badge
                      bg={filter === filterOption.value ? "white" : "#ffb200"}
                      color={
                        filter === filterOption.value ? "#ffb200" : "white"
                      }
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {filterOption.count}
                    </Badge>
                  }
                  _hover={{
                    bg: filter === filterOption.value ? "#e5a000" : "#ffb200",
                    color: "white",
                  }}
                >
                  {filterOption.label}
                </Button>
              ))}
            </HStack>

            {/* Projects Grid */}
            {loading ? (
              <ProjectsLoadingSkeleton />
            ) : error ? (
              <VStack spacing={4} py={20}>
                <Text fontSize="6xl">😕</Text>
                <Heading size="md" color="gray.600" textAlign="center">
                  เกิดข้อผิดพลาด
                </Heading>
                <Text color="gray.500" textAlign="center" maxW="md">
                  {error}
                </Text>
                <Button
                  onClick={fetchProjectsData}
                  bg="#287bbf"
                  color="white"
                  leftIcon={<FaRocket />}
                  borderRadius="full"
                  _hover={{ bg: "#236ba0" }}
                >
                  ลองใหม่อีกครั้ง
                </Button>
              </VStack>
            ) : sortedProjects.length === 0 ? (
              <VStack spacing={4} py={20}>
                <Text fontSize="6xl">🔍</Text>
                <Heading size="md" color="gray.600" textAlign="center">
                  ไม่พบโครงการ
                </Heading>
                <Text color="gray.500" textAlign="center" maxW="md">
                  ไม่มีโครงการในหมวดหมู่ที่คุณเลือก
                  ลองเปลี่ยนตัวกรองหรือกลับมาใหม่ทีหลัง
                </Text>
              </VStack>
            ) : (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                {sortedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    votes={votes[project.id] || 0}
                    comments={comments[project.id]?.count || 0}
                    hasVoted={userVotes.includes(project.id)}
                    onVote={handleVote}
                    onComment={handleComment}
                  />
                ))}
              </SimpleGrid>
            )}

            {/* Call to Action */}
            {!loading && !error && sortedProjects.length > 0 && (
              <VStack spacing={6} textAlign="center" py={12}>
                <Heading size="lg" color="#287bbf">
                  มีไอเดียโครงการเจ๋ง ๆ มั้ย? 💡
                </Heading>
                <Text color="gray.600" maxW="2xl">
                  เสนอโครงการของคุณและให้คนรุ่นใหม่ได้มีส่วนร่วมในการสร้างสรรค์สังคมไทยที่ดีขึ้น
                </Text>
                <Button
                  as={RouterLink}
                  to="/contact"
                  size="lg"
                  bg="#ffb200"
                  color="white"
                  leftIcon={<FaRocket />}
                  borderRadius="full"
                  px={8}
                  _hover={{ bg: "#e5a000" }}
                >
                  เสนอโครงการ 🚀
                </Button>
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
}
