import { NEWS } from '../shared';

/**
 * ニュース・お知らせの取得と管理を行うサービス
 */

/**
 * 最新のニュース記事を取得する
 * @param {number} limit - 取得する記事数
 * @returns {Promise<Array>} ニュース記事の配列
 */
export const getLatestNews = async (limit = 3) => {
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
      return getMockNewsData(limit);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    // エラーが発生した場合はモックデータを返す
    return getMockNewsData(limit);
  }
};

/**
 * 特定のニュース記事を取得する
 * @param {string} newsId - 取得するニュース記事のID
 * @returns {Promise<Object>} ニュース記事のオブジェクト
 */
export const getNewsById = async (newsId) => {
  try {
    // APIが存在すればそこから取得
    if (process.env.REACT_APP_API_URL) {
      const response = await fetch(NEWS.DETAIL(newsId));
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } else {
      // APIがない場合はモックデータを返す
      const allNews = getMockNewsData();
      const news = allNews.find(item => item.id.toString() === newsId);
      
      if (!news) {
        throw new Error('News not found');
      }
      
      return news;
    }
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    // エラーが発生した場合はnullを返す
    return null;
  }
};

/**
 * カテゴリでニュース記事をフィルタリングして取得する
 * @param {string} category - フィルタリングするカテゴリ
 * @param {number} limit - 取得する記事数
 * @returns {Promise<Array>} ニュース記事の配列
 */
export const getNewsByCategory = async (category, limit = 10) => {
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
      const allNews = getMockNewsData();
      const filteredNews = allNews.filter(item => {
        return Object.values(item.category).some(cat => 
          cat.toLowerCase().includes(category.toLowerCase())
        );
      });
      
      return filteredNews.slice(0, limit);
    }
  } catch (error) {
    console.error('Error fetching news by category:', error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
};

/**
 * スラッグからニュース記事を取得する
 * @param {string} slug - ニュース記事のスラッグ
 * @returns {Promise<Object>} ニュース記事のオブジェクト
 */
export const getNewsBySlug = async (slug) => {
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
      const allNews = getMockNewsData();
      return allNews.find(item => item.slug === slug) || null;
    }
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    // エラーが発生した場合はnullを返す
    return null;
  }
};

/**
 * ニュースのモックデータを生成する
 * @param {number} limit - 返す記事数
 * @returns {Array} ニュース記事の配列
 * @private
 */
const getMockNewsData = (limit = 999) => {
  // 要件に沿ったモックデータを定義
  const newsData = [
    {
      id: 1,
      title: {
        zh: '2023年暑期課程現已開放報名',
        ja: '2023年夏期講習の申込受付開始',
        en: '2023 Summer Courses Now Open for Registration'
      },
      content: {
        zh: '我們很高興地宣布，2023年暑期課程現已開放報名。今年我們提供更多樣化的課程，包括數學、科學、語言和藝術。請儘早報名，名額有限。',
        ja: '2023年夏期講習の申込受付を開始しました。今年は、数学、科学、言語、芸術など、より多様なコースをご用意しています。席数に限りがありますので、お早めにお申し込みください。',
        en: 'We are pleased to announce that registration for our 2023 Summer Courses is now open. This year we offer a more diverse range of courses including mathematics, science, languages, and arts. Please register early as places are limited.'
      },
      date: '2023-05-15',
      image: '/assets/images/news1.jpg',
      category: {
        zh: '課程更新',
        ja: 'コース更新',
        en: 'Course Update'
      },
      slug: 'summer-courses-2023'
    },
    {
      id: 2,
      title: {
        zh: '新增高中數學強化班',
        ja: '高校数学強化クラス新設',
        en: 'New High School Math Intensive Class'
      },
      content: {
        zh: '為了幫助學生更好地準備大學入學考試，我們新增了高中數學強化班。本課程由經驗豐富的教師教授，專注於解題技巧和考試策略。',
        ja: '大学入試の準備をより良くサポートするため、高校数学強化クラスを新設しました。このコースは経験豊富な教師が担当し、問題解決技術と試験戦略に焦点を当てています。',
        en: 'To better support students preparing for university entrance exams, we have added a High School Math Intensive Class. This course is taught by experienced teachers and focuses on problem-solving techniques and exam strategies.'
      },
      date: '2023-04-20',
      image: '/assets/images/news2.jpg',
      category: {
        zh: '課程更新',
        ja: 'コース更新',
        en: 'Course Update'
      },
      slug: 'math-intensive-class'
    },
    {
      id: 3,
      title: {
        zh: '恭喜本校學生在全國競賽中獲獎',
        ja: '全国コンテストで当校の生徒が受賞',
        en: 'Congratulations to Our Students for Winning National Competition'
      },
      content: {
        zh: '我們非常自豪地宣布，本校學生在全國數學競賽中獲得了多項獎項。這證明了我們教學方法的有效性和學生們的勤奮努力。',
        ja: '全国数学コンテストで当校の生徒が複数の賞を受賞したことを、大変誇りに思います。これは当校の教育手法の有効性と生徒たちの勤勉さの証です。',
        en: 'We are proud to announce that our students have won multiple awards in the National Mathematics Competition. This demonstrates the effectiveness of our teaching methods and the diligence of our students.'
      },
      date: '2023-03-10',
      image: '/assets/images/news3.jpg',
      category: {
        zh: '學生成就',
        ja: '生徒の成果',
        en: 'Student Achievement'
      },
      slug: 'national-competition-winners'
    },
    {
      id: 4,
      title: {
        zh: '新校舍開幕：拓人信義校',
        ja: '新校舎オープン：拓人信義校',
        en: 'New Campus Opening: Takuto Xinyi School'
      },
      content: {
        zh: '我們很高興地宣布，新的拓人信義校將於下個月開幕。新校舍配備最先進的設施，包括多媒體教室和自習空間。',
        ja: '来月、新しい拓人信義校がオープンすることを嬉しくお知らせします。新校舎はマルチメディア教室や自習スペースなど、最新の設備を備えています。',
        en: 'We are pleased to announce that our new Takuto Xinyi School will open next month. The new campus is equipped with state-of-the-art facilities including multimedia classrooms and self-study spaces.'
      },
      date: '2023-02-25',
      image: '/assets/images/news4.jpg',
      category: {
        zh: '校舍更新',
        ja: '校舎更新',
        en: 'Campus Update'
      },
      slug: 'xinyi-school-opening'
    },
    {
      id: 5,
      title: {
        zh: '英語會話特別課程',
        ja: '英会話特別コース',
        en: 'Special English Conversation Course'
      },
      content: {
        zh: '我們將開設英語會話特別課程，由母語為英語的教師授課。這個課程專為希望提高英語口語能力的學生設計。',
        ja: 'ネイティブ講師による英会話特別コースを開講します。このコースは英会話能力の向上を目指す生徒のために特別に設計されています。',
        en: 'We will be offering a Special English Conversation Course taught by native English-speaking teachers. This course is specially designed for students looking to improve their spoken English abilities.'
      },
      date: '2023-01-15',
      image: '/assets/images/news5.jpg',
      category: {
        zh: '課程更新',
        ja: 'コース更新',
        en: 'Course Update'
      },
      slug: 'english-conversation-course'
    }
  ];
  
  // 日付順に並び替え（新しい順）
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 指定された数だけ返す
  return sortedNews.slice(0, limit);
};

const newsService = {
  getLatestNews,
  getNewsById,
  getNewsByCategory,
  getNewsBySlug
};

export default newsService;