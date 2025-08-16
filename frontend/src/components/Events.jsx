import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Badge,
  Card,
  CardBody,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaVideo,
  FaBuilding,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import FloatingShapes from "./FloatingShapes";
import SEOHead from "./SEOHead";

const EventCard = ({ event, variant = "default" }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("th-TH", { month: "short" });
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString("th-TH", { weekday: "short" });
    return { day, month, year, weekday };
  };

  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "workshop":
        return "blue";
      case "seminar":
        return "purple";
      case "conference":
        return "green";
      case "training":
        return "orange";
      case "webinar":
        return "cyan";
      default:
        return "primary";
    }
  };

  const { day, month, year, weekday } = formatEventDate(event.date);
  const colorScheme = getEventTypeColor(event.type);

  if (variant === "featured") {
    return (
      <Card
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        shadow="xl"
        border="1px solid"
        borderColor="gray.100"
        _hover={{
          transform: "translateY(-12px)",
          shadow: "2xl",
          borderColor: `${colorScheme}.200`,
        }}
        transition="all 0.4s ease"
        h="full"
      >
        <Box bg={`${colorScheme}.500`} color="white" p={6}>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <Badge
                bg="whiteAlpha.200"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
              >
                {event.type}
              </Badge>
              <Heading size="lg" fontWeight="700" lineHeight="1.2">
                {event.title}
              </Heading>
            </VStack>
            <VStack
              spacing={0}
              textAlign="center"
              bg="whiteAlpha.200"
              p={3}
              borderRadius="lg"
            >
              <Text fontSize="xs" opacity={0.8}>
                {weekday}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" lineHeight="1">
                {day}
              </Text>
              <Text fontSize="xs" opacity={0.8}>
                {month}
              </Text>
            </VStack>
          </HStack>
        </Box>

        <CardBody p={6}>
          <VStack align="start" spacing={4} h="full">
            <Text color="gray.600" fontSize="md" lineHeight="1.6" noOfLines={3}>
              {event.description}
            </Text>

            <VStack spacing={3} align="start" w="full">
              <HStack spacing={3} align="center">
                <Icon as={FaClock} color="gray.400" boxSize={4} />
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                  {event.time}
                </Text>
              </HStack>

              <HStack spacing={3} align="center">
                <Icon
                  as={event.isOnline ? FaVideo : FaMapMarkerAlt}
                  color="gray.400"
                  boxSize={4}
                />
                <Text
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="500"
                  noOfLines={1}
                >
                  {event.location}
                </Text>
              </HStack>

              {event.capacity && (
                <HStack spacing={3} align="center">
                  <Icon as={FaUsers} color="gray.400" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                    {event.registered || 0}/{event.capacity} คน
                  </Text>
                </HStack>
              )}
            </VStack>

            <Button
              colorScheme={colorScheme}
              size="lg"
              w="full"
              rightIcon={<FaArrowRight />}
              mt={4}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              สมัครเข้าร่วม
            </Button>
          </VStack>
        </CardBody>
      </Card>
    );
  }

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
            bg={`${colorScheme}.500`}
            color="white"
            p={3}
            borderRadius="xl"
            minW="70px"
            textAlign="center"
          >
            <Text fontSize="xs" opacity={0.8}>
              {weekday}
            </Text>
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
                colorScheme={colorScheme}
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

              <HStack spacing={2} align="center">
                <Icon
                  as={event.isOnline ? FaVideo : FaMapMarkerAlt}
                  color="gray.400"
                  boxSize={3}
                />
                <Text fontSize="xs" color="gray.500" noOfLines={1}>
                  {event.location}
                </Text>
              </HStack>
            </VStack>

            <Button
              size="sm"
              colorScheme={colorScheme}
              variant="ghost"
              rightIcon={<FaArrowRight />}
              fontWeight="600"
              alignSelf="flex-start"
              _hover={{
                bg: `${colorScheme}.50`,
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

const Events = () => {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("upcoming");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock events data - in real app, this would fetch from Notion API
      const mockEvents = [
        {
          id: 1,
          title: "Workshop: การใช้เทคโนโลจี AI เพื่อแก้ปัญหาชุมชน",
          description:
            "เรียนรู้วิธีการประยุกต์ใช้ปัญญาประดิษฐ์เพื่อพัฒนาโซลูชันสำหรับชุมชนท้องถิ่น พร้อมกิจกรรมปฏิบัติการจริง",
          type: "workshop",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          time: "13:00 - 17:00 น.",
          location: "ห้องประชุม PI Building ชั้น 5",
          isOnline: false,
          capacity: 30,
          registered: 18,
          isFeatured: true,
        },
        {
          id: 2,
          title: "สัมมนา: นวัตกรรมเพื่อการพัฒนาที่ยั่งยืน",
          description:
            "แลกเปลี่ยนประสบการณ์และแนวทางการพัฒนานวัตกรรมเพื่อสังคม ร่วมกับผู้เชี่ยวชาญจากหลากหลายสาขา",
          type: "seminar",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          time: "09:00 - 16:00 น.",
          location: "Online via Zoom",
          isOnline: true,
          capacity: 100,
          registered: 67,
          isFeatured: true,
        },
        {
          id: 3,
          title: "การฝึกอบรม: Data Science สำหรับนักวิจัย",
          description:
            "พัฒนาทักษะการวิเคราะห์ข้อมูลขั้นสูงสำหรับการวิจัยเชิงลึก ครอบคลุม Python, R, และ Machine Learning",
          type: "training",
          date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          time: "10:00 - 15:00 น.",
          location: "ห้องปฏิบัติการคอมพิวเตอร์ PI Lab",
          isOnline: false,
          capacity: 25,
          registered: 12,
          isFeatured: false,
        },
        {
          id: 4,
          title: "Conference: Future of Public Innovation",
          description:
            "การประชุมวิชาการระดับนานาชาติเรื่องอนาคตของนวัตกรรมภาครัฐ พบกับวิทยากรชั้นนำจากทั่วโลก",
          type: "conference",
          date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          time: "08:30 - 17:30 น.",
          location: "Royal Orchid Sheraton Hotel",
          isOnline: false,
          capacity: 200,
          registered: 156,
          isFeatured: true,
        },
        {
          id: 5,
          title: "Webinar: Digital Transformation ในภาครัฐ",
          description:
            "เรียนรู้แนวทางการปรับเปลี่ยนองค์กรภาครัฐสู่ยุคดิจิทัล พร้อมเคสศึกษาจากประเทศต่างๆ",
          type: "webinar",
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          time: "14:00 - 16:00 น.",
          location: "Facebook Live",
          isOnline: true,
          capacity: 500,
          registered: 234,
          isFeatured: false,
        },
        {
          id: 6,
          title: "Workshop: UX/UI Design สำหรับ Gov Tech",
          description:
            "ปรับปรุงประสบการณ์ผู้ใช้ในบริการภาครัฐด้วยหลักการ Design Thinking",
          type: "workshop",
          date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
          time: "09:00 - 17:00 น.",
          location: "Design Lab PI Building",
          isOnline: false,
          capacity: 20,
          registered: 8,
          isFeatured: false,
        },
      ];

      setEvents(mockEvents);
      setFeaturedEvents(mockEvents.filter((event) => event.isFeatured));
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
      setFeaturedEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesStatus = selectedStatus === "upcoming"; // For now, all mock events are upcoming

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Box>
      <SEOHead 
        title="กิจกรรม"
        description="ติดตามและเข้าร่วมกิจกรรม workshop สัมมนา และงานประชุมต่างๆ จาก PI Thai PBS เพื่อการเรียนรู้และแลกเปลี่ยนความคิดเห็น"
        keywords="กิจกรรม, workshop, สัมมนา, การประชุม, PI events, Thai PBS, การเรียนรู้"
        url="/events"
      />
      
      {/* Hero Section */}
      <FloatingShapes variant="hero">
        <Box bg="white" py={{ base: 16, md: 20 }} position="relative">
          <Container maxW="7xl">
            <VStack spacing={8} textAlign="center">
              <Badge
                bg="primary.500"
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="md"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="600"
              >
                กิจกรรมและอีเวนต์
              </Badge>

              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
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

              <Text color="gray.600" fontSize="xl" maxW="3xl" lineHeight="1.8">
                เข้าร่วมกิจกรรมที่หลากหลาย เพื่อเรียนรู้ พัฒนาทักษะ
                และสร้างเครือข่ายกับผู้คนที่มีความสนใจเหมือนกัน
              </Text>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Featured Events */}
      <FloatingShapes variant="section">
        <Box bg="gray.50" py={20}>
          <Container maxW="7xl">
            <VStack spacing={12}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="600"
                  color="gray.800"
                >
                  กิจกรรม{" "}
                  <Text as="span" color="secondary.500">
                    แนะนำ
                  </Text>
                </Heading>
                <Text color="gray.600" fontSize="lg" maxW="2xl">
                  กิจกรรมพิเศษที่ไม่ควรพลาด
                </Text>
              </VStack>

              {loading ? (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height="400px" borderRadius="2xl" />
                  ))}
                </SimpleGrid>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  w="full"
                >
                  {featuredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="featured"
                    />
                  ))}
                </SimpleGrid>
              )}
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* All Events with Filters */}
      <Box bg="white" py={20}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="600"
                color="gray.800"
              >
                กิจกรรม{" "}
                <Text as="span" color="primary.500">
                  ทั้งหมด
                </Text>
              </Heading>
            </VStack>

            {/* Search and Filters */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              w="full"
              align={{ base: "stretch", md: "center" }}
              justify="space-between"
            >
              <HStack spacing={4} w="full" maxW="lg">
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FaSearch} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="ค้นหากิจกรรม..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="lg"
                  />
                </InputGroup>
              </HStack>

              <HStack spacing={4}>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  borderRadius="lg"
                  maxW="200px"
                >
                  <option value="all">ประเภททั้งหมด</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="conference">Conference</option>
                  <option value="training">Training</option>
                  <option value="webinar">Webinar</option>
                </Select>

                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  borderRadius="lg"
                  maxW="200px"
                >
                  <option value="upcoming">กำลังจะมาถึง</option>
                  <option value="ongoing">กำลังดำเนินการ</option>
                  <option value="past">ผ่านมาแล้ว</option>
                </Select>
              </HStack>
            </Flex>

            {/* Events Grid */}
            {loading ? (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} height="300px" borderRadius="2xl" />
                ))}
              </SimpleGrid>
            ) : (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </SimpleGrid>
            )}

            {filteredEvents.length === 0 && !loading && (
              <VStack spacing={4} py={12} textAlign="center">
                <Text fontSize="xl" color="gray.500">
                  ไม่พบกิจกรรมที่ตรงกับเงื่อนไขการค้นหา
                </Text>
                <Button
                  colorScheme="primary"
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                    setSelectedStatus("upcoming");
                  }}
                >
                  ล้างตัวกรอง
                </Button>
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Events;
