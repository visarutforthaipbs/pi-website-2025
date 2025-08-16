import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Icon,
  Divider,
  Tooltip,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaDownload,
  FaChartPie,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarAlt,
  FaFileAlt,
  FaEye,
  FaBalanceScale,
  FaArrowRight,
  FaChartBar,
} from "react-icons/fa";
import budgetService from "../services/budgetService";
import FloatingShapes from "./FloatingShapes";

const BudgetCard = ({ item }) => {
  return (
    <Card
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
        bg: "gray.50",
      }}
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.100"
      h="full"
    >
      <CardHeader pb={2}>
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="500"
              fontFamily="mono"
            >
              {item.id}
            </Text>
            <Badge
              colorScheme={budgetService.getCategoryColor(item.category)}
              size="sm"
              borderRadius="full"
              px={3}
              py={1}
            >
              <HStack spacing={1}>
                <Text fontSize="xs">
                  {budgetService.getCategoryIcon(item.category)}
                </Text>
                <Text fontSize="xs">{item.category}</Text>
              </HStack>
            </Badge>
          </VStack>
          <Icon
            as={FaArrowRight}
            color="gray.300"
            _hover={{ color: "#287bbf" }}
            transition="color 0.2s ease"
          />
        </HStack>
      </CardHeader>
      <CardBody pt={2}>
        <VStack align="start" spacing={3}>
          <Text fontSize="sm" lineHeight="tall" color="gray.700" noOfLines={3}>
            {item.description}
          </Text>

          <HStack justify="space-between" w="full" align="end">
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color="gray.500" fontWeight="500">
                จำนวนเงิน
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="#287bbf">
                {budgetService.formatCurrency(item.amount)}
              </Text>
            </VStack>
            <Tooltip label={`${budgetService.formatCurrency(item.amount)}`}>
              <Badge
                colorScheme="blue"
                variant="subtle"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
              >
                {budgetService.formatLargeNumber(item.amount)} บาท
              </Badge>
            </Tooltip>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const BudgetSummaryCards = ({ summary }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <Card
        bg="#287bbf"
        color="white"
        shadow="lg"
        borderRadius="2xl"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "xl",
        }}
        transition="all 0.3s ease"
      >
        <CardBody>
          <Stat>
            <StatLabel color="white" opacity="0.9" fontSize="sm">
              งบประมาณรวม
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold">
              {budgetService.formatLargeNumber(summary.totalBudget)} บาท
            </StatNumber>
            <StatHelpText color="white" opacity="0.8">
              <Icon as={FaMoneyBillWave} mr={1} />
              {budgetService.formatCurrency(summary.totalBudget)}
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>

      <Card
        bg="#ffb200"
        color="white"
        shadow="lg"
        borderRadius="2xl"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "xl",
        }}
        transition="all 0.3s ease"
      >
        <CardBody>
          <Stat>
            <StatLabel color="white" opacity="0.9" fontSize="sm">
              จำนวนรายการ
            </StatLabel>
            <StatNumber fontSize="2xl" fontWeight="bold">
              {summary.itemCount}
            </StatNumber>
            <StatHelpText color="white" opacity="0.8">
              <Icon as={FaFileAlt} mr={1} />
              รายการทั้งหมด
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>

      <Card
        bg="green.500"
        color="white"
        shadow="lg"
        borderRadius="2xl"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "xl",
        }}
        transition="all 0.3s ease"
      >
        <CardBody>
          <Stat>
            <StatLabel color="white" opacity="0.9" fontSize="sm">
              ค่าเฉลี่ย/รายการ
            </StatLabel>
            <StatNumber fontSize="xl" fontWeight="bold">
              {budgetService.formatLargeNumber(summary.averagePerItem)}
            </StatNumber>
            <StatHelpText color="white" opacity="0.8">
              <Icon as={FaChartPie} mr={1} />
              เฉลี่ยต่อรายการ
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>

      <Card
        bg="purple.500"
        color="white"
        shadow="lg"
        borderRadius="2xl"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "xl",
        }}
        transition="all 0.3s ease"
      >
        <CardBody>
          <Stat>
            <StatLabel color="white" opacity="0.9" fontSize="sm">
              ประเภทงบประมาณ
            </StatLabel>
            <StatNumber fontSize="xl" fontWeight="bold">
              {Object.keys(summary.categoryTotals).length}
            </StatNumber>
            <StatHelpText color="white" opacity="0.8">
              <Icon as={FaBalanceScale} mr={1} />
              ประเภททั้งหมด
            </StatHelpText>
          </Stat>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

