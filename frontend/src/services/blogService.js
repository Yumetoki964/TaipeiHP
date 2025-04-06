import { NEWS } from '../shared';

/**
 * ブログ記事の取得と管理を行うサービス
 */

/**
 * 最新のブログ記事を取得する
 * @param {number} limit - 取得する記事数
 * @returns {Promise<Array>} ブログ記事の配列
 */
export const getLatestPosts = async (limit = 6) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(`${NEWS.LIST}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      return getMockBlogData(limit);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // エラーが発生した場合はモックデータを返す
    return getMockBlogData(limit);
  }
};

/**
 * 特定のブログ記事を取得する
 * @param {string} postId - 取得するブログ記事のID
 * @returns {Promise<Object>} ブログ記事のオブジェクト
 */
export const getPostById = async (postId) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(NEWS.DETAIL(postId));
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      const allPosts = getMockBlogData();
      const post = allPosts.find(item => item.id.toString() === postId);
      
      if (!post) {
        throw new Error('Blog post not found');
      }
      
      return post;
    }
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    // エラーが発生した場合はnullを返す
    return null;
  }
};

/**
 * カテゴリでブログ記事をフィルタリングして取得する
 * @param {string} category - フィルタリングするカテゴリ
 * @param {number} limit - 取得する記事数
 * @returns {Promise<Array>} ブログ記事の配列
 */
export const getPostsByCategory = async (category, limit = 10) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(`${NEWS.LIST}?category=${category}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      const allPosts = getMockBlogData();
      const filteredPosts = allPosts.filter(item => {
        return Object.values(item.category).some(cat => 
          cat.toLowerCase().includes(category.toLowerCase())
        );
      });
      
      return filteredPosts.slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
};

/**
 * キーワードでブログ記事を検索する
 * @param {string} keyword - 検索キーワード
 * @param {number} limit - 取得する記事数
 * @returns {Promise<Array>} ブログ記事の配列
 */
export const searchPosts = async (keyword, limit = 10) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(`${NEWS.LIST}?search=${keyword}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      const allPosts = getMockBlogData();
      const searchedPosts = allPosts.filter(item => {
        // タイトルと内容で検索
        const titleMatch = Object.values(item.title).some(title => 
          title.toLowerCase().includes(keyword.toLowerCase())
        );
        const contentMatch = Object.values(item.content).some(content => 
          content.toLowerCase().includes(keyword.toLowerCase())
        );
        
        return titleMatch || contentMatch;
      });
      
      return searchedPosts.slice(0, limit);
    }
  } catch (error) {
    console.error('Error searching posts:', error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
};

/**
 * スラッグからブログ記事を取得する
 * @param {string} slug - ブログ記事のスラッグ
 * @returns {Promise<Object>} ブログ記事のオブジェクト
 */
export const getPostBySlug = async (slug) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(`${NEWS.LIST}?slug=${slug}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data[0] || null; // 最初の結果を返す（またはnull）
    } else {
      // APIがない場合はモックデータを返す
      const allPosts = getMockBlogData();
      return allPosts.find(item => item.slug === slug) || null;
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    // エラーが発生した場合はnullを返す
    return null;
  }
};

/**
 * すべてのブログカテゴリを取得する
 * @returns {Promise<Array>} カテゴリの配列（各言語対応）
 */
export const getAllCategories = async () => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(`${NEWS.LIST}/categories`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      const allPosts = getMockBlogData();
      // カテゴリを重複なく抽出
      const categories = [];
      allPosts.forEach(post => {
        const categoryExists = categories.some(cat => 
          cat.zh === post.category.zh && 
          cat.ja === post.category.ja && 
          cat.en === post.category.en
        );
        
        if (!categoryExists) {
          categories.push(post.category);
        }
      });
      
      return categories;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
};

/**
 * ブログのモックデータを生成する
 * @param {number} limit - 返す記事数
 * @returns {Array} ブログ記事の配列
 * @private
 */
