// src/context/DataContext.js

import { createContext, useState, useEffect, useCallback } from 'react';
import { getAllTags, fetchStoryByTag } from '../utils/mockData.js'; // Import your mock data functions
import PropTypes from 'prop-types'; // Import PropTypes

// Create a Context
const DataContext = createContext();

// Create a Provider component
const DataProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [stories, setStories] = useState({});

  const fetchTags = async () => {
    const fetchedTags = await getAllTags();
    setTags(fetchedTags);
  };

  const fetchStories = useCallback(async (tag) => {
    if (tag) {
      const storiesWithTag = await fetchStoryByTag(tag.id);
      setStories((prevStories) => ({
        ...prevStories,
        [tag.name]: storiesWithTag,
      }));
    }
  }, []);

  const findBookById = (targetId) => {
    console.log('find book with id = ', targetId);
    console.log(stories);
    for (let tag in stories) {
      const book = stories[tag].find((book) => book.id === targetId);
      if (book) {
        return book;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    tags.forEach((tag) => fetchStories(tag));
  }, [tags, fetchStories]);

  return (
    <DataContext.Provider value={{ tags, stories, findBookById }}>
      {children}
    </DataContext.Provider>
  );
};

// Add prop types validation
DataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is required
};

// Export the context and provider
export { DataContext, DataProvider };
