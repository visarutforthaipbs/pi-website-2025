import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const MotionBox = motion(Box);

// Navigation Links
const Links = [
  { name: "หน้าแรก", path: "/" },
  { name: "ผลงานของเรา", path: "/projects" },
  { name: "บล็อก", path: "/blog" },
];

const NavLink = ({ children, to, isActive }) => {
  return (
    <Box
      as={Link}
      to={to}
      px={2}
      py={1}
      position="relative"
      fontWeight={isActive ? "medium" : "normal"}
      color={isActive ? "#fcb000" : "white"}
      _hover={{
        color: "#fcb000",
        _after: {
          width: "100%",
        },
      }}
      _after={{
        content: '""',
        position: "absolute",
        width: isActive ? "100%" : "0%",
        height: "2px",
        bottom: "-2px",
        left: "0",
        bg: "#fcb000",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <MotionBox
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="rgba(30, 41, 59, 0.95)"
      px={4}
      boxShadow="md"
      backdropFilter="blur(5px)"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxW="container.xl" p={0}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          />

          <HStack spacing={8} alignItems="center">
            <Box>
              <Link to="/">
                <Image
                  src="/images/piwhitelogo.png"
                  alt="PI Logo"
                  h="40px"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Link>
            </Box>
            <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Button
            as={Link}
            to="/contact"
            size="md"
            colorScheme="yellow"
            rightIcon={<FaArrowRight />}
            display={{ base: "none", md: "inline-flex" }}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            ติดต่อเรา
          </Button>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.name}
                </NavLink>
              ))}
              <Button
                as={Link}
                to="/contact"
                w="full"
                size="sm"
                colorScheme="yellow"
                rightIcon={<FaArrowRight />}
                onClick={onClose}
              >
                ติดต่อเรา
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </MotionBox>
  );
}

export default Header;
