import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
// import { getStories, getStoryById, getCategories } from '../utils/mockData.js'; // Import your mock data functions
import { getActivities } from '../utils/mockData.js';
import { getStories, getStoryById, getCategories } from '../utils/client.js';
import PropTypes from 'prop-types'; // Import PropTypes
import { getQuizzes } from '../utils/mockData.js';

// Create a Context
const StoryContext = createContext({
  categories: [],
  activities: [],
  stories: {},
  currentStory: {},
  fetchStories: () => {},
  fetchCurrentStory: () => {},
  fetchCategories: () => {},
  fetchActivities: () => {},
  fetchQuizzes: () => {},
});

// Create a Provider component
export function StoryProvider({ children }) {
  const [rawStories, setRawStories] = useState({});
  const [currentStory, setCurrentStory] = useState({});
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [quizzes, setQuizzes] = useState([]); 

  const fetchCategories = useCallback(async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  }, []);

  const fetchStories = useCallback(async () => {
    const res = await getStories();
    setRawStories(res.data.data);
  }, []);

  const fetchActivities = useCallback(async () => {
    const res = await getActivities();
    setActivities(res.data.data);
  }, []);

  const fetchCurrentStory = useCallback(async (storyId) => {
    try {
      const fetchedStory = await getStoryById(storyId);
      setCurrentStory(fetchedStory.data.data);
    } catch (error) {
      console.error('Error fetching story:', storyId, error);
    }
  }, []);

  const fetchQuizzes = useCallback(async () => {
    try {
      const res = await getQuizzes();
      console.log('Fetched quizzes:', res.data.data); // Verify data
      setQuizzes(res.data.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
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
        activities,
        currentStory,
        categories,
        quizzes,
        fetchStories,
        fetchCurrentStory,
        fetchCategories,
        fetchActivities,
        fetchQuizzes,
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
