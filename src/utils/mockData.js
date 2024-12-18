const stories = [
  {
    id: '0',
    title: '虎姑婆',
    description: '一個關於堅韌與冒險的故事，講述跨越大陸的旅程。',
    cover_image:
      'https://truth.bahamut.com.tw/s01/201806/88eee22272e3898b8e31e12afc76fc97.JPG',
    categories: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-01-15T08:45:30Z',
    updated_at: '2023-02-10T10:20:45Z',
  },
  {
    id: '1',
    title: '七爺八爺',
    description: '探索都市心臟地帶的繁華生活與隱藏的寶藏。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/001.png',
    categories: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-03-22T12:34:56Z',
    updated_at: '2023-03-23T14:15:10Z',
  },
  {
    id: '2',
    title: '媽祖',
    description: '一個關於奉獻與保護人民的女神的故事。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/002.png',
    categories: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-04-01T09:00:00Z',
    updated_at: '2023-04-02T10:00:00Z',
  },
  {
    id: '3',
    title: '老鼠娶新娘',
    description: '一個關於老鼠尋找新娘的奇幻故事。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/003.png',
    categories: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-05-10T11:15:30Z',
    updated_at: '2023-05-11T12:20:45Z',
  },
  {
    id: '4',
    title: '年獸',
    description: '一個在農曆新年期間面對神話野獸的驚險冒險。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/004.png',
    categories: [{ id: '101', name: '台灣民間故事' }],
    created_at: '2023-06-15T14:30:00Z',
    updated_at: '2023-06-16T15:45:00Z',
  },
  {
    id: '5',
    title: '小美人魚',
    description: '一個美麗的故事，講述美人魚對人類世界的渴望。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/005.png',
    categories: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-01T10:00:00Z',
    updated_at: '2023-07-02T11:00:00Z',
  },
  {
    id: '6',
    title: '醜小鴨',
    description: '一隻小鴨變成美麗天鵝的故事。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/006.png',
    categories: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-10T12:00:00Z',
    updated_at: '2023-07-11T13:00:00Z',
  },
  {
    id: '7',
    title: '皇帝的新衣',
    description: '一個關於虛榮與真相的故事。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/007.png',
    categories: [{ id: '103', name: '新星專區' }],
    created_at: '2023-07-15T14:00:00Z',
    updated_at: '2023-07-16T15:00:00Z',
  },
  {
    id: '8',
    title: '拇指姑娘',
    description: '一個小女孩的冒險與尋找愛情的故事。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/008.png',
    categories: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-20T16:00:00Z',
    updated_at: '2023-07-21T17:00:00Z',
  },
  {
    id: '9',
    title: '雪女',
    description: '一個關於愛與失落的故事，發生在雪地中。',
    cover_image: 'https://pokemon.wingzero.tw/assets/pokemon/009.png',
    categories: [{ id: '102', name: '安徒生童話故事' }],
    created_at: '2023-07-25T18:00:00Z',
    updated_at: '2023-07-26T19:00:00Z',
  },
];

