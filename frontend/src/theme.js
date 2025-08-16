import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // Nesta-inspired Innovation Colors
  colors: {
    primary: {
      50: "#e6f3fb",
      100: "#cce7f7",
      200: "#99cfef",
      300: "#66b7e7",
      400: "#339fdf",
      500: "#287bbf", // Nesta Primary Blue
      600: "#206699",
      700: "#1a5580",
      800: "#134466",
      900: "#0d334d",
    },
    secondary: {
      50: "#fff9e6",
      100: "#fff3cc",
      200: "#ffe799",
      300: "#ffdb66",
      400: "#ffcf33",
      500: "#ffb200", // Nesta Primary Orange
      600: "#cc8e00",
      700: "#996b00",
      800: "#664700",
      900: "#332400",
    },
    accent: {
      50: "#e6f3fb",
      100: "#cce7f7",
      200: "#99cfef",
      300: "#66b7e7",
      400: "#339fdf",
      500: "#287bbf", // Using primary blue as accent too
      600: "#206699",
      700: "#1a5580",
      800: "#134466",
      900: "#0d334d",
    },
    modern: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b", // Modern gray
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    // Override Chakra's blue to use our primary blue
    blue: {
      50: "#e6f3fb",
      100: "#cce7f7",
      200: "#99cfef",
      300: "#66b7e7",
      400: "#339fdf",
      500: "#287bbf",
      600: "#206699",
      700: "#1a5580",
      800: "#134466",
      900: "#0d334d",
    },
    // Override Chakra's orange to use our secondary orange
    orange: {
      50: "#fff9e6",
      100: "#fff3cc",
      200: "#ffe799",
      300: "#ffdb66",
      400: "#ffcf33",
      500: "#ffb200",
      600: "#cc8e00",
      700: "#996b00",
      800: "#664700",
      900: "#332400",
    },
  },
  // Nesta-inspired gradients for innovation and dynamic elements
  gradients: {
    primary: "linear(to-r, primary.400, primary.600)",
    secondary: "linear(to-r, secondary.400, secondary.600)",
    hero: "linear(to-br, primary.500, secondary.500)",
    innovation: "linear(135deg, primary.400, secondary.400)",
    floating: "radial(circle, primary.300, secondary.300)",
    modern: "linear(to-r, gray.50, primary.50)",
  },
  fonts: {
    heading: `'KulachatSlab', 'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    body: `'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  },
  styles: {
    global: {
      body: {
        fontFamily: `'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      },
    },
  },
  // Set default color schemes
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "xl",
        _focus: { boxShadow: "none" },
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            bg: `${props.colorScheme}.600`,
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          transition: "all 0.3s ease",
        }),
        outline: (props) => ({
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          borderWidth: "2px",
          _hover: {
            bg: `${props.colorScheme}.500`,
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          transition: "all 0.3s ease",
        }),
        gradient: {
          background:
            "linear-gradient(135deg, #0ea5e9 0%, #ec4899 50%, #eab308 100%)",
          color: "white",
          border: "none",
          _hover: {
            transform: "translateY(-2px)",
            boxShadow: "xl",
            filter: "brightness(1.1)",
          },
          transition: "all 0.3s ease",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "2xl",
          overflow: "hidden",
          boxShadow: "sm",
          _hover: {
            boxShadow: "xl",
            transform: "translateY(-4px)",
          },
          transition: "all 0.3s ease",
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: `'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: `'KulachatSlab', 'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        fontWeight: 700,
      },
    },
    Button: {
      baseStyle: {
        fontFamily: `'DB Helvetica Thai CAX', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      },
      defaultProps: {
        colorScheme: "primary", // Use our primary color by default
      },
    },
    Link: {
      baseStyle: {
        color: "primary.500",
        _hover: {
          color: "primary.600",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
