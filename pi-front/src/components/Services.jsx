import PropTypes from "prop-types";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Flex,
  Image,
  VStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaUsers, FaDatabase, FaLaptopCode } from "react-icons/fa";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// A reusable component for work process items
const WorkProcessCard = ({ icon, title, text }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <VStack
        spacing={4}
        p={8}
        h="100%"
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        border="1px"
        borderColor="gray.100"
        align="center"
        textAlign="center"
        _hover={{
          transform: "translateY(-10px)",
          boxShadow: "xl",
          borderColor: "yellow.300",
        }}
        transition="all 0.3s"
      >
        <Flex
          w={16}
          h={16}
          align="center"
          justify="center"
          rounded="full"
          bg="yellow.50"
          color="#fcb000"
          mb={2}
        >
          <Icon as={icon} boxSize={8} />
        </Flex>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text color="gray.600">{text}</Text>
      </VStack>
    </MotionBox>
  );
};

WorkProcessCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const Services = () => {
  const workProcesses = [
    {
      icon: FaUsers,
      title: "People",
      text: "เราทำงานกับคน ตั้งโจทย์ แก้ปัญหาร่วมกัน ด้วยกระบวนการปรึกษาหารือ",
    },
    {
      icon: FaDatabase,
      title: "Data",
      text: "เราทำงานผ่านข้อมูล รวบรวมข้อมูล วิเคราะห์เชื่อมโยงข้อมูล สร้างฐานข้อมูลเปิด",
    },
    {
      icon: FaLaptopCode,
      title: "Technology",
      text: "เราทำงานด้วยเทคโนโลยีการสื่อสาร เพื่อระดมสรรพกำลังของสังคม และวิทยาศาสตร์พลเมือง",
    },
  ];

  return (
    <Box as="main">
      {/* How We Work Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            gap={{ base: 10, lg: 16 }}
          >
            <MotionBox
              flex={1}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Stack spacing={6} maxW="600px">
                <Badge
                  colorScheme="yellow"
                  fontSize="sm"
                  px={3}
                  py={1}
                  w="fit-content"
                  borderRadius="full"
                >
                  How We Work
                </Badge>
                <MotionHeading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="bold"
                  color="gray.800"
                >
                  เรา
                  <Box as="span" color="#fcb000" display="inline">
                    ทำงาน
                  </Box>
                  อย่างไร
                </MotionHeading>
                <MotionText fontSize="lg" color="gray.600" lineHeight="tall">
                  เราคือ PI ทีมงานปัญญารวมหมู่
                  ขับเคลื่อนสังคมด้วยข้อมูลและการสื่อสารสาธารณะ ผ่านแพลตฟอร์ม
                  เครื่องมือ รวบรวม
                  และหาทางออกกับประเด็นสาธารณะด้วยแนวคิดปัญญารวมหมู่{" "}
                  <Box as="strong">Data-driven for Social Good</Box>
                </MotionText>
              </Stack>
            </MotionBox>
            <MotionBox
              flex={1}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
                maxW="500px"
                h={{ base: "300px", md: "400px" }}
                mx="auto"
              >
                <Image
                  src="images/about/about-section-1.jpeg"
                  alt="ทีมงานกำลังทำงานร่วมกัน"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  transition="transform 0.5s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Work Process Section */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={8} mb={16} textAlign="center">
            <Badge
              colorScheme="yellow"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              How we work
            </Badge>
            <MotionHeading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="gray.800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              เรา
              <Box as="span" color="#fcb000" display="inline">
                ทำงาน
              </Box>
              แบบไหน
            </MotionHeading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              PI มีกระบวนการทำงานหลัก 3 รูปแบบด้วยกัน
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            px={{ base: 4, md: 0 }}
          >
            {workProcesses.map((process) => (
              <WorkProcessCard
                key={process.title}
                icon={process.icon}
                title={process.title}
                text={process.text}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Our Services Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Badge
              colorScheme="yellow"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              Our Services
            </Badge>
            <MotionHeading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="gray.800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              เรา
              <Box as="span" color="#fcb000" display="inline">
                ทำอะไร
              </Box>
              บ้าง
            </MotionHeading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              ค้นพบบริการและโซลูชั่นที่เรานำเสนอซึ่งช่วยให้การเปลี่ยนแปลงสังคมเกิดขึ้นจริง
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