const BudgetBreakdown = ({ summary }) => {
  return (
    <Card
      bg="white"
      shadow="lg"
      borderRadius="2xl"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
      transition="all 0.3s ease"
    >
      <CardHeader bg="#287bbf" color="white" borderTopRadius="2xl">
        <Heading size="md" display="flex" alignItems="center">
          <Icon as={FaChartBar} mr={2} />
          รายละเอียดงบประมาณแยกตามประเภท
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {Object.entries(summary.categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount], index) => {
              const percentage = ((amount / summary.totalBudget) * 100).toFixed(
                1
              );
              return (
                <Box
                  key={category}
                  p={4}
                  borderRadius="xl"
                  bg="gray.50"
                  _hover={{ bg: "gray.100" }}
                  transition="all 0.2s ease"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="semibold" color="gray.700">
                      {category}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {percentage}%
                    </Text>
                  </Flex>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="lg" fontWeight="bold" color="#287bbf">
                      {budgetService.formatCurrency(amount)}
                    </Text>
                    <Badge
                      colorScheme={index < 3 ? "blue" : "gray"}
                      variant="subtle"
                    >
                      {budgetService.formatLargeNumber(amount)} บาท
                    </Badge>
                  </Flex>
                  <Progress
                    value={percentage}
                    colorScheme="blue"
                    size="md"
                    borderRadius="full"
                    bg="gray.200"
                  />
                </Box>
              );
            })}
        </VStack>
      </CardBody>
    </Card>
  );
};

