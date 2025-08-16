# PI Website 2025 - Documentation & Guidelines

## 📋 Project Overview

**Project Name:** PI Website 2025  
**Repository:** pi-new-website-2025  
**Owner:** visarutforthaipbs  
**Tech Stack:** React + Vite + Chakra UI  
**Language:** Primarily Thai (ไทย) with some English technical terms  
**Purpose:** Platform for Public Interest (PI) organization showcasing services, projects, and community engagement tools

---

## 🏗️ Architecture & Technical Stack

### **Frontend Structure**

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Home.jsx        # Homepage with hero + featured projects
│   │   ├── About.jsx       # About page
│   │   ├── Services.jsx    # Services breakdown (3 categories)
│   │   ├── Projects.jsx    # Projects showcase
│   │   ├── Contact.jsx     # Contact information
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Site footer
│   │   ├── WordCloudInput.jsx  # Interactive word cloud component
│   │   └── FloatingShapes.jsx  # Background animation component
│   ├── services/           # API services
│   │   ├── cmsService.js
│   │   ├── notionService.js
│   │   ├── votingService.js
│   │   └── wordService.js
│   ├── theme.js           # Chakra UI theme configuration
│   ├── config.js          # API endpoints configuration
│   └── App.jsx            # Main app component with routing
├── public/
│   ├── fonts.css         # Custom font definitions
│   ├── images/           # Image assets
│   │   └── logos/        # Brand logos and patterns
│   └── font/             # Font files (.woff2, .otf)
```

### **Backend Structure**

```
backend/
├── server.js             # Express server
├── config/
│   └── database.js       # Database configuration
└── services/
    ├── votingService.js
    ├── wordCloudService.js
    └── wordCloudService-new.js
```

### **Key Dependencies**

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library and design system
- **React Router** - Client-side routing
- **React Icons** - Icon library (Font Awesome)

---

## 🎨 Branding & Design System

### **Color Palette**

Based on **Nesta-inspired Innovation Colors**:

```javascript
colors: {
  primary: {
    50: "#e6f3fb",    100: "#cce7f7",    200: "#99cfef",
    300: "#66b7e7",   400: "#339fdf",    500: "#287bbf", // Main Brand Blue
    600: "#206699",   700: "#1a5580",    800: "#134466",    900: "#0d334d"
  },
  secondary: {
    50: "#fff9e6",    100: "#fff3cc",    200: "#ffe799",
    300: "#ffdb66",   400: "#ffcf33",    500: "#ffb200", // Main Brand Orange
    600: "#cc8e00",   700: "#996b00",    800: "#664700",    900: "#332400"
  },
  accent: {
    // Same as primary blue for consistency
    500: "#287bbf"
  }
}
```

### **Color Usage Guidelines**

- **Primary Blue (#287bbf)**: Main brand color, primary actions, Service section
- **Secondary Orange (#ffb200)**: Secondary brand color, Projects section, highlights
- **Accent Blue**: Platform section, interactive elements
- **Gray Scales**: Text, backgrounds, subtle elements

### **Typography**

```javascript
fonts: {
  heading: "'KulachatSlab', 'DB Helvetica Thai CAX', sans-serif",
  body: "'DB Helvetica Thai CAX', sans-serif"
}
```

**Font Files:**

- `KulachatSlab-Bold.otf`
- `KulachatSlab-ExtraBold.otf`
- `dbhelvethaicax-webfont.woff2`
- `dbhelvethaicaxbd-webfont.woff2`
- `dbhelvethaicaxmed-webfont.woff2`

### **Visual Elements**

- **PI Pattern Background**: `pi-pattern.svg` used as hero section overlay
- **Floating Shapes**: Animated background elements for visual interest
- **Gradients**: `linear(135deg, primary.500 0%, accent.500 50%, secondary.500 100%)`
- **Border Radius**: Consistent use of `borderRadius="2xl"` (16px) for modern look
- **Shadows**: Elevation system with `boxShadow="lg"` and `boxShadow="xl"`

---

## 📱 Page Structure & Content

### **Home Page (Home.jsx)**

**Section Order:**

1. **Hero Section** - WordCloud input with PI pattern background
2. **Featured Projects** - 3 project cards from Projects API
3. **Impact Statistics** - 4 stat cards showing metrics
4. **Innovation Approach** - 3 methodology cards
5. **Modern Stats** - Gen Z focused statistics (Thai)
6. **Call to Action** - Gradient background with action buttons

### **Services Page (Services.jsx)**

**PI Work Categories:**

1. **Service**
   - Fact and Figures
   - Public Opinion Survey
2. **Projects**
   - Personalized Data → Deliberated Opinion → Data Diary
   - Time-bound vs Knowledge Hub types
3. **Platform**
   - Public Data Service Platform
   - PI Platform
   - Your Priority

### **Projects Page (Projects.jsx)**

- Project cards with thumbnails, status badges, voting system
- Category filtering (environment, education, healthcare, technology, community)
- API integration with `CONFIG.API_ENDPOINTS.PROJECTS`

---

## 🌐 API Integration

### **Configuration (config.js)**

```javascript
const CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
  API_ENDPOINTS: {
    PROJECTS: "/api/projects",
    WORDS: "/api/words",
    VOTING: "/api/voting",
  },
};
```

### **Key API Services**

- **Projects API**: Fetches project data for homepage and projects page
- **Word Cloud API**: Manages community word submissions
- **Voting API**: Handles project voting/liking functionality

---

## 🎯 Content Guidelines

### **Language Standards**

- **Primary Language**: Thai (ไทย)
- **Technical Terms**: English acceptable for API, code, and technical documentation
- **Tone**: Professional yet approachable, Gen Z friendly
- **Emoji Usage**: Strategic use for visual interest (🇹🇭, 🚀, ✨, etc.)

### **Content Themes**

- **Community-driven innovation**
- **Evidence-based decision making**
- **Youth engagement (Gen Z focus)**
- **Public participation in policy**
- **Data transparency and accessibility**

### **Thai Content Examples**

- "ค้นพบ**นวัตกรรม**ที่**ได้ผล**" (Discover Innovation in Action)
- "เชื่อมโยง**การวิจัย**กับ**ความจริง**" (Bridging Research and Reality)
- "พร้อมเปลี่ยนแปลง**สังคมไทย**แล้วมั้ย? 🇹🇭" (Ready to change Thai society?)

---

## 🔧 Development Guidelines

### **Component Structure**

```jsx
// Standard component template
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import FloatingShapes from "./FloatingShapes";

