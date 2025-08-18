import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  HStack,
  VStack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa";
import CONFIG from "../config.js";

export default function Footer() {
  return (
    <Box
      bg="#287bbf"
      color="white"
      mt="auto"
      borderTop="3px solid"
      borderColor="#ffb200"
    >
      <Container as={Stack} maxW={"7xl"} py={10}>
        <Stack
          spacing={8}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          {/* Brand Section */}
          <VStack align="start" spacing={4} maxW="400px">
            <HStack spacing={4} align="center">
              <Image
                src="/logo/pi-text-logo.svg"
                alt="PI Website 2025"
                h="40px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s ease"
              />
              <Image
                src="/logo/thaipbs.png"
                alt="Thai PBS"
                h="40px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s ease"
              />
              <Image
                src="/logo/locals.png"
                alt="Locals"
                h="40px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s ease"
              />
            </HStack>
            <Text fontSize="sm" lineHeight="1.6">
              PI คือทีมใหม่ของสื่อสาธารณะอย่างไทยพีบีเอส
              และอยู่ภายใต้สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ
              โดยเป้าหมายของทีมคือการสร้างการมีส่วนร่วมที่ผ่านการไตร่ตรองของประชาชนในประเด็นสาธารณะ
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" spacing={3}>
            <Text fontWeight="600" color="#ffb200" fontSize="md">
              เมนูหลัก
            </Text>

            <ChakraLink
              as={Link}
              to="/about"
              color="white"
              _hover={{ color: "#ffb200" }}
              transition="all 0.3s ease"
            >
              แนวคิดเบื้องหลังการทำงาน
            </ChakraLink>

            <ChakraLink
              as={Link}
              to="/services"
              color="white"
              _hover={{ color: "#ffb200" }}
              transition="all 0.3s ease"
            >
              เราทำงานอะไรบ้าง{" "}
            </ChakraLink>
            <ChakraLink
              as={Link}
              to="/budget"
              color="white"
              _hover={{ color: "#ffb200" }}
              transition="all 0.3s ease"
            >
              งบประมาณ{" "}
            </ChakraLink>
          </VStack>

          {/* Features */}
          <VStack align="start" spacing={3}>
            <Text fontWeight="600" color="#ffb200" fontSize="md">
              แพลตฟอร์ม
            </Text>
            <ChakraLink
              href="https://pi-data-diary.vercel.app/"
              color="white"
              _hover={{ color: "#ffb200" }}
              transition="all 0.3s ease"
              isExternal
            >
              ไดอารี่ข้อมูลของทีม PI
            </ChakraLink>
          </VStack>

          {/* Contact & Social */}
          <VStack align="start" spacing={3}>
            <Text fontWeight="600" color="#ffb200" fontSize="md">
              ติดต่อเรา
            </Text>
            <Text fontSize="sm" color="white">
              {CONFIG.CONTACT.EMAIL}
            </Text>
            <HStack spacing={4}>
              <ChakraLink
                href={CONFIG.SOCIAL_MEDIA.FACEBOOK}
                isExternal
                color="white"
                _hover={{ color: "#ffb200" }}
                transition="all 0.3s ease"
              >
                <FaFacebook size="20px" />
              </ChakraLink>
              <ChakraLink
                href={CONFIG.SOCIAL_MEDIA.TWITTER}
                isExternal
                color="white"
                _hover={{ color: "#ffb200" }}
                transition="all 0.3s ease"
              >
                <FaTwitter size="20px" />
              </ChakraLink>
              <ChakraLink
                href={CONFIG.SOCIAL_MEDIA.YOUTUBE}
                isExternal
                color="white"
                _hover={{ color: "#ffb200" }}
                transition="all 0.3s ease"
              >
                <FaYoutube size="20px" />
              </ChakraLink>
              <ChakraLink
                href={`mailto:${CONFIG.CONTACT.EMAIL}`}
                color="white"
                _hover={{ color: "#ffb200" }}
                transition="all 0.3s ease"
              >
                <FaEnvelope size="20px" />
              </ChakraLink>
            </HStack>
          </VStack>
        </Stack>

        <Divider borderColor="rgba(255, 255, 255, 0.3)" />

        {/* Copyright */}
        <Stack
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
            © 2025 PI Website. All rights reserved.
          </Text>
          <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
            สร้างโดยทีม Public Intelligence - Thai PBS
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
