import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Flex,
  Grid,
  GridItem,
  Badge,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionImage = motion(Image);

function CaseStudy() {
  // Project details data
  const projectDetails = [
    {
      img: "images/about/process-1.jpg",
      title: "Our Strategies",
      text: "Ducimus recusandae molestias, suscipit neque, sit inventore.",
    },
    {
      img: "images/about/process-2.jpg",
      title: "Our Challenges",
      text: "Eveniet nisi eius qui necessitatibus exercitationem, quam suscipit harum.",
    },
    {
      img: "images/about/process-3.jpg",
      title: "Our Success",
      text: "Eveniet nisi eius qui necessitatibus exercitationem, quam suscipit harum.",
    },
  ];

  return (
    <Box as="main">
      {/* Page Title Section */}
      <Box
        bg="gray.800"
        color="white"
        py={20}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: "linear(to-r, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
          zIndex: 1,
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <VStack spacing={4} align="center" textAlign="center">
            <Badge
              colorScheme="yellow"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              Project Details
            </Badge>
            <MotionHeading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Single Details
            </MotionHeading>
            <HStack fontSize="sm" color="gray.300" spacing={2}>
              <Box
                as={RouterLink}
                to="/"
                color="white"
                _hover={{ color: "#fcb000" }}
              >
                Home
              </Box>
              <Text>/</Text>
              <Text color="gray.400">Single Details</Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Project Info Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 8, lg: 12 }}
            align="start"
          >
            <MotionBox
              flex="1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box borderRadius="xl" overflow="hidden" boxShadow="xl">
                <MotionImage
                  src="images/about/about.jpg"
                  alt="Project Image"
                  w="100%"
                  transition="transform 0.5s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
            </MotionBox>

            <MotionBox
              flex="1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VStack align="start" spacing={6}>
                <MotionHeading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                >
                  Engaging content and flexible User experience help to grow
                  more
                </MotionHeading>

                <MotionText color="gray.600">
                  Accusamus necessitatibus harum nobis quam omnis tempora
                  cupiditate nihil, vero dolorum porro atque. Suscipit
                  assumenda, minus tempora aliquid, ratione minima optio nihil.
                </MotionText>

                <VStack align="start" spacing={3} w="100%">
                  <Text fontWeight="bold">
                    Project Name:{" "}
                    <Text as="span" fontWeight="normal">
                      Business Accounting
                    </Text>
                  </Text>
                  <Text fontWeight="bold">
                    Client:{" "}
                    <Text as="span" fontWeight="normal">
                      Company Name Inc.
                    </Text>
                  </Text>
                  <Text fontWeight="bold">
                    Project Start Date:{" "}
                    <Text as="span" fontWeight="normal">
                      February 18, 2018
                    </Text>
                  </Text>
                  <Text fontWeight="bold">
                    Project Completion Date:{" "}
                    <Text as="span" fontWeight="normal">
                      January 25, 2018
                    </Text>
                  </Text>
                  <Text fontWeight="bold">
                    Project URL:{" "}
                    <Link
                      href="http://www.example.com"
                      color="#fcb000"
                      isExternal
                    >
                      www.example.com
                    </Link>
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Project Details Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {projectDetails.map((item, index) => (
              <GridItem key={index}>
                <MotionBox
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="md"
                  h="100%"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "xl",
                  }}
                  transition="all 0.3s ease"
                >
                  <VStack align="start" spacing={4}>
                    <Box borderRadius="lg" overflow="hidden" w="100%">
                      <Image
                        src={item.img}
                        alt={item.title}
                        w="100%"
                        h="200px"
                        objectFit="cover"
                        transition="transform 0.5s"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                    </Box>
                    <Heading as="h4" fontSize="xl">
                      {item.title}
                    </Heading>
                    <Text color="gray.600">{item.text}</Text>
                  </VStack>
                </MotionBox>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default CaseStudy;
