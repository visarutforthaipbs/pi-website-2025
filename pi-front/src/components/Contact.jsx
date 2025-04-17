import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Select,
  useToast,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation would go here

    // Show success toast
    toast({
      title: "ข้อความถูกส่งแล้ว",
      description: "เราจะติดต่อกลับโดยเร็วที่สุด ขอบคุณที่สนใจบริการของเรา",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });
  };

  return (
    <Box as="main" py={12} bg="gray.50">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={10}
        >
          <Badge
            colorScheme="yellow"
            fontSize="sm"
            px={3}
            py={1}
            mb={3}
            borderRadius="full"
          >
            ติดต่อกับทีมงาน
          </Badge>
          <MotionHeading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            mb={4}
          >
            ท่านสนใจร่วมงานกับเราอย่างไรบ้าง?
          </MotionHeading>
          <Text
            fontSize="lg"
            color="gray.600"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
          >
            เราพร้อมให้คำปรึกษาและร่วมงานกับท่าน
            ไม่ว่าจะเป็นโครงการขนาดเล็กหรือใหญ่
          </Text>
        </MotionBox>

        <Flex justify="center">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            width="100%"
            maxW="800px"
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="xl"
            boxShadow="lg"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">ชื่อ</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ชื่อ นามสกุล หรือ ชื่อองค์กร"
                    size="lg"
                    borderRadius="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "#fcb000",
                      boxShadow: "0 0 0 1px #fcb000",
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">อีเมล</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ระบุอีเมล์ของท่านเพื่อติดต่อกลับ"
                    size="lg"
                    borderRadius="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "#fcb000",
                      boxShadow: "0 0 0 1px #fcb000",
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="medium">เบอร์โทรศัพท์</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="ระบุเบอร์โทรของท่านสำหรับการติดต่อกลับ"
                    size="lg"
                    borderRadius="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "#fcb000",
                      boxShadow: "0 0 0 1px #fcb000",
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">ความสนใจ</FormLabel>
                  <Select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    placeholder="คุณต้องการให้เราช่วยด้านไหน?"
                    size="lg"
                    borderRadius="md"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: "#fcb000",
                      boxShadow: "0 0 0 1px #fcb000",
                    }}
                  >
                    <option value="project">
                      มีปัญหา ไอเดีย หรือโปรเจคที่สนใจอยากทำงานร่วมกับ PI
                    </option>
                    <option value="speaking">
                      อยากให้ PI เข้าร่วมการประชุมหรือพูดแลกเปลี่ยน
                    </option>
                    <option value="urgent">
                      อยากติดต่อด่วน เรื่องการร่วมงานหรือผลิตสื่อ
                    </option>
                    <option value="training">สนใจการจัดอบรมของ PI</option>
                    <option value="other">เรื่องอื่นๆ</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">ข้อความ</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="โปรดระบุรายละเอียดเพิ่มเติม"
                    size="lg"
                    borderRadius="md"
                    borderColor="gray.300"
                    rows={6}
                    _focus={{
                      borderColor: "#fcb000",
                      boxShadow: "0 0 0 1px #fcb000",
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="yellow"
                  size="lg"
                  px={8}
                  mt={4}
                  rightIcon={<FaPaperPlane />}
                  _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                  transition="all 0.2s"
                  alignSelf="flex-start"
                >
                  ส่งข้อความ
                </Button>
              </VStack>
            </form>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}

export default Contact;
