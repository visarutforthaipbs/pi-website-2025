# Custom Hooks

Reusable hooks for data fetching and state management.

## useFeaturedProjects

Fetches featured projects with votes and comments data.

**Returns:**

```javascript
{
  projects: Array,      // Top 3 voted projects
  loading: boolean,     // Loading state
  error: Error|null,    // Error if any
  votes: Object,        // Vote counts by project ID
  comments: Object      // Comment counts by project ID
}
```

**Example:**

```jsx
import { useFeaturedProjects } from "../hooks/useFeaturedProjects";

const MyComponent = () => {
  const { projects, loading, votes, comments } = useFeaturedProjects();

  if (loading) return <Loading />;

  return projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
      votes={votes[project.id]}
      comments={comments[project.id]}
    />
  ));
};
```

## useFeaturedBlogs

Fetches latest blog articles from Notion API.

**Parameters:**

- `limit` (number, default: 3): Number of articles to fetch

**Returns:**

```javascript
{
  blogs: Array,         // Blog articles
  loading: boolean,     // Loading state
  error: Error|null     // Error if any
}
```

**Example:**

```jsx
import { useFeaturedBlogs } from "../hooks/useFeaturedBlogs";

const BlogSection = () => {
  const { blogs, loading } = useFeaturedBlogs(3);

  return (
    <SimpleGrid>
      {blogs.map((article) => (
        <BlogCard key={article.id} article={article} />
      ))}
    </SimpleGrid>
  );
};
```

## useUpcomingEvents

Fetches upcoming events from the API.

**Returns:**

```javascript
{
  events: Array,        // Upcoming events (filtered by date >= today)
  loading: boolean,     // Loading state
  error: Error|null     // Error if any
}
```

**Example:**

```jsx
import { useUpcomingEvents } from "../hooks/useUpcomingEvents";

const EventsSection = () => {
  const { events, loading } = useUpcomingEvents();

  return (
    <SimpleGrid>
      {events.slice(0, 3).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </SimpleGrid>
  );
};
```

## Features

- ✅ Automatic data fetching on mount
- ✅ Error handling with fallback data
- ✅ Loading states
- ✅ Parallel API calls (useFeaturedProjects)
- ✅ Data transformation
- ✅ Console error logging
- ✅ Mock data fallback for development

## Best Practices

1. **Always handle loading state**:

   ```jsx
   if (loading) return <LoadingGrid />;
   ```

2. **Handle errors gracefully**:

   ```jsx
   if (error) return <ErrorMessage error={error} />;
   ```

3. **Provide fallback UI**:

   ```jsx
   {
     projects.length === 0 ? <EmptyState /> : <ProjectGrid />;
   }
   ```

4. **Memoize expensive operations**:
   ```jsx
   const sortedProjects = useMemo(
     () => projects.sort((a, b) => b.votes - a.votes),
     [projects]
   );
   ```

## Dependencies

These hooks depend on:

- `../config.js` - API configuration
- `../services/blogService.js` - Blog service utilities

Make sure these are properly configured in your project.
