import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getAllWords, addOrUpdateWord } from "../services/wordService.js";
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Badge,
  Icon,
  useToast,
  Input,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Group } from "@visx/group";
import { Text as VisxText } from "@visx/text";
import { Wordcloud as VisxWordcloud } from "@visx/wordcloud";
import { Link } from "react-router-dom";
// Importing icons from react-icons for a more modern feel
import {
  FaDatabase,
  FaUsers,
  FaLightbulb,
  FaAngleDown,
  FaPaperPlane,
} from "react-icons/fa";
import "../assets/css/components/Home.css";
import { ParentSize } from "@visx/responsive";
import { scaleLog } from "d3-scale";

// Animated components with framer-motion
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

// Word Cloud Component
function CustomWordCloud({ words = [], onWordClick }) {
  if (words.length === 0) {
    return (
      <MotionBox
        position="relative"
        width="100%"
        height="400px"
        bgColor="rgba(255, 255, 255, 0.9)"
        borderRadius="2xl"
        boxShadow="lg"
        p={4}
        mb={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="xl" fontWeight="medium" color="gray.600" mb={4}>
          ยังไม่มีข้อมูล เป็นคนแรกที่แสดงความคิดเห็น!
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center" maxW="md">
          พิมพ์ประเด็นที่คุณห่วงใยในกล่องข้อความด้านล่าง เพื่อเริ่มต้นสร้างเมฆคำ
        </Text>
      </MotionBox>
    );
  }

  if (words.length < 3) {
    return (
      <MotionBox
        position="relative"
        width="100%"
        height="400px"
        bgColor="rgba(255, 255, 255, 0.9)"
        borderRadius="2xl"
        boxShadow="lg"
        p={4}
        mb={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={8} align="center">
          {words.map((word, index) => (
            <Badge
              key={index}
              fontSize={`${Math.max(16, word.value / 2)}px`}
              px={4}
              py={2}
              borderRadius="full"
              colorScheme="yellow"
              cursor="pointer"
              onClick={() => onWordClick(word)}
            >
              {word.text}
            </Badge>
          ))}
        </Stack>
        <Text
          fontSize="md"
          color="gray.500"
          textAlign="center"
          maxW="md"
          mt={6}
        >
          เพิ่มคำมากขึ้นเพื่อสร้างเมฆคำที่สมบูรณ์
        </Text>
      </MotionBox>
    );
  }

  const fontScale = scaleLog()
    .domain([
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ])
    .range([15, 80]);

  const getWordColor = () => {
    // Create a color palette that fits your theme
    const colors = ["#fcb000", "#1f2937", "#6f8ba4", "#e6a000", "#f8f9fa"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <MotionBox
      position="relative"
      width="100%"
      height="400px"
      bgColor="rgba(255, 255, 255, 0.9)"
      borderRadius="2xl"
      boxShadow="lg"
      p={4}
      mb={6}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParentSize>
        {({ width, height }) => (
          <VisxWordcloud
            width={width}
            height={height}
            words={words}
            fontSize={(w) => (w.value > 0 ? fontScale(w.value) : 0)}
            font="Impact"
            padding={2}
            spiral="rectangular"
            rotate={0}
            random={Math.random}
          >
            {(cloudWords) => (
              <Group>
                {cloudWords.map((w, i) => (
                  <VisxText
                    key={`word-${i}`}
                    fill={getWordColor()}
                    textAnchor="middle"
                    x={w.x}
                    y={w.y}
                    fontSize={w.size}
                    fontFamily="system-ui, sans-serif"
                    fontWeight="bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => onWordClick && onWordClick(w)}
                  >
                    {w.text}
                  </VisxText>
                ))}
              </Group>
            )}
          </VisxWordcloud>
        )}
      </ParentSize>
    </MotionBox>
  );
}

CustomWordCloud.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  onWordClick: PropTypes.func,
};

// Hero Section Component
function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch words from Strapi API or mock service
  const fetchWords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching words from API...");

      // Use wordService for all API calls
      const wordData = await getAllWords();
      console.log("Retrieved words:", wordData);
      setWords(wordData);
    } catch (err) {
      console.error("Error fetching words:", err);
      // Show detailed error for debugging
      setError(`Failed to load words: ${err.message}`);
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // Handle word click - increment the value by 5
  const handleWordClick = async (word) => {
    // Optimistic update
    const updatedWords = words.map((w) =>
      w.text === word.text ? { ...w, value: w.value + 5 } : w
    );
    setWords(updatedWords);

    try {
      // Use wordService to update the word
      await addOrUpdateWord(word.text, word.value + 5);

      // Show success toast
      toast({
        title: `Voted for "${word.text}"`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Fetch updated words
      setTimeout(() => fetchWords(), 500);
    } catch (err) {
      console.error("Error updating word:", err);

      // Show error toast but don't revert the UI (better UX while API is being set up)
      toast({
        title: "Failed to vote",
        description: "Your vote was recorded locally but couldn't be saved.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle new word submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      // Optimistic update
      const newWordObj = { text: inputValue.trim(), value: 10 };
      setWords([...words, newWordObj]);
      setInputValue("");

      try {
        // Use wordService to add the new word
        await addOrUpdateWord(newWordObj.text, newWordObj.value);

        // Show success toast
        toast({
          title: "Word added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Fetch updated words
        setTimeout(() => fetchWords(), 500);
      } catch (err) {
        console.error("Error adding new word:", err);

        // Show error toast but don't revert (better UX while API is being set up)
        toast({
          title: "Failed to add word",
          description: "Your word was added locally but couldn't be saved.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [inputValue, words, toast]
  );

  return (
    <Box
      className="hero"
      position="relative"
      backgroundPosition="center"
      backgroundSize="cover"
      overflow="hidden"
    >
      <Box
        className="hero-overlay"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      >
        <Flex
          className="hero-content"
          direction="column"
          alignItems="center"
          position="relative"
          zIndex={2}
          px={4}
        >
          <MotionHeading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="white"
            textAlign="center"
            mb={4}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box as="span" color="#fcb000" px={1}>
              ร่วมสร้างสรรค์เมืองแห่ง
            </Box>{" "}
            <Box
              as="span"
              className="highlight-secondary"
              color="#fcb000"
              px={1}
            >
              การมีส่วนร่วม
            </Box>
          </MotionHeading>

          <MotionBox
            width="100%"
            maxWidth="800px"
            mx="auto"
            my={6}
            p={{ base: 4, md: 8 }}
            borderRadius="2xl"
            bg="rgba(255, 255, 255, 0.95)"
            boxShadow="xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Heading
              as="h2"
              size="md"
              textAlign="center"
              mb={4}
              color="gray.800"
            >
              ปัญหาใดในสังคมที่คุณคิดว่าเราควรร่วมกันแก้ไข?
            </Heading>
            <Text textAlign="center" mb={6} color="gray.600">
              แสดงความคิดเห็นของคุณและดูว่าสิ่งใดที่ผู้คนให้ความสำคัญ
              (คลิกที่คำเพื่อโหวต)
            </Text>

            {error ? (
              <Box textAlign="center" color="red.500" my={4}>
                <Text fontWeight="medium" mb={2}>
                  {error.includes("Failed to load words")
                    ? "ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กำลังใช้ข้อมูลสำรอง"
                    : error}
                </Text>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  ml={2}
                  onClick={fetchWords}
                >
                  ลองใหม่
                </Button>
              </Box>
            ) : (
              <CustomWordCloud
                words={words.map((word) => ({
                  ...word,
                  onWordClick: () => handleWordClick(word),
                }))}
                onWordClick={handleWordClick}
              />
            )}

            <form onSubmit={handleSubmit}>
              <Flex
                direction={{ base: "column", sm: "row" }}
                align="stretch"
                gap={3}
              >
                <Input
                  placeholder="พิมพ์ประเด็นที่คุณห่วงใย"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  bgColor="white"
                  color="gray.800"
                  borderColor="gray.300"
                  borderRadius="lg"
                  size="lg"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    borderColor: "#fcb000",
                    boxShadow: "0 0 0 1px #fcb000",
                  }}
                />
                <Button
                  type="submit"
                  colorScheme="yellow"
                  rightIcon={<FaPaperPlane />}
                  size="lg"
                  borderRadius="lg"
                  px={6}
                  isLoading={isLoading}
                  loadingText="กำลังส่ง..."
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  ส่ง
                </Button>
              </Flex>
            </form>
          </MotionBox>

          <MotionButton
            as={Link}
            to="/about"
            colorScheme="yellow"
            size="lg"
            px={8}
            py={6}
            borderRadius="full"
            fontWeight="bold"
            rightIcon={<FaArrowRight />}
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.2s"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            เรียนรู้เพิ่มเติม
          </MotionButton>

          <MotionBox
            as="a"
            href="#about"
            aria-label="Scroll Down"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={12}
            opacity={0.8}
            _hover={{ opacity: 1 }}
            cursor="pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: [0, 10, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 1.5,
                repeatType: "loop",
              },
            }}
          >
            <Icon as={FaAngleDown} color="white" boxSize={8} />
          </MotionBox>
        </Flex>
      </Box>
    </Box>
  );
}

// About Section Component
function AboutSection() {
  return (
    <Box id="about" py={20} bg="gray.50">
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
                เกี่ยวกับเรา
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="gray.800"
              >
                เราคือใคร?
              </Heading>
              <Text fontSize="lg" color="gray.600" lineHeight="tall">
                ทีมออกแบบระบบ-ส่งเสริมการมีส่วนร่วมสาธารณะ ผ่านเครื่องมือ
                การเปิดพื้นที่
                สร้างสรรค์กิจกรรมภายใต้แนวคิดปัญญารวมหมู่ซึ่งดำเนินการโดยสื่อสาธารณะ
              </Text>
              <Button
                as={Link}
                to="/projects"
                colorScheme="yellow"
                variant="outline"
                size="lg"
                rightIcon={<FaArrowRight />}
                borderRadius="full"
                _hover={{
                  bg: "#fcb000",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
              >
                ดูผลงานของเรา
              </Button>
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
              <Box
                as="img"
                src="/images/section1-img1.jpeg"
                alt="About Us"
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

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: FaDatabase,
      title: "พัฒนาแพลตฟอร์มและเครื่องมือ",
      description: "สร้างเครื่องมือเสริมการมีส่วนร่วมของพลเมือง",
    },
    {
      icon: FaUsers,
      title: "สร้างความร่วมมือกับภาคส่วนต่างๆ",
      description: "ร่วมมือกับรัฐ เอกชน และประชาสังคม",
    },
    {
      icon: FaLightbulb,
      title: "ออกแบบกิจกรรมและกระบวนการเรียนรู้",
      description: "พัฒนาทักษะการมีส่วนร่วมของพลเมือง",
    },
    {
      icon: FaUsers,
      title: "สร้างเครือข่ายพลเมืองผู้นำสังคมการเปลี่ยนแปลง",
      description: "สร้างเครือข่ายผู้นำการเปลี่ยนแปลง",
    },
  ];

  return (
    <Box py={20} bg="white">
      <Container maxW="container.xl">
        <Stack spacing={16} align="center">
          <Stack textAlign="center" spacing={3} maxW="800px">
            <Badge
              colorScheme="yellow"
              fontSize="sm"
              px={3}
              py={1}
              alignSelf="center"
              borderRadius="full"
            >
              แนวทางของเรา
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color="gray.800"
            >
              แนวทางการทำงานของเรา
            </Heading>
            <Text fontSize="lg" color="gray.600">
              วิธีการทำงานของเราเพื่อส่งเสริมการมีส่วนร่วมของประชาชน
            </Text>
          </Stack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={10}
            width="100%"
          >
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Stack
                  p={8}
                  height="100%"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="md"
                  border="1px"
                  borderColor="gray.100"
                  align="center"
                  textAlign="center"
                  spacing={5}
                  _hover={{
                    transform: "translateY(-5px)",
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
                    <Icon as={feature.icon} boxSize={8} />
                  </Flex>
                  <Heading as="h3" size="md">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600">{feature.description}</Text>
                </Stack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

// Main Home Component
function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
      </main>
    </>
  );
}

export default Home;