const Budget = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2568");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("amount-desc");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  useEffect(() => {
    loadBudgetData(selectedYear);
  }, [selectedYear]);

  const loadBudgetData = async (year) => {
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.loadBudgetData(year);
      setBudgetData(data);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลงบประมาณได้: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredAndSortedItems = () => {
    if (!budgetData?.items) return [];

    let items = budgetData.items;

    // Filter by search query
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort items
    return budgetService.sortItems(items, sortBy);
  };

  const handleDownloadCSV = () => {
    if (!budgetData) return;

    const year = selectedYear;
    const filename = budgetService.getFilenameForYear(year);
    const downloadUrl = `/budget/${year}/${filename}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box
        position="relative"
        minH="100vh"
        bgGradient="linear(to-br, #287bbf, #1a5580)"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FloatingShapes />
        <VStack spacing={4} position="relative" zIndex={2}>
          <Spinner size="xl" color="white" thickness="4px" />
          <Text color="white" fontSize="lg" fontWeight="medium">
            กำลังโหลดข้อมูลงบประมาณ...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        position="relative"
        minH="100vh"
        bgGradient="linear(to-br, #287bbf, #1a5580)"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FloatingShapes />
        <Container maxW="4xl" py={20} position="relative" zIndex={2}>
          <Alert
            status="error"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="2xl"
            bg="white"
            color="gray.800"
          >
            <AlertIcon boxSize="40px" mr={0} color="red.500" />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              เกิดข้อผิดพลาด
            </AlertTitle>
            <AlertDescription maxWidth="sm" color="gray.600">
              {error}
            </AlertDescription>
            <Button
              mt={4}
              bg="#287bbf"
              color="white"
              onClick={() => loadBudgetData(selectedYear)}
              _hover={{
                bg: "#1a5580",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s ease"
            >
              ลองใหม่
            </Button>
          </Alert>
        </Container>
      </Box>
    );
  }

  const filteredItems = getFilteredAndSortedItems();

  return (
    <Box
      position="relative"
      minH="100vh"
      bgGradient="linear(to-br, #287bbf, #1a5580)"
      overflow="hidden"
    >
      <FloatingShapes />
      <Container maxW="7xl" py={12} position="relative" zIndex={2}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={6} textAlign="center">
            <Badge
              bg="#ffb200"
              color="white"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="md"
              fontWeight="bold"
              shadow="lg"
            >
              💰 ความโปร่งใสทางการเงิน
            </Badge>
            <Heading
              size="3xl"
              color="white"
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
            >
              งบประมาณ PI Website ปี {budgetData?.year}
            </Heading>
            <Text
              fontSize="xl"
              color="whiteAlpha.900"
              maxW="4xl"
              lineHeight="tall"
              textShadow="0 1px 2px rgba(0,0,0,0.2)"
            >
              เพื่อความโปร่งใสและความไว้วางใจจากประชาชน
              เราเปิดเผยการใช้งบประมาณจากภาษีของประชาชน เพื่อพัฒนาแพลทฟอร์ม
              Public Intelligence และกิจกรรมต่างๆ
            </Text>

            <HStack spacing={8} wrap="wrap" justify="center">
              <HStack>
                <Icon as={FaCalendarAlt} color="yellow.300" boxSize={5} />
                <Text color="whiteAlpha.900" fontSize="lg" fontWeight="medium">
                  ปีงบประมาณ: {budgetData?.year} ({budgetData?.yearAD})
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaEye} color="yellow.300" boxSize={5} />
                <Text color="whiteAlpha.900" fontSize="lg" fontWeight="medium">
                  โปร่งใส ตรวจสอบได้
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaUsers} color="green.300" boxSize={5} />
                <Text color="whiteAlpha.900" fontSize="lg" fontWeight="medium">
                  เพื่อประชาชน
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Year Selection and Controls */}
          <HStack spacing={4} w="full" justify="center" wrap="wrap">
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              w="200px"
              bg="white"
              borderColor="gray.300"
              color="gray.800"
              fontWeight="medium"
              _focus={{
                borderColor: "#287bbf",
                ring: 2,
                ringColor: "blue.200",
              }}
            >
              {budgetService.getAvailableYears().map((year) => (
                <option key={year} value={year}>
                  ปี {year} ({budgetService.convertToAD(year)})
                </option>
              ))}
            </Select>

            <InputGroup w="300px">
              <InputLeftElement>
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="ค้นหารายการงบประมาณ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="white"
                color="gray.800"
                borderColor="gray.300"
                fontWeight="medium"
                _focus={{
                  borderColor: "#287bbf",
                  ring: 2,
                  ringColor: "blue.200",
                }}
                _placeholder={{ color: "gray.500" }}
              />
            </InputGroup>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              w="200px"
              bg="white"
              color="gray.800"
              borderColor="gray.300"
              fontWeight="medium"
              _focus={{
                borderColor: "#287bbf",
                ring: 2,
                ringColor: "blue.200",
              }}
            >
              <option value="amount-desc">จำนวนเงินมาก → น้อย</option>
              <option value="amount-asc">จำนวนเงินน้อย → มาก</option>
              <option value="name-asc">ชื่อ A → Z</option>
              <option value="category">ประเภท</option>
            </Select>

            <Button
              leftIcon={<FaDownload />}
              bg="#ffb200"
              color="white"
              onClick={handleDownloadCSV}
              _hover={{
                bg: "#e5a000",
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.3s ease"
              shadow="md"
              fontWeight="bold"
            >
              ดาวน์โหลด CSV
            </Button>
          </HStack>

          {/* Summary Cards */}
          <BudgetSummaryCards summary={budgetData.summary} />

          {/* Budget Breakdown */}
          <BudgetBreakdown summary={budgetData.summary} />

          {/* View Mode Toggle */}
          <HStack spacing={2}>
            <Button
              size="md"
              variant={viewMode === "cards" ? "solid" : "outline"}
              bg={viewMode === "cards" ? "#ffb200" : "transparent"}
              color="white"
              onClick={() => setViewMode("cards")}
              borderColor="whiteAlpha.400"
              _hover={{
                bg: viewMode === "cards" ? "#e5a000" : "whiteAlpha.200",
                transform: "translateY(-2px)",
                borderColor: "white",
              }}
              transition="all 0.3s ease"
              shadow={viewMode === "cards" ? "lg" : "none"}
              fontWeight="bold"
            >
              การ์ด
            </Button>
            <Button
              size="md"
              variant={viewMode === "table" ? "solid" : "outline"}
              bg={viewMode === "table" ? "#ffb200" : "transparent"}
              color="white"
              onClick={() => setViewMode("table")}
              borderColor="whiteAlpha.400"
              _hover={{
                bg: viewMode === "table" ? "#e5a000" : "whiteAlpha.200",
                transform: "translateY(-2px)",
                borderColor: "white",
              }}
              transition="all 0.3s ease"
              shadow={viewMode === "table" ? "lg" : "none"}
              fontWeight="bold"
            >
              ตาราง
            </Button>
          </HStack>

          {/* Budget Items */}
          <Box w="full">
            <HStack justify="space-between" mb={6}>
              <Heading
                size="lg"
                color="white"
                textShadow="0 1px 2px rgba(0,0,0,0.2)"
              >
                รายละเอียดงบประมาณ
              </Heading>
              <Text color="whiteAlpha.800" fontSize="lg" fontWeight="medium">
                แสดง {filteredItems.length} จาก {budgetData.items.length} รายการ
              </Text>
            </HStack>

            {viewMode === "cards" ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredItems.map((item, index) => (
                  <BudgetCard key={`${item.id}-${index}`} item={item} />
                ))}
              </SimpleGrid>
            ) : (
              <Card bg="white" shadow="lg" borderRadius="2xl" overflow="hidden">
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th color="gray.700" fontWeight="bold">
                          รหัส
                        </Th>
                        <Th color="gray.700" fontWeight="bold">
                          รายละเอียด
                        </Th>
                        <Th color="gray.700" fontWeight="bold">
                          ประเภท
                        </Th>
                        <Th isNumeric color="gray.700" fontWeight="bold">
                          จำนวนเงิน
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredItems.map((item, index) => (
                        <Tr
                          key={`${item.id}-${index}`}
                          _hover={{ bg: "gray.50" }}
                        >
                          <Td>
                            <Text
                              fontSize="sm"
                              fontFamily="mono"
                              color="gray.600"
                              fontWeight="medium"
                            >
                              {item.id}
                            </Text>
                          </Td>
                          <Td>
                            <Text
                              fontSize="sm"
                              lineHeight="tall"
                              color="gray.800"
                            >
                              {item.description}
                            </Text>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={budgetService.getCategoryColor(
                                item.category
                              )}
                              size="sm"
                              borderRadius="full"
                            >
                              {item.category}
                            </Badge>
                          </Td>
                          <Td isNumeric>
                            <Text
                              fontWeight="bold"
                              color="#287bbf"
                              fontSize="md"
                            >
                              {budgetService.formatCurrency(item.amount)}
                            </Text>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </Box>

          {/* Empty State */}
          {filteredItems.length === 0 && searchQuery && (
            <VStack spacing={4} py={12}>
              <Text fontSize="4xl">🔍</Text>
              <Heading
                size="md"
                color="white"
                textShadow="0 1px 2px rgba(0,0,0,0.2)"
              >
                ไม่พบรายการที่ค้นหา
              </Heading>
              <Text color="whiteAlpha.800" textAlign="center" fontSize="lg">
                ไม่พบรายการงบประมาณที่ตรงกับ "{searchQuery}"
              </Text>
              <Button
                size="sm"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.400"
                _hover={{ bg: "whiteAlpha.200" }}
                onClick={() => setSearchQuery("")}
              >
                ล้างการค้นหา
              </Button>
            </VStack>
          )}

          {/* Footer */}
          <Divider borderColor="whiteAlpha.300" />
          <VStack spacing={4} textAlign="center">
            <Text
              color="whiteAlpha.900"
              fontSize="lg"
              fontWeight="bold"
              textShadow="0 1px 2px rgba(0,0,0,0.2)"
            >
              ข้อมูลงบประมาณ Public Intelligence (PI) Website
            </Text>
            <Text color="whiteAlpha.800" fontSize="md">
              หน่วยงาน: สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ
              บริษัทสื่อสาธารณะไทย
            </Text>
            <HStack
              spacing={6}
              fontSize="sm"
              color="whiteAlpha.700"
              wrap="wrap"
              justify="center"
            >
              <Text fontWeight="medium">
                📊 ข้อมูล: {budgetData.items.length} รายการ
              </Text>
              <Text fontWeight="medium">
                💰 งบประมาณ:{" "}
                {budgetService.formatLargeNumber(
                  budgetData.summary.totalBudget
                )}{" "}
                บาท
              </Text>
              <Text fontWeight="medium">📅 ปีงบประมาณ: {budgetData.year}</Text>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Budget;
