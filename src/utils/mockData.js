const stories = [
  {
    id: '0',
    title: '虎姑婆',
    description: '一個關於堅韌與冒險的故事，講述跨越大陸的旅程。',
    cover_image_url:
      'https://truth.bahamut.com.tw/s01/201806/88eee22272e3898b8e31e12afc76fc97.JPG',
    tags: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-01-15T08:45:30Z',
    updated_at: '2023-02-10T10:20:45Z',
  },
  {
    id: '1',
    title: '七爺八爺',
    description: '探索都市心臟地帶的繁華生活與隱藏的寶藏。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/001.png',
    tags: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-03-22T12:34:56Z',
    updated_at: '2023-03-23T14:15:10Z',
  },
  {
    id: '2',
    title: '媽祖',
    description: '一個關於奉獻與保護人民的女神的故事。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/002.png',
    tags: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-04-01T09:00:00Z',
    updated_at: '2023-04-02T10:00:00Z',
  },
  {
    id: '3',
    title: '老鼠娶新娘',
    description: '一個關於老鼠尋找新娘的奇幻故事。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/003.png',
    tags: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-05-10T11:15:30Z',
    updated_at: '2023-05-11T12:20:45Z',
  },
  {
    id: '4',
    title: '年獸',
    description: '一個在農曆新年期間面對神話野獸的驚險冒險。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/004.png',
    tags: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-06-15T14:30:00Z',
    updated_at: '2023-06-16T15:45:00Z',
  },
  {
    id: '5',
    title: '小美人魚',
    description: '一個美麗的故事，講述美人魚對人類世界的渴望。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/005.png',
    tags: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-01T10:00:00Z',
    updated_at: '2023-07-02T11:00:00Z',
  },
  {
    id: '6',
    title: '醜小鴨',
    description: '一隻小鴨變成美麗天鵝的故事。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/006.png',
    tags: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-10T12:00:00Z',
    updated_at: '2023-07-11T13:00:00Z',
  },
  {
    id: '7',
    title: '皇帝的新衣',
    description: '一個關於虛榮與真相的故事。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/007.png',
    tags: [{ id: '103', name: '新星專區' }],
    created_at: '2023-07-15T14:00:00Z',
    updated_at: '2023-07-16T15:00:00Z',
  },
  {
    id: '8',
    title: '拇指姑娘',
    description: '一個小女孩的冒險與尋找愛情的故事。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/008.png',
    tags: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-20T16:00:00Z',
    updated_at: '2023-07-21T17:00:00Z',
  },
  {
    id: '9',
    title: '雪女',
    description: '一個關於愛與失落的故事，發生在雪地中。',
    cover_image_url: 'https://pokemon.wingzero.tw/assets/pokemon/009.png',
    tags: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-25T18:00:00Z',
    updated_at: '2023-07-26T19:00:00Z',
  },
];

// Define functions to simulate backend behavior
export const fetchStories = () => {
  // Simulate a network request delay with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stories);
    }, 500); // 500ms delay
  });
};

export const fetchStoryById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const story = stories.find((story) => story.id === id);
      if (story) {
        resolve(story);
      } else {
        reject(new Error('Story not found'));
      }
    }, 500);
  });
};

export const fetchStoryByTag = (tagId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredStories = stories.filter((story) =>
        story.tags.some((tag) => tag.id === tagId)
      );
      resolve(filteredStories);
    }, 500);
  });
};

export const addStory = (newStory) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const story = { ...newStory, id: String(stories.length + 1) };
      stories.push(story);
      resolve(story);
    }, 500);
  });
};

// Function to get all unique tags
export const getAllTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allTags = stories.flatMap((story) => story.tags); // Flatten the array of tags
      const uniqueTags = [];
      allTags.forEach((tag) => {
        if (!uniqueTags.some((uniqueTag) => uniqueTag.id === tag.id)) {
          uniqueTags.push(tag); // Add unique tags only
        }
      });
      resolve(uniqueTags); // Return unique tags
    }, 500); // Simulate network delay
  });
};

export const updateStory = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storyIndex = stories.findIndex((story) => story.id === id);
      if (storyIndex === -1) {
        reject(new Error('Story not found'));
      } else {
        stories[storyIndex] = { ...stories[storyIndex], ...updatedData };
        resolve(stories[storyIndex]);
      }
    }, 500);
  });
};

export const deleteStory = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storyIndex = stories.findIndex((story) => story.id === id);
      if (storyIndex === -1) {
        reject(new Error('Story not found'));
      } else {
        const deletedStory = stories.splice(storyIndex, 1);
        resolve(deletedStory);
      }
    }, 500);
  });
};

// example usage
// const tags = await getAllTags();
// console.log(tags);

// tags.forEach(async (tag) => {
//   const storiesWithTag = await fetchStoryByTag(tag.id);
//   console.log(`Stories for tag ${tag.id}:`, storiesWithTag);
// });
