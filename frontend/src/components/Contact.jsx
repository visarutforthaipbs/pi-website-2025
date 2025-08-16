import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import CONFIG from "../config.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.CONTACT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setAlert({
          status: "success",
          title: "ส่งข้อความสำเร็จ!",
          description: "ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setAlert({
        status: "error",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box py={20} bg={useColorModeValue("primary.25", "primary.950")}>
      <Container maxW={"7xl"}>
        <VStack spacing={10}>
          <Stack spacing={4} textAlign={"center"}>
            <Heading color={"primary.700"}>ติดต่อเรา</Heading>
            <Text color={"primary.600"} fontSize={"lg"}>
              มีคำถามหรือข้อเสนอแนะ? เราพร้อมรับฟังและช่วยเหลือคุณ
            </Text>
          </Stack>

          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={10}
            w={"full"}
          >
            {/* Contact Information */}
            <VStack align={"start"} spacing={6} flex={1}>
              <Heading size={"md"}>ข้อมูลการติดต่อ</Heading>

              <HStack>
                <Box color={"primary.500"}>
                  <FaEnvelope size={"20px"} />
                </Box>
                <VStack align={"start"} spacing={0}>
                  <Text fontWeight={"bold"}>อีเมล</Text>
                  <Text color={"gray.600"}>{CONFIG.CONTACT.EMAIL}</Text>
                </VStack>
              </HStack>

              <HStack>
                <Box color={"primary.500"}>
                  <FaPhone size={"20px"} />
                </Box>
                <VStack align={"start"} spacing={0}>
                  <Text fontWeight={"bold"}>โทรศัพท์</Text>
                  <Text color={"gray.600"}>{CONFIG.CONTACT.PHONE}</Text>
                </VStack>
              </HStack>

              <HStack>
                <Box color={"primary.500"}>
                  <FaMapMarkerAlt size={"20px"} />
                </Box>
                <VStack align={"start"} spacing={0}>
                  <Text fontWeight={"bold"}>ที่อยู่</Text>
                  <Text color={"gray.600"}>{CONFIG.CONTACT.ADDRESS}</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Contact Form */}
            <Box
              flex={1}
              bg={useColorModeValue("primary.50", "primary.900")}
              p={8}
              borderRadius={"lg"}
              boxShadow={"lg"}
            >
              {alert && (
                <Alert status={alert.status} mb={4} borderRadius={"md"}>
                  <AlertIcon />
                  <Box>
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </Box>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>ชื่อ</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ชื่อของคุณ"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>อีเมล</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="อีเมลของคุณ"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>หัวข้อ</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="หัวข้อของข้อความ"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>ข้อความ</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ข้อความที่ต้องการส่ง"
                      rows={6}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme={"primary"}
                    size={"lg"}
                    isLoading={isLoading}
                    loadingText="กำลังส่ง..."
                    w={"full"}
                  >
                    ส่งข้อความ
                  </Button>
                </VStack>
              </form>
            </Box>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
