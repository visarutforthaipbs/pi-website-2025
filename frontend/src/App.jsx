import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme";

// Essential components (loaded immediately)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

// Lazy-loaded components (loaded on demand)
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Blog = lazy(() => import("./components/Blog"));
const Budget = lazy(() => import("./components/Budget"));
const Events = lazy(() => import("./components/Events"));

// Loading component
const PageLoading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minH="50vh"
    fontSize="lg"
    color="primary.500"
  >
    กำลังโหลด...
  </Box>
);

// Layout component
const Layout = ({ children }) => (
  <Flex direction="column" minHeight="100vh">
    <Header />
    <Box flex="1">{children}</Box>
    <Footer />
  </Flex>
);

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/events" element={<Events />} />
                <Route path="/wordcloud" element={<Home />} />
                {/* Catch-all route for 404s - redirect to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
