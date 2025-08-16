import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Links = [
  { name: "หน้าหลัก", href: "/" },
  { name: "โครงการ", href: "/projects" },
  { name: "กิจกรรม", href: "/events" },
  { name: "บล็อก", href: "/blog" },
];

const NavLink = ({ children, href }) => (
  <Link
    as={RouterLink}
    to={href}
    px={4}
    py={2}
    rounded={"lg"}
    _hover={{
      textDecoration: "none",
      color: "#ffb200",
      transform: "translateY(-1px)",
    }}
    fontWeight="500"
    color="white"
    fontSize="md"
    transition="all 0.3s ease"
    _active={{
      color: "#ffb200",
    }}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg="#287bbf"
        px={4}
        borderBottom="3px solid"
        borderColor="#ffb200"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Container maxW="7xl">
          <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
            {/* PI Logo */}
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <RouterLink to="/">
                  <HStack spacing={3}>
                    <Image
                      src="/logo/pi-logo.svg"
                      alt="PI Logo"
                      w="50px"
                      h="50px"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      transition="all 0.3s ease"
                    />
                  </HStack>
                </RouterLink>
              </Box>
            </HStack>

            {/* Desktop Navigation */}
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>

            {/* CTA Button */}
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/contact"
                bg="#ffb200"
                color="white"
                size="md"
                px={6}
                borderRadius="full"
                fontWeight="600"
                display={{ base: "none", md: "flex" }}
                _hover={{
                  bg: "#e5a000",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(255, 178, 0, 0.3)",
                }}
                transition="all 0.3s ease"
              >
                ติดต่อ
              </Button>

              {/* Clean Mobile menu button */}
              <IconButton
                size={"md"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
                bg="rgba(255,255,255,0.2)"
                color="white"
                _hover={{
                  bg: "rgba(255,255,255,0.3)",
                }}
                borderRadius="lg"
              />
            </HStack>
          </Flex>

          {/* Mobile Navigation */}
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <Link
                    key={link.name}
                    as={RouterLink}
                    to={link.href}
                    px={4}
                    py={2}
                    rounded={"lg"}
                    _hover={{
                      textDecoration: "none",
                      bg: "rgba(255,255,255,0.1)",
                      color: "#ffb200",
                    }}
                    fontWeight="500"
                    color="white"
                    fontSize="md"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  as={RouterLink}
                  to="/contact"
                  bg="#ffb200"
                  color="white"
                  size="md"
                  w="full"
                  borderRadius="lg"
                  fontWeight="600"
                  mt={4}
                  _hover={{
                    bg: "#e5a000",
                  }}
                  onClick={onClose}
                >
                  ติดต่อ
                </Button>
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