const getMockBlogData = (limit = 999) => {
  // 教育コラム・ブログのモックデータを定義
  const blogData = [
    {
      id: "1",
      title: {
        zh: '如何培養孩子的自主學習能力',
        ja: '子どもの自主学習能力を育てる方法',
        en: 'How to Develop Self-Learning Skills in Children'
      },
      content: {
        zh: '自主學習是終身學習的基礎。本文探討如何從小培養孩子的自主學習能力，包括設定適當的學習環境、培養好奇心、建立學習習慣等方面的建議。',
        ja: '自主学習は生涯学習の基礎です。本記事では、適切な学習環境の設定、好奇心の育成、学習習慣の確立など、子どもの自主学習能力を幼少期から育てる方法について考察します。',
        en: 'Self-directed learning is the foundation of lifelong learning. This article explores how to develop self-learning abilities in children from an early age, including setting up an appropriate learning environment, fostering curiosity, and establishing learning habits.'
      },
      excerpt: {
        zh: '自主學習是終身學習的基礎。本文探討如何從小培養孩子的自主學習能力...',
        ja: '自主学習は生涯学習の基礎です。本記事では、子どもの自主学習能力を幼少期から育てる方法について...',
        en: 'Self-directed learning is the foundation of lifelong learning. This article explores how to develop self-learning abilities in children...'
      },
      date: '2023-06-15',
      author: {
        zh: '李教授',
        ja: 'リー教授',
        en: 'Professor Li'
      },
      image: '/assets/images/blog/self-learning.jpg',
      category: {
        zh: '教育方法',
        ja: '教育方法',
        en: 'Educational Methods'
      },
      slug: 'developing-self-learning-skills',
      tags: ['self-learning', 'education', 'childhood-development']
    },
    {
      id: "2",
      title: {
        zh: '應試教育與素質教育的平衡',
        ja: '受験教育と資質教育のバランス',
        en: 'Balancing Test-Oriented and Quality Education'
      },
      content: {
        zh: '在競爭激烈的教育環境中，如何平衡應試教育與素質教育？本文分析兩種教育理念的優缺點，並提供實用的建議，幫助家長和教育者找到平衡點。',
        ja: '競争の激しい教育環境において、受験教育と資質教育のバランスをどのように取るべきでしょうか？本記事では、2つの教育理念の長所と短所を分析し、親や教育者がバランスを見つけるための実用的なアドバイスを提供します。',
        en: 'In a competitive educational environment, how do we balance test-oriented and quality education? This article analyzes the pros and cons of both educational philosophies and provides practical advice to help parents and educators find a balance.'
      },
      excerpt: {
        zh: '在競爭激烈的教育環境中，如何平衡應試教育與素質教育？本文分析兩種教育理念的優缺點...',
        ja: '競争の激しい教育環境において、受験教育と資質教育のバランスをどのように取るべきでしょうか？...',
        en: 'In a competitive educational environment, how do we balance test-oriented and quality education? This article analyzes...'
      },
      date: '2023-05-28',
      author: {
        zh: '王老師',
        ja: 'ワン先生',
        en: 'Teacher Wang'
      },
      image: '/assets/images/blog/education-balance.jpg',
      category: {
        zh: '教育理念',
        ja: '教育理念',
        en: 'Educational Philosophy'
      },
      slug: 'test-oriented-vs-quality-education',
      tags: ['education-philosophy', 'exam-preparation', 'quality-education']
    },
    {
      id: "3",
      title: {
        zh: '數學學習困難的克服方法',
        ja: '数学の学習困難を克服する方法',
        en: 'Methods to Overcome Difficulties in Learning Mathematics'
      },
      content: {
        zh: '很多學生在學習數學時遇到困難。本文提供一系列實用的方法和策略，幫助學生克服數學恐懼，建立數學思維，提高學習效果。',
        ja: '多くの生徒が数学の学習に困難を感じています。本記事では、生徒が数学への恐怖を克服し、数学的思考を構築し、学習効果を高めるための一連の実用的な方法と戦略を提供します。',
        en: 'Many students face difficulties when learning mathematics. This article provides a series of practical methods and strategies to help students overcome math anxiety, build mathematical thinking, and improve learning outcomes.'
      },
      excerpt: {
        zh: '很多學生在學習數學時遇到困難。本文提供一系列實用的方法和策略，幫助學生克服數學恐懼...',
        ja: '多くの生徒が数学の学習に困難を感じています。本記事では、生徒が数学への恐怖を克服するための方法を...',
        en: 'Many students face difficulties when learning mathematics. This article provides practical methods to help students overcome math anxiety...'
      },
      date: '2023-05-10',
      author: {
        zh: '張數學教師',
        ja: 'チャン数学教師',
        en: 'Math Teacher Chang'
      },
      image: '/assets/images/blog/math-learning.jpg',
      category: {
        zh: '學科指導',
        ja: '教科指導',
        en: 'Subject Guidance'
      },
      slug: 'overcoming-math-difficulties',
      tags: ['mathematics', 'learning-difficulties', 'study-strategies']
    },
    {
      id: "4",
      title: {
        zh: '高效記憶法：如何準備考試',
        ja: '効果的な記憶法：試験の準備方法',
        en: 'Effective Memorization Techniques for Exam Preparation'
      },
      content: {
        zh: '記憶是學習的重要部分，尤其在準備考試時。本文介紹多種科學驗證的記憶技巧，包括間隔重複、連想記憶法、思維導圖等，幫助學生更高效地準備考試。',
        ja: '記憶は学習の重要な部分であり、特に試験準備においてそうです。本記事では、間隔反復、連想記憶法、マインドマップなど、科学的に検証された複数の記憶テクニックを紹介し、生徒がより効率的に試験準備を行えるようサポートします。',
        en: 'Memory is a crucial part of learning, especially when preparing for exams. This article introduces several scientifically-validated memorization techniques, including spaced repetition, associative memory, mind mapping, and more, to help students prepare for exams more efficiently.'
      },
      excerpt: {
        zh: '記憶是學習的重要部分，尤其在準備考試時。本文介紹多種科學驗證的記憶技巧...',
        ja: '記憶は学習の重要な部分であり、特に試験準備においてそうです。本記事では、科学的に検証された記憶テクニックを...',
        en: 'Memory is a crucial part of learning, especially when preparing for exams. This article introduces scientifically-validated memorization techniques...'
      },
      date: '2023-04-22',
      author: {
        zh: '林心理學博士',
        ja: 'リン心理学博士',
        en: 'Dr. Lin, Psychologist'
      },
      image: '/assets/images/blog/memory-techniques.jpg',
      category: {
        zh: '學習技巧',
        ja: '学習テクニック',
        en: 'Study Techniques'
      },
      slug: 'effective-memorization-techniques',
      tags: ['memory', 'exam-preparation', 'study-techniques']
    },
    {
      id: "5",
      title: {
        zh: '如何幫助孩子選擇合適的大學專業',
        ja: '子どもが適切な大学専攻を選ぶのを助ける方法',
        en: 'How to Help Your Child Choose the Right University Major'
      },
      content: {
        zh: '選擇大學專業是人生中的重要決定。本文為家長提供指導，如何通過了解孩子的興趣、能力和職業前景，幫助他們做出明智的專業選擇。',
        ja: '大学の専攻選択は人生における重要な決断です。本記事では、子どもの興味、能力、将来のキャリア展望を理解することを通じて、賢明な専攻選択をサポートするための親向けガイダンスを提供します。',
        en: 'Choosing a university major is an important life decision. This article provides guidance for parents on how to help their children make informed choices by understanding their interests, abilities, and career prospects.'
      },
      excerpt: {
        zh: '選擇大學專業是人生中的重要決定。本文為家長提供指導，如何通過了解孩子的興趣、能力和職業前景...',
        ja: '大学の専攻選択は人生における重要な決断です。本記事では、子どもの興味、能力、将来のキャリア展望を理解することを通じて...',
        en: 'Choosing a university major is an important life decision. This article provides guidance for parents on how to help their children make informed choices...'
      },
      date: '2023-03-15',
      author: {
        zh: '陳教育顧問',
        ja: 'チェン教育コンサルタント',
        en: 'Educational Consultant Chen'
      },
      image: '/assets/images/blog/university-major.jpg',
      category: {
        zh: '升學指導',
        ja: '進学指導',
        en: 'College Guidance'
      },
      slug: 'choosing-university-major',
      tags: ['university', 'career-planning', 'major-selection']
    },
    {
      id: "6",
      title: {
        zh: '數位時代的教育創新',
        ja: 'デジタル時代の教育イノベーション',
        en: 'Educational Innovation in the Digital Age'
      },
      content: {
        zh: '數位技術如何改變教育領域？本文探討數位學習工具、線上教育平台和混合式學習模式如何為學生提供更個性化、更有效的學習體驗。',
        ja: 'デジタル技術がどのように教育分野を変えているのでしょうか？本記事では、デジタル学習ツール、オンライン教育プラットフォーム、ブレンデッドラーニングモデルがどのようにしてより個別化された効果的な学習体験を生徒に提供するかを探ります。',
        en: 'How is digital technology changing the field of education? This article explores how digital learning tools, online education platforms, and blended learning models are providing more personalized and effective learning experiences for students.'
      },
      excerpt: {
        zh: '數位技術如何改變教育領域？本文探討數位學習工具、線上教育平台和混合式學習模式如何為學生提供...',
        ja: 'デジタル技術がどのように教育分野を変えているのでしょうか？本記事では、デジタル学習ツールやオンライン教育プラットフォームが...',
        en: 'How is digital technology changing the field of education? This article explores how digital learning tools and online education platforms are...'
      },
      date: '2023-02-28',
      author: {
        zh: '黃科技教育專家',
        ja: 'ファン・テクノロジー教育専門家',
        en: 'Educational Technology Expert Huang'
      },
      image: '/assets/images/blog/digital-education.jpg',
      category: {
        zh: '教育趨勢',
        ja: '教育トレンド',
        en: 'Educational Trends'
      },
      slug: 'digital-education-innovation',
      tags: ['educational-technology', 'digital-learning', 'innovation']
    },
    {
      id: "7",
      title: {
        zh: '培養批判性思維的重要性',
        ja: '批判的思考力を育む重要性',
        en: 'The Importance of Developing Critical Thinking Skills'
      },
      content: {
        zh: '批判性思維是現代社會中不可或缺的能力。本文解釋為什麼批判性思維如此重要，並提供具體的方法來培養學生的批判性思維能力，包括提問技巧、辯論訓練和分析練習。',
        ja: '批判的思考は現代社会において不可欠なスキルです。本記事では、批判的思考がなぜそれほど重要なのかを説明し、質問テクニック、ディベートトレーニング、分析演習など、学生の批判的思考能力を育成するための具体的な方法を提供します。',
        en: 'Critical thinking is an essential skill in modern society. This article explains why critical thinking is so important and provides specific methods to develop students\' critical thinking abilities, including questioning techniques, debate training, and analytical exercises.'
      },
      excerpt: {
        zh: '批判性思維是現代社會中不可或缺的能力。本文解釋為什麼批判性思維如此重要，並提供具體的方法...',
        ja: '批判的思考は現代社会において不可欠なスキルです。本記事では、批判的思考の重要性を説明し...',
        en: 'Critical thinking is an essential skill in modern society. This article explains why critical thinking is so important and provides specific methods...'
      },
      date: '2023-01-20',
      author: {
        zh: '郭邏輯思維教練',
        ja: 'グオ論理思考コーチ',
        en: 'Logic Thinking Coach Guo'
      },
      image: '/assets/images/blog/critical-thinking.jpg',
      category: {
        zh: '思維發展',
        ja: '思考力開発',
        en: 'Thinking Development'
      },
      slug: 'developing-critical-thinking',
      tags: ['critical-thinking', 'logic', 'mental-development']
    },
    {
      id: "8",
      title: {
        zh: '親子溝通：理解青少年的心理',
        ja: '親子コミュニケーション：思春期の心理を理解する',
        en: 'Parent-Child Communication: Understanding Teenage Psychology'
      },
      content: {
        zh: '青少年時期是充滿變化和挑戰的時期。本文探討青少年的心理特點，並提供有效的親子溝通技巧，幫助父母和孩子建立更健康、更開放的關係。',
        ja: '思春期は変化と挑戦に満ちた時期です。本記事では、思春期の心理的特徴を探り、親と子供がより健全でオープンな関係を築くのに役立つ効果的な親子コミュニケーション技術を提供します。',
        en: 'Adolescence is a period full of changes and challenges. This article explores the psychological characteristics of teenagers and provides effective parent-child communication techniques to help parents and children build healthier, more open relationships.'
      },
      excerpt: {
        zh: '青少年時期是充滿變化和挑戰的時期。本文探討青少年的心理特點，並提供有效的親子溝通技巧...',
        ja: '思春期は変化と挑戦に満ちた時期です。本記事では、思春期の心理的特徴を探り、効果的な親子コミュニケーション技術を...',
        en: 'Adolescence is a period full of changes and challenges. This article explores the psychological characteristics of teenagers and provides effective parent-child communication techniques...'
      },
      date: '2022-12-12',
      author: {
        zh: '趙家庭心理學家',
        ja: 'チャウ家族心理学者',
        en: 'Family Psychologist Zhao'
      },
      image: '/assets/images/blog/teen-communication.jpg',
      category: {
        zh: '親子關係',
        ja: '親子関係',
        en: 'Parent-Child Relationship'
      },
      slug: 'parent-teen-communication',
      tags: ['parenting', 'teenagers', 'communication']
    }
  ];
  
  // 日付順に並び替え（新しい順）
  const sortedPosts = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 指定された数だけ返す
  return sortedPosts.slice(0, limit);
};

const blogService = {
  getLatestPosts,
  getPostById,
  getPostsByCategory,
  searchPosts,
  getPostBySlug,
  getAllCategories
};

export default blogService;