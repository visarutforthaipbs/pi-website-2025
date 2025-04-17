import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Badge,
  VStack,
  Link,
  Button,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="xl"
        bg="white"
        h="100%"
        _hover={{
          transform: "translateY(-10px)",
          boxShadow: "2xl",
        }}
        transition="all 0.3s ease"
      >
        <Image
          src={project.image}
          alt={project.title}
          w="100%"
          h={{ base: "200px", md: "250px" }}
          objectFit="cover"
          transition="transform 0.5s"
          _hover={{ transform: "scale(1.05)" }}
        />

        <VStack p={6} align="start" spacing={3}>
          <Heading as="h3" size="md">
            {project.title}
          </Heading>

          <Text color="gray.600" noOfLines={2}>
            {project.description}
          </Text>

          {project.url && (
            <Link
              href={project.url}
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <Button
                rightIcon={<Icon as={FaExternalLinkAlt} />}
                colorScheme="yellow"
                size="sm"
                mt={2}
              >
                เยี่ยมชมเว็บไซต์
              </Button>
            </Link>
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

function Projects() {
  const projects = [
    {
      image: "images/project/meta-cover.jpg",
      title: "MyCEO.site",
      description:
        "ข้อมูลผู้สมัคและงบประมาณของ อบจ. เพื่อการเลือกตั้งอย่างเข้าใจ",
      url: "https://myceo.site/",
    },
    {
      image: "images/project/10k-what-to-do.jpg",
      title: "ถ้าได้เงิน 10,000 บาทในวอลเล็ต",
      description:
        "เว็บไซต์รวมรวมความเห็นของคนต่อการใช้เงิน 10,000 บาทในวอลเล็ต",
      url: "https://what-would-you-do.vercel.app/",
    },
    {
      image: "images/projects/project-3.jpg",
      title: "ระบบติดตามประเด็นสาธารณะ",
      description:
        "เครื่องมือสำหรับติดตามและวิเคราะห์ประเด็นสาธารณะที่กำลังเป็นที่สนใจในสังคม",
      url: "#",
    },
    {
      image: "images/projects/project-4.jpg",
      title: "แพลตฟอร์มรับฟังความคิดเห็น",
      description:
        "ช่องทางในการรวบรวมความคิดเห็นจากประชาชนเพื่อการพัฒนานโยบายที่ตอบสนองความต้องการของคนในสังคม",
      url: "#",
    },
    {
      image: "images/projects/project-5.jpg",
      title: "โครงการสร้างการมีส่วนร่วมชุมชน",
      description:
        "โครงการที่ส่งเสริมให้ชุมชนมีส่วนร่วมในการออกแบบนโยบายและแก้ไขปัญหาท้องถิ่น",
      url: "#",
    },
  ];

  return (
    <Box as="main" py={16}>
      <Container maxW="container.xl">
        <VStack spacing={8} mb={12} textAlign="center">
          <Badge
            colorScheme="yellow"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            ผลงานของเรา
          </Badge>
          <MotionHeading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ตัวอย่างผลงานบางส่วน
          </MotionHeading>
          <MotionText
            fontSize="lg"
            color="gray.600"
            maxW="2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ที่ทำเพื่อให้การมีส่วนร่วมเกิดความหมายใหม่ๆ
          </MotionText>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Projects;