export default function ComponentName() {
  return (
    <Box>
      <FloatingShapes variant="hero|section">
        <Box bg="white|gray.50" py={20 | 24}>
          <Container maxW="7xl">
            <VStack spacing={16}>{/* Content */}</VStack>
          </Container>
        </Box>
      </FloatingShapes>
    </Box>
  );
}
```

### **Routing Structure**

```javascript
// App.jsx routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

### **State Management Patterns**

```javascript
// API data fetching pattern
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch(
      `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINTS.ENDPOINT}`
    );
    const result = await response.json();
    setData(result.data || []);
  } catch (err) {
    console.error("Error:", err);
    // Fallback to mock data
  } finally {
    setLoading(false);
  }
};
```

---

## 🎨 Design Patterns

### **Card Components**

- Consistent `borderRadius="2xl"`, `boxShadow="lg"`
- Hover states: `transform: "translateY(-4px|8px)"`, `boxShadow="xl|2xl"`
- Color-coded sections using theme colors

### **Responsive Design**

- Mobile-first approach
- Breakpoints: `{ base: 1, md: 2, lg: 3 }` for grids
- Typography scaling: `fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}`

### **Animation & Transitions**

- Consistent `transition="all 0.3s ease"`
- FloatingShapes for background movement
- Hover states for interactivity

### **Loading States**

- Skeleton components for data fetching
- Consistent loading patterns across pages

---

## 📁 Asset Organization

### **Images Structure**

```
public/images/
├── favicon-pi.svg          # Site favicon
├── pi-logo.svg            # Main PI logo
├── piwhitelogo.png        # White version of logo
├── logos/
│   ├── pi-pattern.svg     # Background pattern
│   ├── pi-text-logo.svg   # Text logo variant
│   └── logo-mono.svg      # Monochrome version
└── blog/                  # Blog post images
```

### **Logo Usage Guidelines**

- **pi-logo.svg**: Primary logo for headers
- **piwhitelogo.png**: For dark backgrounds
- **pi-pattern.svg**: Background overlay (800px size, 0.02 opacity)
- **pi-text-logo.svg**: Text-heavy contexts

---

## 🚀 Deployment & Environment

### **Build Configuration**

- **Development**: `npm run dev` (Vite dev server)
- **Production**: `npm run build` (Static files)
- **Preview**: `npm run preview` (Production preview)

### **Environment Variables**

```bash
REACT_APP_API_BASE_URL=http://localhost:3001  # Development
REACT_APP_API_BASE_URL=https://api.pi.org     # Production
```

### **Render.yaml Configuration**

- Frontend: Static site deployment
- Backend: Node.js service
- Database: PostgreSQL/MongoDB (configured in backend)

---

## 📝 Content Management

### **Project Data Structure**

```javascript
{
  id: number,
  title: string,           // Thai project title
  description: string,     // Thai description
  category: string,        // "environment|education|healthcare|technology|community"
  status: string,          // "active|completed|draft|cancelled"
  votes: number,           // Voting count
  thumbnail: string,       // Optional image URL
  createdTime: string      // ISO date string
}
```

### **Word Cloud Data**

```javascript
{
  text: string,           // Thai word/phrase
  value: number,          // Weight for cloud sizing
  category: string,       // Optional categorization
  timestamp: string       // Submission time
}
```

---

## 🎯 Future Enhancements

### **Planned Features**

- [ ] User authentication system
- [ ] Advanced project filtering
- [ ] Real-time word cloud updates
- [ ] Multi-language support (Thai/English toggle)
- [ ] Data visualization dashboards
- [ ] Mobile app integration

### **Technical Improvements**

- [ ] TypeScript migration
- [ ] Unit testing with Jest/React Testing Library
- [ ] E2E testing with Cypress
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] PWA capabilities
- [ ] SEO optimization

---

## 🆘 Troubleshooting

### **Common Issues**

1. **Import Errors**: Ensure all react-icons imports are valid (e.g., `FaDatabase` not `FaData`)
2. **Route Errors**: Check App.jsx routing configuration and component imports
3. **Theme Colors**: Use `primary|secondary|accent` instead of `blue|green|orange`
4. **API Errors**: Verify CONFIG.js endpoints and fallback data

### **Development Tips**

- Use FloatingShapes consistently for section backgrounds
- Follow the established color scheme strictly
- Maintain responsive design patterns
- Keep Thai content consistent and professional
- Test on multiple screen sizes

---

## 📞 Contact & Maintenance

**Repository:** https://github.com/visarutforthaipbs/pi-new-website-2025  
**Primary Language:** Thai (ไทย)  
**Maintainer:** PI Development Team  
**Last Updated:** August 2025

---

_This documentation serves as the single source of truth for the PI Website 2025 project. Please refer to this document when making changes to ensure consistency in design, architecture, and branding._
