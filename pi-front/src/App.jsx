import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Pricing from "./components/Pricing";
import Projects from "./components/Projects";
import CaseStudy from "./components/CaseStudy";
import Services from "./components/Services";
import "./assets/css/buttons.css";

// Define custom theme colors based on PI's branding
const theme = extendTheme({
  colors: {
    brand: {
      yellow: "#fcb000",
      50: "#FFF9E5",
      100: "#FFEFC6",
      200: "#FFDF94",
      300: "#FFD062",
      400: "#FFC230",
      500: "#FCB000", // Primary brand color
      600: "#E09000",
      700: "#B87200",
      800: "#905800",
      900: "#684000",
    },
  },
  fonts: {
    heading: `'Sukhumvit Set', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
    body: `'Sukhumvit Set', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
