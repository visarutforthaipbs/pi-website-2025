import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import CONFIG from "../config.js";

const WordCloudInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Fetch existing words on component mount
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.WORD_CLOUD}`
      );
      if (response.ok) {
        const data = await response.json();
        // Transform the Strapi-like structure to simple format
        const transformedWords = data.data.map((item) => ({
          id: item.id,
          text: item.attributes.text,
          value: item.attributes.value,
          createdAt: item.attributes.createdAt,
          updatedAt: item.attributes.updatedAt,
        }));
        setWords(transformedWords);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      toast({
        title: "กรุณากรอกข้อมูล",
        description: "กรุณาใส่ประเด็นที่คุณต้องการให้ PI ทำงาน",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.WORD_CLOUD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputValue.trim(),
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "เสร็จสิ้น! 🎉",
          description: "ความคิดเห็นของคุณถูกเพิ่มเข้าไปแล้ว",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setInputValue("");
        fetchWords(); // Refresh the words
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting word:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Get word size based on value (popularity) - Smaller sizes to prevent overlap
  const getWordSize = (value) => {
    if (!words.length) return { fontSize: "md", weight: "500" };

    const maxValue = Math.max(...words.map((w) => w.value));
    const ratio = value / maxValue;

    if (ratio >= 0.8) return { fontSize: "2xl", weight: "700" };
    if (ratio >= 0.6) return { fontSize: "xl", weight: "600" };
    if (ratio >= 0.4) return { fontSize: "lg", weight: "500" };
    if (ratio >= 0.2) return { fontSize: "md", weight: "400" };
    return { fontSize: "sm", weight: "400" };
  };

  // Get word color based on popularity
  const getWordColor = (value) => {
    if (!words.length) return "#287bbf";

    const maxValue = Math.max(...words.map((w) => w.value));
    const ratio = value / maxValue;

    if (ratio >= 0.8) return "#287bbf"; // Blue
    if (ratio >= 0.6) return "#38A169"; // Green
    if (ratio >= 0.4) return "#FF8C00"; // Orange
    return "#718096"; // Gray
  };

  // Get top words by value for better display
  const getDisplayWords = () => {
    const sortedWords = [...words].sort((a, b) => b.value - a.value);
    return sortedWords.slice(0, 15); // Show only top 15 words
  };

  return (
    <Box w="full" maxW="4xl">
      {/* Combined Word Cloud and Input Box */}
      <Box
        bg="white"
        p={{ base: 4, md: 8 }}
        borderRadius="3xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.200"
        w="full"
        minH={{ base: "400px", md: "600px" }}
        position="relative"
        overflow="hidden"
      >
        <VStack spacing={{ base: 6, md: 8 }}>
          {/* Header */}
          <VStack spacing={2} textAlign="center">
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="700"
              color="#287bbf"
              lineHeight="1.2"
              px={{ base: 2, md: 0 }}
            >
              ประเด็นที่เราควรร่วมกันแก้ไข
            </Text>
            {words.length > 0 && (
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
                ขนาดของคำแสดงถึงความนิยม • รวม{" "}
                {words.reduce((sum, w) => sum + w.value, 0)} เสียง
              </Text>
            )}
          </VStack>

          {/* Word Cloud Container - Grid-based layout for guaranteed containment */}
          {words.length > 0 ? (
            <Box
              w="full"
              minH={{ base: "250px", md: "300px" }}
              bg="gray.50"
              borderRadius="2xl"
              p={{ base: 4, md: 6 }}
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              position="relative"
            >
              {/* Use Flex wrap for guaranteed containment */}
              <Flex
                wrap="wrap"
                justify="center"
                align="center"
                gap={3}
                h="full"
                maxH="280px"
                overflow="hidden"
                direction="row"
              >
                {getDisplayWords().map((wordData, index) => {
                  const wordStyle = getWordSize(wordData.value);
                  const wordColor = getWordColor(wordData.value);

                  return (
                    <Text
                      key={`${wordData.text}-${index}`}
                      fontSize={wordStyle.fontSize}
                      fontWeight={wordStyle.weight}
                      color={wordColor}
                      textAlign="center"
                      userSelect="none"
                      cursor="pointer"
                      px={3}
                      py={2}
                      borderRadius="lg"
                      transition="all 0.3s ease"
                      _hover={{
                        color: "#287bbf",
                        transform: "scale(1.05)",
                        bg: "white",
                        boxShadow: "md",
                      }}
                      whiteSpace="nowrap"
                      title={`${wordData.text} - ${wordData.value} เสียง`}
                      bg="rgba(255,255,255,0.3)"
                      backdropFilter="blur(10px)"
                    >
                      {wordData.text}
                    </Text>
                  );
                })}
              </Flex>

              {/* Show indicator if there are more words */}
              {words.length > 15 && (
                <Box
                  position="absolute"
                  bottom={4}
                  right={4}
                  bg="rgba(40, 123, 191, 0.1)"
                  color="#287bbf"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  +{words.length - 15} คำเพิ่มเติม
                </Box>
              )}
            </Box>
          ) : (
            <Box
              w="full"
              minH="200px"
              bg="gray.50"
              borderRadius="2xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={8}
            >
              <Text color="gray.500" fontSize="lg" textAlign="center">
                ยังไม่มีประเด็นในระบบ <br />
                เป็นคนแรกที่เพิ่มประเด็นเลย!
              </Text>
            </Box>
          )}

          {/* Input Form */}
          <Box w="full" maxW="2xl">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <VStack spacing={4}>
                  <HStack
                    spacing={4}
                    w="full"
                    direction={{ base: "column", md: "row" }}
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="เช่น การศึกษา, สิ่งแวดล้อม, เศรษฐกิจ..."
                      size="lg"
                      borderRadius="xl"
                      borderColor="gray.300"
                      _focus={{
                        borderColor: "#287bbf",
                        boxShadow: "0 0 0 1px #287bbf",
                      }}
                      flex={{ base: "none", md: 1 }}
                    />
                    <Button
                      type="submit"
                      bg="#ffb200"
                      color="white"
                      size="lg"
                      px={6}
                      borderRadius="xl"
                      leftIcon={<FaPlus />}
                      isLoading={loading}
                      loadingText="กำลังส่ง..."
                      w={{ base: "full", md: "auto" }}
                      _hover={{
                        bg: "#e5a000",
                        transform: "translateY(-2px)",
                      }}
                      transition="all 0.3s ease"
                    >
                      เพิ่ม
                    </Button>
                  </HStack>
                </VStack>
              </FormControl>
            </form>
          </Box>

          {/* Stats */}
          {words.length > 0 && (
            <HStack spacing={8} textAlign="center" pt={4}>
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="#287bbf">
                  {words.length}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  ประเด็น
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="#ffb200">
                  {words.reduce((sum, w) => sum + w.value, 0)}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  เสียงทั้งหมด
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="#4299e1">
                  {words.length > 0
                    ? Math.max(...words.map((w) => w.value))
                    : 0}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  เสียงสูงสุด
                </Text>
              </VStack>
            </HStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default WordCloudInput;
