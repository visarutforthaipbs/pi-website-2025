import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Button,
  Flex,
  List,
  ListItem,
  ListIcon,
  Divider,
  Link,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaCog,
  FaProjectDiagram,
  FaServer,
  FaSearch,
  FaPoll,
  FaUsers,
  FaDatabase,
  FaChartLine,
  FaClock,
  FaInfinity,
  FaExternalLinkAlt,
  FaTools,
  FaNewspaper,
} from "react-icons/fa";
import FloatingShapes from "./FloatingShapes";

const ServiceCard = ({ icon, title, description, features, color }) => {
  return (
    <Card
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.100"
      h="full"
    >
      <CardHeader pb={2}>
        <VStack spacing={4}>
          <Box
            w={16}
            h={16}
            bg={`${color}.500`}
            borderRadius="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="2xl"
          >
            <Icon as={icon} w={8} h={8} />
          </Box>
          <Heading
            size="lg"
            color="gray.800"
            textAlign="center"
            fontWeight="600"
          >
            {title}
          </Heading>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={4} align="start">
          <Text
            color="gray.600"
            fontSize="md"
            lineHeight="1.6"
            textAlign="center"
          >
            {description}
          </Text>
          <Divider />
          <VStack spacing={3} align="start" w="full">
            {features.map((feature, index) => (
              <HStack key={index} spacing={3} align="start">
                <Icon
                  as={FaCheckCircle}
                  color={`${color}.500`}
                  mt={0.5}
                  flexShrink={0}
                />
                <Text fontSize="sm" color="gray.700" lineHeight="1.5">
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ProjectTypeCard = ({ title, description, icon, color }) => {
  return (
    <Card
      bg="gray.50"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        bg: "white",
        borderColor: `${color}.200`,
        transform: "translateY(-2px)",
      }}
      transition="all 0.3s ease"
    >
      <CardBody p={6}>
        <HStack spacing={4} align="start">
          <Box
            w={10}
            h={10}
            bg={`${color}.500`}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            flexShrink={0}
          >
            <Icon as={icon} w={5} h={5} />
          </Box>
          <VStack spacing={2} align="start" flex={1}>
            <Heading size="sm" color="gray.800" fontWeight="600">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.600" lineHeight="1.5">
              {description}
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

const PlatformCard = ({ title, description, url, isExternal = true }) => {
  return (
    <Card
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        boxShadow: "lg",
        borderColor: "primary.300",
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s ease"
      cursor="pointer"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="start">
          <HStack spacing={2} w="full" justify="space-between">
            <Heading size="md" color="gray.800" fontWeight="600">
              {title}
            </Heading>
            {isExternal && (
              <Icon as={FaExternalLinkAlt} color="gray.400" w={4} h={4} />
            )}
          </HStack>
          <Text fontSize="sm" color="gray.600" lineHeight="1.6">
            {description}
          </Text>
          {url && (
            <Link
              href={url}
              isExternal={isExternal}
              color="primary.500"
              fontSize="sm"
              fontWeight="500"
              _hover={{ color: "primary.600", textDecoration: "underline" }}
            >
              {url}
            </Link>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default function Services() {
  return (
    <Box>
      {/* Hero Section */}
      <FloatingShapes variant="hero">
        <Box bg="white" py={24} position="relative">
          <Container maxW="7xl">
            <VStack spacing={8} textAlign="center">
              <Badge
                bg="primary.500"
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="lg"
                fontWeight="600"
              >
                PI Services
              </Badge>
              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="300"
                color="gray.800"
                lineHeight="1.1"
              >
                PI{" "}
                <Text as="span" color="primary.500" fontWeight="700">
                  ทำงาน
                </Text>
                อะไรบ้าง?
              </Heading>
              <Text
                color="gray.600"
                fontSize={{ base: "lg", md: "xl" }}
                maxW="4xl"
                lineHeight="1.8"
              >
                การทำงานของ PI ในปัจจุบันสามารถแบ่งออกได้เป็น 3 หมวดใหญ่ๆ
                ตามเป้าหมายของงานแต่ละประเภท ประกอบไปด้วย Service, Projects, และ
                Platform
              </Text>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Service Section */}
      <FloatingShapes variant="section">
        <Box bg="gray.50" py={20}>
          <Container maxW="7xl">
            <VStack spacing={16}>
              <VStack spacing={6} textAlign="center">
                <Badge
                  bg="primary.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  Service
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="300"
                  color="gray.800"
                >
                  PI{" "}
                  <Text as="span" color="primary.500" fontWeight="700">
                    Service
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="lg"
                  maxW="3xl"
                  lineHeight="1.7"
                >
                  งานบริการภายในองค์กรของ PI โดยในงานประเภทนี้มี 2 ประเภทหลัก
                  ที่ช่วยสร้างฐานข้อมูลและความเข้าใจเชิงลึกสำหรับการทำงานต่อไป
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
                <ServiceCard
                  icon={FaSearch}
                  title="Fact and Figures"
                  description="การค้นหาข้อมูลและวิเคราะห์ insight เพื่อสร้างความเข้าใจที่ลึกซึ้งในประเด็นต่างๆ"
                  features={[
                    "หาข้อมูลจากแหล่งข้อมูลที่เชื่อถือได้",
                    "วิเคราะห์ข้อมูลเชิงลึก (insight) อย่างเป็นระบบ",
                    "สร้างฐานข้อมูลสำหรับการทำงานต่อไป",
                    "นำเสนอข้อมูลในรูปแบบที่เข้าใจง่าย",
                  ]}
                  color="primary"
                />

                <ServiceCard
                  icon={FaPoll}
                  title="Public Opinion Survey"
                  description="การรวบรวมและวิเคราะห์ความเห็นของประชาชนในประเด็นสำคัญต่างๆ"
                  features={[
                    "รวบรวมความเห็นของประชาชนอย่างเป็นระบบ",
                    "วิเคราะห์ความเห็นสาธารณะที่หลากหลาย",
                    "ใช้วิธีการสำรวจที่เหมาะสมกับกลุ่มเป้าหมาย",
                    "สรุปผลและนำเสนอในรูปแบบที่ชัดเจน",
                  ]}
                  color="secondary"
                />
              </SimpleGrid>

              <Box
                bg="primary.50"
                border="1px solid"
                borderColor="primary.200"
                borderRadius="xl"
                p={6}
                w="full"
              >
                <VStack spacing={4}>
                  <HStack spacing={3}>
                    <Icon as={FaChartLine} color="primary.500" w={6} h={6} />
                    <Heading size="md" color="primary.800" fontWeight="600">
                      การนำข้อมูลไปใช้ต่อ
                    </Heading>
                  </HStack>
                  <Text
                    color="primary.700"
                    fontSize="md"
                    textAlign="center"
                    lineHeight="1.6"
                  >
                    ข้อมูลที่ได้จากการทำ PI Service ทั้ง data source และ public
                    opinion จะถูกนำเอาไปเผยแพร่ต่อใน CI platform
                    และสามารถใช้ต่อยอดเป็นฐานในการทำ CI project
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Projects Section */}
      <FloatingShapes variant="section">
        <Box bg="white" py={20}>
          <Container maxW="7xl">
            <VStack spacing={16}>
              <VStack spacing={6} textAlign="center">
                <Badge
                  bg="secondary.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  Projects
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="300"
                  color="gray.800"
                >
                  PI{" "}
                  <Text as="span" color="secondary.500" fontWeight="700">
                    Project
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="lg"
                  maxW="3xl"
                  lineHeight="1.7"
                >
                  โครงการที่ทาง PI ใช้ในการขับเคลื่อนประเด็นสาธารณะ
                  ผ่านกระบวนการทำให้ข้อมูลเข้าถึงได้ง่ายและสร้างการมีส่วนร่วม
                </Text>
              </VStack>

              {/* Project Process */}
              <Box w="full">
                <Heading
                  size="lg"
                  color="gray.800"
                  mb={6}
                  textAlign="center"
                  fontWeight="600"
                >
                  ลักษณะเฉพาะของ PI Project
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Card
                    bg="primary.50"
                    border="1px solid"
                    borderColor="primary.200"
                    borderRadius="xl"
                  >
                    <CardBody p={6} textAlign="center">
                      <VStack spacing={4}>
                        <Box
                          w={12}
                          h={12}
                          bg="primary.500"
                          borderRadius="xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                        >
                          <Text fontWeight="bold" fontSize="lg">
                            1
                          </Text>
                        </Box>
                        <VStack spacing={2}>
                          <Heading
                            size="sm"
                            color="primary.800"
                            fontWeight="600"
                          >
                            Personalized Data
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="primary.700"
                            lineHeight="1.5"
                          >
                            การทำให้ข้อมูลสาธารณะเข้าถึงได้ง่าย ผ่านทั้งการ
                            personalize หรือการนำเสนอ insight
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card
                    bg="secondary.50"
                    border="1px solid"
                    borderColor="secondary.200"
                    borderRadius="xl"
                  >
                    <CardBody p={6} textAlign="center">
                      <VStack spacing={4}>
                        <Box
                          w={12}
                          h={12}
                          bg="secondary.500"
                          borderRadius="xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                        >
                          <Text fontWeight="bold" fontSize="lg">
                            2
                          </Text>
                        </Box>
                        <VStack spacing={2}>
                          <Heading
                            size="sm"
                            color="secondary.800"
                            fontWeight="600"
                          >
                            Deliberated Opinion
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="secondary.700"
                            lineHeight="1.5"
                          >
                            ผู้คนสามารถ deliberate
                            ความเห็นหรือความต้องการของตัวเอง ผ่านเครื่องมือ
                            survey ต่างๆ
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card
                    bg="accent.50"
                    border="1px solid"
                    borderColor="accent.200"
                    borderRadius="xl"
                  >
                    <CardBody p={6} textAlign="center">
                      <VStack spacing={4}>
                        <Box
                          w={12}
                          h={12}
                          bg="accent.500"
                          borderRadius="xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                        >
                          <Text fontWeight="bold" fontSize="lg">
                            3
                          </Text>
                        </Box>
                        <VStack spacing={2}>
                          <Heading
                            size="sm"
                            color="accent.800"
                            fontWeight="600"
                          >
                            Data Diary
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="accent.700"
                            lineHeight="1.5"
                          >
                            นำ deliberated need/public opinion ไปเผยแพร่ต่อใน PI
                            platform ในหมวด public opinion
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </Box>

              {/* Project Types */}
              <VStack spacing={8} w="full">
                <Heading
                  size="lg"
                  color="gray.800"
                  textAlign="center"
                  fontWeight="600"
                >
                  ประเภทงานใน PI Project
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                  <ProjectTypeCard
                    icon={FaClock}
                    title="โปรเจ็กต์มีกรอบเวลาชัดเจน"
                    description="โปรเจ็กต์ที่มีเป้าหมายและกำหนดเวลาการดำเนินงานที่ชัดเจน มีจุดเริ่มต้นและจุดสิ้นสุดที่กำหนดไว้"
                    color="primary"
                  />
                  <ProjectTypeCard
                    icon={FaInfinity}
                    title="Knowledge Hub"
                    description="ไม่มีกรอบเวลาชัดเจน เป็นการเติมเนื้อหาไปเรื่อยๆ เพื่อสร้างคลังความรู้ที่ครอบคลุมและอัปเดตอย่างต่อเนื่อง"
                    color="secondary"
                  />
                </SimpleGrid>
              </VStack>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Platform Section */}
      <FloatingShapes variant="section">
        <Box bg="gray.50" py={20}>
          <Container maxW="7xl">
            <VStack spacing={16}>
              <VStack spacing={6} textAlign="center">
                <Badge
                  bg="accent.500"
                  color="white"
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  Platform
                </Badge>
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="300"
                  color="gray.800"
                >
                  PI{" "}
                  <Text as="span" color="accent.500" fontWeight="700">
                    Platform
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="lg"
                  maxW="3xl"
                  lineHeight="1.7"
                >
                  แพลตฟอร์มหรือเครื่องมือที่ช่วยให้สื่อท้องถิ่นและภาคประชาชน
                  สามารถทำ PI service ได้ทั้งการสำรวจความคิดเห็นสาธารณะ
                  และการเข้าถึงข้อมูลที่ผ่านการจัดการแล้ว
                </Text>
              </VStack>

              <Box
                bg="accent.50"
                border="1px solid"
                borderColor="accent.200"
                borderRadius="xl"
                p={6}
                w="full"
              >
                <VStack spacing={4}>
                  <HStack spacing={3}>
                    <Icon as={FaTools} color="accent.500" w={6} h={6} />
                    <Heading size="md" color="accent.800" fontWeight="600">
                      ลักษณะเฉพาะ
                    </Heading>
                  </HStack>
                  <HStack spacing={3} align="start">
                    <Icon
                      as={FaCheckCircle}
                      color="accent.500"
                      mt={0.5}
                      flexShrink={0}
                    />
                    <Text color="accent.700" fontSize="md" lineHeight="1.6">
                      เป็นเครื่องมือสำหรับสื่อท้องถิ่นในการเข้าถึงข้อมูลและการทำงานด้านข้อมูลสาธารณะ
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              <VStack spacing={8} w="full">
                <Heading
                  size="lg"
                  color="gray.800"
                  textAlign="center"
                  fontWeight="600"
                >
                  ประเภทงานใน PI Platform
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
                  <PlatformCard
                    title="Public Data Service Platform"
                    description="แพลตฟอร์มสำหรับเข้าถึงข้อมูลสาธารณะที่ผ่านการจัดการและวิเคราะห์แล้ว เพื่อให้ง่ายต่อการใช้งาน"
                    url="https://pi-data-diary.vercel.app/"
                  />
                  <PlatformCard
                    title="PI Platform"
                    description="แพลตฟอร์มหลักของ PI ที่รวบรวมเครื่องมือและข้อมูลต่างๆ สำหรับการทำงานด้านข้อมูลสาธารณะ"
                    url=""
                    isExternal={false}
                  />
                  <PlatformCard
                    title="Your Priority"
                    description="เครื่องมือสำหรับการรวบรวมและวิเคราะห์ความคิดเห็นและความต้องการของประชาชนในประเด็นต่างๆ"
                    url=""
                    isExternal={false}
                  />
                </SimpleGrid>
              </VStack>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>

      {/* Summary Section */}
      <FloatingShapes variant="section">
        <Box bg="white" py={20}>
          <Container maxW="7xl">
            <VStack spacing={12}>
              <VStack spacing={6} textAlign="center">
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="300"
                  color="gray.800"
                >
                  ความเชื่อมโยง{" "}
                  <Text as="span" color="primary.500" fontWeight="700">
                    ของการทำงาน
                  </Text>
                </Heading>
                <Text
                  color="gray.600"
                  fontSize="lg"
                  maxW="4xl"
                  lineHeight="1.8"
                >
                  การทำงานทั้ง 3 หมวดนี้เชื่อมโยงกันเป็นระบบเดียว โดย Service
                  สร้างฐานข้อมูล Projects นำข้อมูลไปใช้สร้างการมีส่วนร่วม และ
                  Platform ช่วยให้การทำงานเข้าถึงได้ง่ายขึ้น
                  สำหรับทุกภาคส่วนในสังคม
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                <Card
                  bg="primary.50"
                  border="1px solid"
                  borderColor="primary.200"
                  borderRadius="xl"
                >
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Icon as={FaCog} color="primary.500" w={10} h={10} />
                      <VStack spacing={2}>
                        <Heading size="md" color="primary.800" fontWeight="600">
                          Service
                        </Heading>
                        <Text
                          fontSize="sm"
                          color="primary.700"
                          lineHeight="1.5"
                        >
                          สร้างฐานข้อมูลและความเข้าใจ
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>

                <Card
                  bg="secondary.50"
                  border="1px solid"
                  borderColor="secondary.200"
                  borderRadius="xl"
                >
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Icon
                        as={FaProjectDiagram}
                        color="secondary.500"
                        w={10}
                        h={10}
                      />
                      <VStack spacing={2}>
                        <Heading
                          size="md"
                          color="secondary.800"
                          fontWeight="600"
                        >
                          Projects
                        </Heading>
                        <Text
                          fontSize="sm"
                          color="secondary.700"
                          lineHeight="1.5"
                        >
                          ขับเคลื่อนการมีส่วนร่วม
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>

                <Card
                  bg="accent.50"
                  border="1px solid"
                  borderColor="accent.200"
                  borderRadius="xl"
                >
                  <CardBody p={6} textAlign="center">
                    <VStack spacing={4}>
                      <Icon as={FaTools} color="accent.500" w={10} h={10} />
                      <VStack spacing={2}>
                        <Heading size="md" color="accent.800" fontWeight="600">
                          Platform
                        </Heading>
                        <Text fontSize="sm" color="accent.700" lineHeight="1.5">
                          เปิดการเข้าถึงสำหรับทุกคน
                        </Text>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </FloatingShapes>
    </Box>
  );
}
