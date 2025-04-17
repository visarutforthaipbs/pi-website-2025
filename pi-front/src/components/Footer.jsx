import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  Button,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

// Motion components
const MotionBox = motion(Box);

function Footer() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;

    // Here you would normally handle the subscription logic
    toast({
      title: "สมัครรับข้อมูลสำเร็จ",
      description: "ขอบคุณที่สนใจรับข่าวสารจากเรา",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setEmail("");
  };

  return (
    <MotionBox
      as="footer"
      bg="#1A202C"
      color="white"
      py={10}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={8}
        >
          <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
            <HStack spacing={4} align="center">
              <Image
                src="/images/logos/1.png"
                alt="Logo 1"
                h="40px"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              />
              <Image
                src="/images/logos/2.png"
                alt="Logo 2"
                h="40px"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              />
              <Image
                src="/images/logos/3.png"
                alt="Logo 3"
                h="40px"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              />
            </HStack>
            <Text
              fontSize="sm"
              color="gray.400"
              maxW="300px"
              textAlign={{ base: "center", md: "left" }}
              lineHeight="tall" // You can use values like "short", "base", "tall", or a specific unit like "1.5"
            >
              สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ ไทยพีบีเอส
              นำแนวคิดปัญญารวมหมู่ Collective Intelligence
              มาพัฒนาเครื่องมือเพื่อสร้างการมีส่วนร่วม ภายใต้โครงการ
              &quot;สื่อปัญญารวมหมู่เพื่อการเปลี่ยนแปลง&quot;
            </Text>
          </VStack>

          <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Text fontWeight="bold" mb={2}>
              เว็บไซต์
            </Text>
            <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
              <Link to="/about">
                <Text color="gray.400" _hover={{ color: "#fcb000" }}>
                  เกี่ยวกับเรา
                </Text>
              </Link>
              <Link to="/services">
                <Text color="gray.400" _hover={{ color: "#fcb000" }}>
                  งานที่เราทำ
                </Text>
              </Link>
              <Link to="/terms">
                <Text color="gray.400" _hover={{ color: "#fcb000" }}>
                  ข้อกำหนดการใช้งาน
                </Text>
              </Link>
              <Link to="/privacy">
                <Text color="gray.400" _hover={{ color: "#fcb000" }}>
                  นโยบายความเป็นส่วนตัว
                </Text>
              </Link>
            </VStack>
          </VStack>

          <VStack
            align={{ base: "center", md: "flex-start" }}
            spacing={6}
            minW="200px"
          >
            <Text fontWeight="bold" mb={2}>
              ติดตามเรา
            </Text>
            <HStack spacing={4}>
              <IconButton
                as="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                icon={<FaFacebookF />}
                size="md"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200", color: "#fcb000" }}
                borderRadius="full"
              />
              <IconButton
                as="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200", color: "#fcb000" }}
                borderRadius="full"
              />
              <IconButton
                as="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                icon={<FaInstagram />}
                size="md"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200", color: "#fcb000" }}
                borderRadius="full"
              />
              <IconButton
                as="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                icon={<FaYoutube />}
                size="md"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200", color: "#fcb000" }}
                borderRadius="full"
              />
            </HStack>

            <Box width="100%">
              <form onSubmit={handleSubscribe}>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    placeholder="อีเมลของคุณ"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    _hover={{ borderColor: "#fcb000" }}
                    _focus={{ borderColor: "#fcb000", boxShadow: "none" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      type="submit"
                      colorScheme="yellow"
                      borderRadius="sm"
                      _hover={{ transform: "translateX(2px)" }}
                    >
                      <FaArrowRight />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </form>
            </Box>
          </VStack>
        </Flex>

        <Divider my={8} borderColor="whiteAlpha.300" />

        <Flex
          justify="center"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap={2}
        >
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} Public Intelligence. All rights
            reserved.
          </Text>
        </Flex>
      </Container>
    </MotionBox>
  );
}

export default Footer;
