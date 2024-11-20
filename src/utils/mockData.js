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

const pages = [
  {
    id: '0',
    story_id: '0',
    page_number: '1',
    content:
      '深山裡住著一家人，有一天，爸媽要出門辦事，只留姊弟兩人看家。因為深山裡有會吃人的妖怪，所以爸媽出門前特別交代，千萬不能讓不認識的人進門。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/011.png',
  },
  {
    id: '1',
    story_id: '0',
    page_number: '2',
    content:
      '到了晚上，忽然間有人來敲門。姊姊問：「是誰啊？」有個聲音回答：「我是虎姑婆，我知道你們爸媽不在家，怕你們肚子餓，特地帶點心來給你們吃。」聰明的姊姊說：「我們不認識什麼虎姑婆，所以我不能開門。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/012.png',
  },
  {
    id: '2',
    story_id: '0',
    page_number: '3',
    content:
      '但是貪吃的弟弟一聽到有點心，早把爸媽的叮嚀忘了，搶著開門請虎姑婆進來。這個虎姑婆長得好奇怪，臉上有鬍子，原來這位虎姑婆是山裡的老虎變的。弟弟撒嬌地說：「虎姑婆，快把您帶來的點心給我吃吧，我肚子好餓。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/013.png',
  },
  {
    id: '3',
    story_id: '0',
    page_number: '4',
    content:
      '虎姑婆說：「今天晚上誰跟我睡，我就給誰點心吃。」貪吃的弟弟立刻跑上前去跟虎姑婆睡ㄧ張床，姊姊只好睡另一張床。到了半夜，姊姊被「格崩、格崩」咬東西的聲音吵醒，黑暗中姊姊看不清楚，就問：「虎姑婆，您在吃東西嗎？我肚子也餓了，可不可以分我一點？」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/014.png',
  },
  {
    id: '4',
    story_id: '0',
    page_number: '5',
    content:
      '於是虎姑婆遞過來一個小東西，姊姊拿過來一看，是弟弟的手指。原來弟弟被可怕的虎姑婆給吃了，自己不逃走怎麼行？於是姊姊說：「虎姑婆，我想去廁所。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/015.png',
  },
  {
    id: '5',
    story_id: '0',
    page_number: '6',
    content:
      '虎姑婆怕姊姊會逃走，就拿一條繩子把她綁住，然後回答：「好，妳快去快回。」姊姊一出門，就把繩子解開，栓在柱子上。但是虎姑婆等很久，原來姊姊早就爬到樹上去了，虎姑婆氣得大吼大叫：「快下來，我要吃了妳！」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/016.png',
  },
  {
    id: '6',
    story_id: '0',
    page_number: '7',
    content:
      '姊姊說：「可是我的肉不好吃，不如您去燒鍋油來，把我炸熟了，味道比較好。」虎姑婆一聽，覺得很有道理，便燒了一大鍋油來，對姊姊說：「油燒好了，妳可以下來讓我吃了吧！」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/017.png',
  },
  {
    id: '7',
    story_id: '0',
    page_number: '8',
    content:
      '姊姊說：「這樣太辛苦您了，還是拿繩子把油吊上樹，讓我先進油鍋把自己炸熟，再直接跳進您嘴裡吧！」這個虎姑婆實在有夠笨、有夠恐怖，牠覺得這個方法的確更好，便把油鍋吊上樹，然後自己坐在樹下張大嘴巴，等姊姊跳下來。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/018.png',
  },
  {
    id: '8',
    story_id: '0',
    page_number: '9',
    content:
      '聰明的姊姊當然不會把自己炸熟，而是把一鍋滾燙的油對準虎姑婆的大嘴倒下去，就這樣把虎姑婆燙死了。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/019.png',
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

export const fetchPagesByStoryId = (storyId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPages = pages.filter((page) => page.story_id === storyId);
      resolve(filteredPages);
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