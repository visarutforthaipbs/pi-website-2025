import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";

// Motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Pricing Card Component
const PricingCard = ({ title, price, features, isPopular, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        bg="white"
        border="1px"
        borderColor={isPopular ? "#fcb000" : "gray.200"}
        borderRadius="xl"
        overflow="hidden"
        p={6}
        boxShadow={isPopular ? "xl" : "md"}
        position="relative"
        h="100%"
        _hover={{
          transform: "translateY(-10px)",
          boxShadow: "xl",
        }}
        transition="all 0.3s ease"
      >
        {isPopular && (
          <Badge
            position="absolute"
            top="0"
            right="0"
            bg="#fcb000"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            px={3}
            py={1}
            borderBottomLeftRadius="md"
          >
            POPULAR
          </Badge>
        )}

        <VStack spacing={5} align="center">
          <Text
            fontWeight="bold"
            fontSize="lg"
            textTransform="uppercase"
            letterSpacing="wide"
            color="gray.700"
          >
            {title}
          </Text>

          <Box textAlign="center">
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={1}>
              {price}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Yearly
            </Text>
          </Box>

          <List spacing={3} w="100%" py={4}>
            {features.map((feature, idx) => (
              <ListItem key={idx} display="flex" alignItems="center">
                <ListIcon as={FaCheck} color="#fcb000" fontSize="sm" />
                <Text fontSize="md">{feature}</Text>
              </ListItem>
            ))}
          </List>

          <Button
            mt="auto"
            colorScheme={isPopular ? "yellow" : "gray"}
            size="lg"
            w="full"
            _hover={{
              transform: isPopular ? "translateY(-2px)" : "",
              boxShadow: isPopular ? "md" : "",
            }}
            transition="all 0.2s"
          >
            Choose Plan
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
};

PricingCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPopular: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

function Pricing() {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$29.99",
      features: [
        "50 GB Hosting",
        "Business Analysis",
        "24 Hours Support",
        "Customer Management",
      ],
      isPopular: false,
    },
    {
      title: "Standard",
      price: "$49.99",
      features: [
        "100 GB Hosting",
        "Advanced Business Analysis",
        "24/7 Support",
        "Customer & Data Management",
      ],
      isPopular: true,
    },
    {
      title: "Premium",
      price: "$79.99",
      features: [
        "Unlimited Hosting",
        "Premium Business Tools",
        "Dedicated Support",
        "AI-Powered Analytics",
      ],
      isPopular: false,
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
              Our Pricing
            </Badge>
            <MotionHeading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pricing Package
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
              <Text color="gray.400">Our Pricing</Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
              <MotionHeading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Pricing
              </MotionHeading>
              <MotionText
                color="gray.600"
                fontSize="lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We offer affordable pricing plans to help you get the best
                value.
              </MotionText>
            </VStack>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="100%"
            >
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  index={index}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default Pricing;