const pages = [
  {
    id: '0',
    page_number: '1',
    content:
      '深山裡住著一家人，有一天，爸媽要出門辦事，只留姊弟兩人看家。因為深山裡有會吃人的妖怪，所以爸媽出門前特別交代，千萬不能讓不認識的人進門。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/011.png',
    audios: [
      {
        id: '0',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_30_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '1',
    page_number: '2',
    content:
      '到了晚上，忽然間有人來敲門。姊姊問：「是誰啊？」有個聲音回答：「我是虎姑婆，我知道你們爸媽不在家，怕你們肚子餓，特地帶點心來給你們吃。」聰明的姊姊說：「我們不認識什麼虎姑婆，所以我不能開門。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/012.png',
    audios: [
      {
        id: '1',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_31_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '2',
    page_number: '3',
    content:
      '但是貪吃的弟弟一聽到有點心，早把爸媽的叮嚀忘了，搶著開門請虎姑婆進來。這個虎姑婆長得好奇怪，臉上有鬍子，原來這位虎姑婆是山裡的老虎變的。弟弟撒嬌地說：「虎姑婆，快把您帶來的點心給我吃吧，我肚子好餓。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/013.png',
    audios: [
      {
        id: '2',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_32_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '3',
    page_number: '4',
    content:
      '虎姑婆說：「今天晚上誰跟我睡，我就給誰點心吃。」貪吃的弟弟立刻跑上前去跟虎姑婆睡ㄧ張床，姊姊只好睡另一張床。到了半夜，姊姊被「格崩、格崩」咬東西的聲音吵醒，黑暗中姊姊看不清楚，就問：「虎姑婆，您在吃東西嗎？我肚子也餓了，可不可以分我一點？」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/014.png',
    audios: [
      {
        id: '3',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_33_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '4',
    page_number: '5',
    content:
      '於是虎姑婆遞過來一個小東西，姊姊拿過來一看，是弟弟的手指。原來弟弟被可怕的虎姑婆給吃了，自己不逃走怎麼行？於是姊姊說：「虎姑婆，我想去廁所。」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/015.png',
    audios: [
      {
        id: '4',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_34_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '5',
    page_number: '6',
    content:
      '虎姑婆怕姊姊會逃走，就拿一條繩子把她綁住，然後回答：「好，妳快去快回。」姊姊一出門，就把繩子解開，栓在柱子上。但是虎姑婆等很久，原來姊姊早就爬到樹上去了，虎姑婆氣得大吼大叫：「快下來，我要吃了妳！」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/016.png',
    audios: [
      {
        id: '5',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_35_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '6',
    page_number: '7',
    content:
      '姊姊說：「可是我的肉不好吃，不如您去燒鍋油來，把我炸熟了，味道比較好。」虎姑婆一聽，覺得很有道理，便燒了一大鍋油來，對姊姊說：「油燒好了，妳可以下來讓我吃了吧！」',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/017.png',
    audios: [
      {
        id: '6',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_36_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '7',
    page_number: '8',
    content:
      '姊姊說：「這樣太辛苦您了，還是拿繩子把油吊上樹，讓我先進油鍋把自己炸熟，再直接跳進您嘴裡吧！」這個虎姑婆實在有夠笨、有夠恐怖，牠覺得這個方法的確更好，便把油鍋吊上樹，然後自己坐在樹下張大嘴巴，等姊姊跳下來。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/018.png',
    audios: [
      {
        id: '7',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_29_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
  {
    id: '8',
    page_number: '9',
    content:
      '聰明的姊姊當然不會把自己炸熟，而是把一鍋滾燙的油對準虎姑婆的大嘴倒下去，就這樣把虎姑婆燙死了。',
    narration_url: 'https://pokemon.wingzero.tw/assets/pokemon/019.png',
    audios: [
      {
        id: '8',
        audio_url:
          'https://language.moe.gov.tw/upload/download/jts/03語句1(音檔)/0301_01_30_07.mp3',
        dialect: 'zh-TW',
      },
    ],
  },
];

// const quizzes = [
//   {
//     id: '1',
//     question: 'What is the capital of France?',
//     type: 'multiple-choice',
//     choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
//     correctAnswer: 'Paris',
//   },
//   {
//     id: '2',
//     question: 'Solve: 5 + 3',
//     type: 'fill-in-the-blank',
//     correctAnswer: '8',
//   },
//   {
//     id: '3',
//     question: 'Which is the largest planet in our solar system?',
//     type: 'multiple-choice',
//     choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
//     correctAnswer: 'Jupiter',
//   },
// ];

const quizzes = [
  {
    id: 1,
    story_id: 2,
    type: 1,
    prompt_text: '為什麼爸爸媽媽出門前交代姊弟不能讓陌生人進門？',
    audio_url: '',
    choices: [
      {
        id: 9,
        choice_text: '怕有虎姑婆出沒',
      },
      {
        id: 10,
        choice_text: '怕姊弟吵架',
      },
      {
        id: 11,
        choice_text: '怕家裡失火',
      },
      {
        id: 12,
        choice_text: '怕姊弟忘記做家務',
      },
    ],
  },
  {
    id: 2,
    story_id: 2,
    type: 1,
    prompt_text: '「格崩、格崩」的聲音是什麼？',
    audio_url: '',
    choices: [
      {
        id: 5,
        choice_text: '虎姑婆在敲門的聲音',
      },
      {
        id: 6,
        choice_text: '姊姊在說話的聲音',
      },
      {
        id: 7,
        choice_text: '虎姑婆咬東西的聲音',
      },
      {
        id: 8,
        choice_text: '弟弟在睡覺的聲音',
      },
    ],
  },
  {
    id: 3,
    story_id: 2,
    type: 1,
    prompt_text: '姊姊最後是怎麼把虎姑婆解決的？',
    audio_url: '',
    choices: [
      {
        id: 25,
        choice_text: '用繩子把虎姑婆綁起來',
      },
      {
        id: 26,
        choice_text: '請爸爸媽媽回來幫忙',
      },
      {
        id: 27,
        choice_text: '用滾燙的油倒進虎姑婆的嘴巴',
      },
      {
        id: 28,
        choice_text: '把虎姑婆鎖在家裡',
      },
    ],
  },
  {
    id: 4,
    story_id: 2,
    type: 1,
    prompt_text: '為什麼弟弟想打開門讓虎姑婆進來？',
    audio_url: '',
    choices: [
      {
        id: 21,
        choice_text: '弟弟認識虎姑婆',
      },
      {
        id: 22,
        choice_text: '弟弟貪吃，聽到有點心',
      },
      {
        id: 23,
        choice_text: '弟弟害怕虎姑婆',
      },
      {
        id: 24,
        choice_text: '弟弟忘記媽媽的叮囑',
      },
    ],
  },
  {
    id: 5,
    story_id: 2,
    type: 1,
    prompt_text: '故事裡的虎姑婆其實是什麼動物變的？',
    audio_url: '',
    choices: [
      {
        id: 29,
        choice_text: '老虎',
      },
      {
        id: 30,
        choice_text: '狐狸',
      },
      {
        id: 31,
        choice_text: '熊',
      },
      {
        id: 32,
        choice_text: '貓',
      },
    ],
  },
  {
    id: 6,
    story_id: 2,
    type: 0,
    prompt_text: '深山仔內佇囡了一戶人家，「深山仔」的意思是',
    audio_url: '',
    choices: [],
  },
  {
    id: 7,
    story_id: 2,
    type: 0,
    prompt_text: '爸母去外面頭公事，「公事」的意思是',
    audio_url: '',
    choices: [],
  },
];

const answers = [
  {
    quiz_id: 1,
    answer: '怕有虎姑婆出沒',
  },
  {
    quiz_id: 2,
    answer: '虎姑婆咬東西的聲音',
  },
  {
    quiz_id: 3,
    answer: '用滾燙的油倒進虎姑婆的嘴巴',
  },
  {
    quiz_id: 4,
    answer: '弟弟貪吃，聽到有點心',
  },
  {
    quiz_id: 5,
    answer: '老虎',
  },
  {
    quiz_id: 6,
    answer: '深山仔',
  },
  {
    quiz_id: 7,
    answer: '頭公事',
  },
];

const activities = [
  {
    id: '0',
    title: '第三期 新星專區 桃園你和我',
    description: '114-03-14 故事',
    type: '1',
  },
  {
    id: '1',
    title: '第二期 新星專區 我的台灣記憶',
    description: '114-02-14 故事',
    type: '1',
  },
  {
    id: '2',
    title: '第一期 封面故事投稿獲獎名單',
    description: '114-01-28 封面',
    type: '1',
  },
  {
    id: '3',
    title: '茶香四溢，吃得客家文化',
    description: '114-07-03 大型活動',
    duration: '114/07/19',
    type: '2',
  },
  {
    id: '4',
    title: '你客了嗎？',
    description: '114-05-14 小型活動',
    duration: '114/05/24 ~ 114/05/25',
    type: '2',
  },
  {
    id: '5',
    title: '桃園天穿日',
    description: '114-05-14 小型活動',
    type: '3',
  },
  {
    id: '6',
    title: '桃園魯冰花活動',
    description: '114-05-14 小型活動',
    type: '3',
  },
  {
    id: '7',
    title: '桃園桐花祭',
    description: '114-05-14 小型活動',
    type: '3',
  },
  {
    id: '8',
    title: '桃園客語講故事比賽',
    description: '114-05-14 小型活動',
    type: '3',
  },
  {
    id: '9',
    title: '海客文化藝術季',
    description: '114-05-14 小型活動',
    type: '3',
  },
  {
    id: '10',
    title: '乙未客家戰役文化季',
    description: '114-05-14 小型活動',
    type: '3',
  },
];

// Define functions to simulate backend behavior
export const getStories = () => {
  // Simulate a network request delay with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        data: {
          data: stories,
        },
      };
      resolve(data);
    }, 500); // 500ms delay
  });
};

export const getStoryById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const story = stories.find((story) => story.id === id);
      if (story) {
        story['pages'] = pages;
        const data = {
          data: {
            data: story,
          },
        };
        resolve(data);
      } else {
        reject(new Error('Story not found'));
      }
    }, 500);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: [
            { id: '101', name: '台灣民間故事' },
            { id: '102', name: '安徒生童話故事' },
            { id: '103', name: '新星專區' },
          ],
        },
      });
    }, 500);
  });
};

export const getActivities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: activities,
        },
      });
    }, 500);
  });
};

// Mock function to simulate fetching quizzes
export const getQuizzes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: quizzes,
        },
      });
    }, 500); // Simulate a network delay
  });
};

export const getAnswerById = async (exerciseIndex, type, userAnswers) => {
  return new Promise((resolve) => {
    const correctAns = answers.find(
      (answer) => answer.quiz_id === exerciseIndex
    ).answer;
    const isCorrect = userAnswers === correctAns;
    // console.log("isCorrect", isCorrect);

    setTimeout(() => {
      resolve({
        data: {
          data: {
            answers: correctAns,
            is_correct: isCorrect,
          },
        },
      });
    }, 500);
  });
};
