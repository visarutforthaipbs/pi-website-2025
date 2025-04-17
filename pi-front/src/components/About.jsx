import { useEffect } from "react";
import "../assets/css/components/About.css";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Stack,
  Badge,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionImage = motion(Image);

// About Project Section Component
function AboutProjectSection() {
  return (
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                เกี่ยวกับโครงการ
              </Badge>
              <MotionHeading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="gray.800"
              >
                โครงการห้องทดลอง{" "}
                <Box as="span" color="#fcb000" display="inline">
                  ปัญญารวมหมู่
                </Box>
              </MotionHeading>
              <MotionText fontSize="lg" color="gray.600" lineHeight="tall">
                โครงการห้องทดลองปัญญารวมหมู่ Public Intelligence เริ่มต้นจาก
                สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ ไทยพีบีเอส
                ในช่วงของการเข้าสู่ปีที่ 15 ของสื่อสาธารณะ
              </MotionText>
              <MotionText fontSize="lg" color="gray.600" lineHeight="tall">
                ไทยพีบีเอส โดยสำนักเครือข่ายและการมีส่วนร่วมสาธารณะ
                นำแนวคิดปัญญารวมหมู่ Collective Intelligence
                มาปรับใช้ในการสื่อสารสาธารณะ...
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
                src="/images/about/about-section-1.jpeg"
                alt="About Project"
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
  );
}

// Collective Intelligence Section Component
function CollectiveSection() {
  return (
    <Box py={20} bg="white">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", lg: "row-reverse" }}
          align="center"
          justify="space-between"
          gap={{ base: 10, lg: 16 }}
        >
          <MotionBox
            flex={1}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                แนวคิด
              </Badge>
              <MotionHeading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="gray.800"
              >
                ทำความรู้จักแนวคิด{" "}
                <Box as="span" color="#fcb000" display="inline">
                  Collective Intelligence
                </Box>
              </MotionHeading>
              <MotionText fontSize="lg" color="gray.600" lineHeight="tall">
                "becoming smarter together" แนวคิดนี้จะเกิดขึ้นได้เมื่อกลุ่มคน
                (people) ที่หลากหลายมาร่วมกันทำ ใช้เครื่องมือหรือเทคโนโลยี...
              </MotionText>
            </Stack>
          </MotionBox>
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -30 }}
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
                src="/images/about/aboutimage-2.png"
                alt="Collective Intelligence"
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
  );
}

// Main About Page Component
function About() {
  return (
    <main>
      <AboutProjectSection />
      <CollectiveSection />
    </main>
  );
}

export default About;
