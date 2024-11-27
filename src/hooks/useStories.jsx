import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import {
  getStories,
  getStoryById,
} from '../utils/mockData.js'; // Import your mock data functions
import PropTypes from 'prop-types'; // Import PropTypes


// Create a Context
const StoryContext = createContext({
  tags: [],
  stories: {},
  currentStory: {},
  fetchStories: () => {},
  fetchCurrentStory: () => {},
});

// Create a Provider component
export function StoryProvider ({ children }) {
  const [rawStories, setRawStories] = useState({});
  const [currentStory, setCurrentStory] = useState({});

  const fetchStories = useCallback(async () => {
    const data = await getStories();
    setRawStories(data);
  }, []);

  const fetchCurrentStory = useCallback(async (storyId) => {
    try{
      const fetchedStory = await getStoryById(storyId);
      setCurrentStory(fetchedStory);
    } catch (error) {
      console.error('Error fetching story:', storyId, error);
    }
  }, []);

  const tags = useMemo(() => {
    const uniqueTags = [];
    if(!rawStories.length) return uniqueTags;
    rawStories.forEach((story) => {
      story.tags.forEach((tag) => {
        if (!uniqueTags.some((uniqueTag) => uniqueTag.id === tag.id)) {
          uniqueTags.push(tag);
        }
      });
    });
    return uniqueTags;
  }, [rawStories]);

  const stories = useMemo(() => {
    const storiesByTag = {};
    tags.forEach((tag) => {
      storiesByTag[tag.name] = rawStories.filter((story) =>
        story.tags.some((storyTag) => storyTag.id === tag.id)
      );
    });
    return storiesByTag;
  }, [tags, rawStories]);

  return (
    <StoryContext.Provider
      value={{ tags, stories, currentStory, fetchStories, fetchCurrentStory }}
    >
      {children}
    </StoryContext.Provider>
  );
};

// Add prop types validation
StoryProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is required
};


// this is a custom hook, the name must start with "use"
export default function useStories() {
  return useContext(StoryContext);
}
