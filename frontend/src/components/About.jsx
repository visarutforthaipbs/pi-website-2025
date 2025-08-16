import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Divider,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

const QuoteBox = ({ quote, author }) => {
  return (
    <Box
      bg={useColorModeValue("primary.50", "primary.900")}
      p={6}
      borderLeft="4px solid"
      borderLeftColor="primary.500"
      borderRadius="md"
      my={6}
    >
      <HStack align="start" spacing={4}>
        <FaQuoteLeft
          color={useColorModeValue("#287bbf", "#64b5f6")}
          size="20px"
        />
        <VStack align="start" spacing={2}>
          <Text
            fontStyle="italic"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            "{quote}"
          </Text>
          {author && (
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
              fontWeight="medium"
            >
              – {author}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <Card>
      <CardBody>
        <VStack align="start" spacing={3}>
          <Heading size="md" color="primary.600">
            {title}
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>
            {description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default function About() {
  const publicMediaData = [
    {
      country: "อังกฤษ",
      organization: "BBC (British Broadcasting Corporation)",
      characteristics:
        "ได้รับทุนจากค่าธรรมเนียมผู้ชม (license fee), มีความเป็นอิสระสูง",
    },
    {
      country: "เยอรมนี",
      organization: "ARD, ZDF",
      characteristics: "มีโครงสร้างกรรมการจากภาคประชาชน องค์กรวิชาชีพ",
    },
    {
      country: "ญี่ปุ่น",
      organization: "NHK",
      characteristics: "รับทุนจากค่าธรรมเนียมผู้ใช้, มีพันธกิจบริการสังคม",
    },
  ];

  return (
    <Box py={12} bg={useColorModeValue("primary.25", "primary.950")}>
      <Container maxW={"7xl"}>
        <VStack spacing={12} align="stretch">
          {/* Hero Section */}
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              color={useColorModeValue("primary.800", "primary.200")}
            >
              แนวคิดเบื้องหลังการทำงานของ PI
            </Heading>
          </VStack>

          {/* PI คืออะไร Section */}
          <Box
            bg={useColorModeValue("primary.50", "primary.900")}
            p={8}
            borderRadius="lg"
          >
            <Heading size="xl" mb={6} color="primary.700">
              PI คืออะไร
            </Heading>
            <Text fontSize="lg" lineHeight="tall" mb={4}>
              PI คือทีมใหม่ของสื่อสาธารณะอย่างไทยพีบีเอส
              และอยู่ภายใต้สำนักเครือข่ายและการมีส่วนร่วมสาธารณะ
              โดยเป้าหมายของทีมคือการสร้างการมีส่วนร่วมที่ผ่านการไตร่ตรองของประชาชนในประเด็นสาธารณะ
            </Text>
            <Text fontSize="lg" lineHeight="tall" mb={4}>
              การไตร่ตรอง (deliberation)
              จะทำผ่านการให้ข้อมูลและเนื้อหาอย่างรอบด้าน ดังนั้นงานของ PI
              จึงรวมไปถึงการให้บริการข้อมูลสาธารณะ
              โดยมีเป้าหมายเพื่อให้ข้อมูลก่อนที่ประชาชนจะตัดสินใจ
            </Text>
            <Text fontSize="lg" lineHeight="tall">
              โดยวิธีการและแนวคิดเบื้องหลังการทำงานของ PI หรือชื่อย่อที่มาจาก
              Public Intelligence ภายใต้โครงการห้องทดลองปัญญารวมหมู่
              ซึ่งเป็นการรวมกันของแนวคิด สื่อสาธารณะ (Public Media) และ
              ปัญญารวมหมู่ (Collective Intelligence)
            </Text>
          </Box>

          <Divider />

          {/* Core Concepts Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
            {/* ปัญญารวม */}
            <Box>
              <Heading size="lg" mb={6} color="secondary.600">
                ปัญญารวม
              </Heading>
              <Text fontSize="lg" lineHeight="tall" mb={4}>
                Collective Intelligence หรือ ปัญญารวม หมายถึง
                ความสามารถร่วมกันของกลุ่มบุคคลในการคิด วิเคราะห์ และตัดสินใจ
                โดยอาศัยปฏิสัมพันธ์ การสื่อสาร และการแลกเปลี่ยนข้อมูล
                เพื่อให้ได้ผลลัพธ์ที่ดีกว่าปัญญาของปัจเจกบุคคล
              </Text>
              <Text fontSize="lg" lineHeight="tall" mb={6}>
                โดยแนวคิดนี้เน้นว่า <strong>"ทุกคนมีส่วนร่วมได้"</strong> และ
                <strong>"ปัญหาซับซ้อนต้องใช้หลายมุมมองร่วมกันในการแก้"</strong>
              </Text>

              <QuoteBox
                quote="Collective intelligence is created when people work together, often with the help of technology, to mobilise a wider range of information, ideas and insights to address a social challenge"
                author="Nesta, The Collective Intelligence Design Playbook"
              />
            </Box>

            {/* สื่อสาธารณะ */}
            <Box>
              <Heading size="lg" mb={6} color="secondary.600">
                สื่อสาธารณะ
              </Heading>
              <Text fontSize="lg" lineHeight="tall" mb={4}>
                แนวคิดของ "สื่อสาธารณะ" (Public Media)
                คือสื่อที่จัดตั้งขึ้นเพื่อรับใช้ผลประโยชน์ของประชาชนในภาพรวม
                ไม่ใช่เพื่อผลกำไรของเอกชน หรือเพื่อวาระทางการเมืองของรัฐ
              </Text>
              <Text fontSize="lg" lineHeight="tall" mb={6}>
                มีเป้าหมายหลักในการส่งเสริม ประชาธิปไตย, ความหลากหลาย, ความรู้,
                และ การมีส่วนร่วมของประชาชน
              </Text>

              <QuoteBox
                quote="Public service media are media organizations whose mandate is to serve the public interest by providing diverse, balanced, and high-quality content free from undue political or commercial influence."
                author="UNESCO (2008). Public Service Broadcasting: A Comparative Legal Survey"
              />

              <QuoteBox
                quote="สื่อสาธารณะเป็นกลไกหนึ่งของประชาธิปไตยที่ทำให้เกิดการสื่อสารแบบสองทางระหว่างภาครัฐกับประชาชน และส่งเสริมความรู้และการตรวจสอบอำนาจ"
                author="สมสุข หินวิมาน (2552), สื่อสาธารณะกับประชาธิปไตย, สำนักพิมพ์มหาวิทยาลัยธรรมศาสตร์"
              />
            </Box>
          </SimpleGrid>

          <Divider />

          {/* องค์ประกอบของสื่อสาธารณะ */}
          <Box>
            <Heading size="lg" mb={8} color="primary.700">
              องค์ประกอบของ "สื่อสาธารณะ"
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FeatureCard
                title="อิสระจากรัฐและทุน"
                description="ต้องไม่ถูกควบคุมโดยรัฐบาลหรือธุรกิจ"
              />

              <FeatureCard
                title="รับผิดชอบต่อสาธารณะ"
                description="เปิดเผยข้อมูล แสดงความโปร่งใส มีระบบรับฟังความเห็น"
              />

              <FeatureCard
                title="เนื้อหาหลากหลายและครอบคลุม"
                description="สนับสนุนความหลากหลายทางวัฒนธรรม ความรู้ ภูมิภาค กลุ่มเปราะบาง"
              />

              <FeatureCard
                title="การมีส่วนร่วมของประชาชน"
                description="ส่งเสริมพื้นที่ให้ประชาชนร่วมผลิตหรือเสนอเนื้อหา"
              />

              <FeatureCard
                title="โครงสร้างการบริหารแบบมีตัวแทนจากภาคส่วนต่าง ๆ"
                description="ไม่ผูกขาดโดยรัฐหรือเอกชน ต้องมีกรรมการที่หลากหลาย"
              />
            </SimpleGrid>
          </Box>

          <Divider />

          {/* บริบทสากล */}
          <Box>
            <Heading size="lg" mb={8} color="primary.700">
              บริบทสากล: ตัวอย่างสื่อสาธารณะ
            </Heading>

            <TableContainer>
              <Table variant="simple">
                <Thead bg={useColorModeValue("primary.50", "primary.900")}>
                  <Tr>
                    <Th color="primary.700">ประเทศ</Th>
                    <Th color="primary.700">องค์กร</Th>
                    <Th color="primary.700">ลักษณะเด่น</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {publicMediaData.map((item, index) => (
                    <Tr key={index}>
                      <Td fontWeight="medium" color="secondary.600">
                        {item.country}
                      </Td>
                      <Td fontWeight="bold">{item.organization}</Td>
                      <Td>{item.characteristics}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
