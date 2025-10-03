# Home Components

Modular, reusable components for the Home page.

## Components

### ProjectCard

Displays a project with thumbnail, title, description, votes, and comments.

**Props:**

- `project` (object, required): Project data
- `votes` (number): Number of votes
- `comments` (number): Number of comments

**Example:**

```jsx
<ProjectCard project={projectData} votes={42} comments={5} />
```

### BlogCard

Shows a blog article with thumbnail and external link.

**Props:**

- `article` (object, required): Article data with title, slug, thumbnail, description, publishedAt

**Example:**

```jsx
<BlogCard article={articleData} />
```

### EventCard

Renders an event with date, time, location, and type badge.

**Props:**

- `event` (object, required): Event data with title, date, time, type, location, description

**Example:**

```jsx
<EventCard event={eventData} />
```

### LoadingGrid

Skeleton loading component for grid layouts.

**Props:**

- `columns` (number, default: 3): Number of columns
- `count` (number, default: 3): Number of skeleton cards
- `height` (string, default: "200px"): Height of image skeleton

**Example:**

```jsx
<LoadingGrid columns={3} count={3} height="200px" />
```

### Section

Reusable section wrapper with consistent styling.

**Props:**

- `badge` (string): Badge text
- `title` (node): Section title
- `description` (string): Section description
- `children` (node, required): Section content
- `bgColor` (string, default: "white"): Background color
- `action` (node): Action button/content

**Example:**

```jsx
<Section
  badge="Featured"
  title="Our Projects"
  description="Explore amazing projects"
  bgColor="gray.50"
>
  <YourContent />
</Section>
```

## Import

```jsx
import {
  ProjectCard,
  BlogCard,
  EventCard,
  LoadingGrid,
  Section,
} from "./homeComponents";
```

## Features

- ✅ PropTypes validation
- ✅ React.memo for performance
- ✅ Accessibility (ARIA labels)
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Hover animations
