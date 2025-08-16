import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Stack,
  Text,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

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
      const response = await fetch("/api/wordclouds");
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
      const response = await fetch("/api/wordclouds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputValue.trim(),
        }),
      });

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

  // Get word size based on value (popularity)
  const getWordSize = (value) => {
    if (!words.length) return { fontSize: "lg", weight: "500" };

    const maxValue = Math.max(...words.map((w) => w.value));
    const ratio = value / maxValue;

    if (ratio >= 0.8) return { fontSize: "4xl", weight: "900" };
    if (ratio >= 0.6) return { fontSize: "3xl", weight: "800" };
    if (ratio >= 0.4) return { fontSize: "2xl", weight: "700" };
    if (ratio >= 0.2) return { fontSize: "xl", weight: "600" };
    return { fontSize: "lg", weight: "500" };
  };

  // Get word color based on popularity
  const getWordColor = (value) => {
    if (!words.length) return "gray.600";

    const maxValue = Math.max(...words.map((w) => w.value));
    const ratio = value / maxValue;

    if (ratio >= 0.7) return "#287bbf"; // Primary blue for popular
    if (ratio >= 0.4) return "#ffb200"; // Orange for medium
    if (ratio >= 0.2) return "#4299e1"; // Light blue
    return "gray.600"; // Gray for least popular
  };

  // Generate better positions for words to spread across entire space
  const getWordPosition = (
    index,
    total,
    containerWidth = 700,
    containerHeight = 350
  ) => {
    // Limit the number of words displayed to prevent overcrowding
    const maxWords = Math.min(total, 15); // Show max 15 words at once
    if (index >= maxWords) return { x: 0, y: 0, display: false };

    // Calculate grid dimensions for better distribution
    const cols = Math.ceil(Math.sqrt(maxWords * 1.5)); // Make it slightly wider than square
    const rows = Math.ceil(maxWords / cols);

    // Calculate spacing to fill the entire container
    const cellWidth = containerWidth / cols;
    const cellHeight = containerHeight / rows;

    // Get grid position
    const col = index % cols;
    const row = Math.floor(index / cols);

    // Calculate base position (center of each cell)
    const baseX = (col + 0.5) * cellWidth - containerWidth / 2;
    const baseY = (row + 0.5) * cellHeight - containerHeight / 2;

    // Add randomness within each cell for organic feel
    const randomX = (Math.random() - 0.5) * cellWidth * 0.6; // 60% of cell width for randomness
    const randomY = (Math.random() - 0.5) * cellHeight * 0.6; // 60% of cell height for randomness

    const x = baseX + randomX;
    const y = baseY + randomY;

    return { x, y, display: true };
  };

  // Get top words by value for better display
  const getDisplayWords = () => {
    const sortedWords = [...words].sort((a, b) => b.value - a.value);
    return sortedWords.slice(0, 15); // Show only top 15 words
  };

  // Shuffle words for random cloud layout
  const shuffleWords = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

          {/* Word Cloud Container */}
          {words.length > 0 ? (
            <Box
              w="full"
              minH={{ base: "250px", md: "400px" }}
              position="relative"
              bg="gray.50"
              borderRadius="2xl"
              p={{ base: 6, md: 12 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Center container for better layout */}
              <Box
                position="relative"
                w="full"
                maxW="700px"
                h="350px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {getDisplayWords().map((wordData, index) => {
                  const wordStyle = getWordSize(wordData.value);
                  const wordColor = getWordColor(wordData.value);
                  const position = getWordPosition(
                    index,
                    getDisplayWords().length,
                    700,
                    350
                  );

                  // Don't render if position indicates not to display
                  if (!position.display) return null;

                  return (
                    <Box
                      key={`${wordData.text}-${index}`}
                      position="absolute"
                      transform={`translate(${position.x}px, ${position.y}px)`}
                      cursor="pointer"
                      _hover={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(1.1)`,
                        zIndex: 20,
                      }}
                      transition="all 0.4s ease"
                      zIndex={Math.floor(wordData.value / 3) + 1}
                    >
                      <Text
                        fontSize={wordStyle.fontSize}
                        fontWeight={wordStyle.weight}
                        color={wordColor}
                        textAlign="center"
                        lineHeight="1.2"
                        userSelect="none"
                        title={`${wordData.text} - ${wordData.value} เสียง`}
                        _hover={{
                          color: "#287bbf",
                        }}
                        whiteSpace="nowrap"
                      >
                        {wordData.text}
                      </Text>
                    </Box>
                  );
                })}
              </Box>

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
            >
              <VStack spacing={4} textAlign="center">
                <Text fontSize="lg" color="gray.500">
                  ยังไม่มีข้อมูล
                </Text>
                <Text fontSize="sm" color="gray.400">
                  เป็นคนแรกที่แบ่งปันความคิดเห็น!
                </Text>
              </VStack>
            </Box>
          )}

          {/* Input Form */}
          <Box w="full" pt={4}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <HStack
                    direction={{ base: "column", md: "row" }}
                    spacing={{ base: 3, md: 4 }}
                    w="full"
                    as={Stack}
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
                </FormControl>
              </VStack>
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
