import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
// import { getStories, getStoryById, getCategories } from '../utils/mockData.js'; // Import your mock data functions
import { getStories, getStoryById, getCategories } from '../utils/client.js';
import PropTypes from 'prop-types'; // Import PropTypes

// Create a Context
const StoryContext = createContext({
  categories: [],
  stories: {},
  currentStory: {},
  fetchStories: () => {},
  fetchCurrentStory: () => {},
  fetchCategories: () => {},
});

// Create a Provider component
export function StoryProvider({ children }) {
  const [rawStories, setRawStories] = useState({});
  const [currentStory, setCurrentStory] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  }, []);

  const fetchStories = useCallback(async () => {
    const res = await getStories();
    setRawStories(res.data.data);
  }, []);

  const fetchCurrentStory = useCallback(async (storyId) => {
    try {
      const fetchedStory = await getStoryById(storyId);
      setCurrentStory(fetchedStory.data.data);
    } catch (error) {
      console.error('Error fetching story:', storyId, error);
    }
  }, []);

  const stories = useMemo(() => {
    if (!rawStories.length || !categories.length) {
      fetchCategories();
      fetchStories();
      return {};
    }
    const storiesByTag = {};
    categories.forEach((category) => {
      storiesByTag[category.name] = rawStories.filter((story) =>
        story.categories.some(
          (storyCategory) => storyCategory.id === category.id
        )
      );
    });
    return storiesByTag;
  }, [categories, rawStories, fetchStories, fetchCategories]);

  return (
    <StoryContext.Provider
      value={{
        stories,
        currentStory,
        categories,
        fetchStories,
        fetchCurrentStory,
        fetchCategories,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

// Add prop types validation
StoryProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is required
};

// this is a custom hook, the name must start with "use"
export default function useStories() {
  return useContext(StoryContext);
}
