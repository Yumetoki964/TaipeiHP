import { COURSES } from '../shared';

/**
 * コース一覧を取得する
 * @returns {Promise<Array>} コース一覧
 */
export const getCourses = async () => {
  try {
    // 本番環境では実際のAPIエンドポイントにリクエストを送信
    const response = await fetch(COURSES.LIST);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // エラー時はモックデータを返す（開発用）
    return mockCourses;
  }
};

/**
 * 特定のコースの詳細を取得する
 * @param {string} courseId コースID
 * @returns {Promise<Object>} コース詳細
 */
export const getCourseById = async (courseId) => {
  try {
    // 本番環境では実際のAPIエンドポイントにリクエストを送信
    const response = await fetch(COURSES.DETAIL(courseId));
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    
    // エラー時はモックデータから該当のコースを返す（開発用）
    const course = mockCourses.find((course) => course.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }
};

// 開発用モックデータ
const mockCourses = [
  {
    id: 'elementary-math',
    name: {
      zh: '小學數學課程',
      ja: '小学校算数コース',
      en: 'Elementary School Math Course'
    },
    description: {
      zh: '我們的小學數學課程旨在培養孩子的數學思維和解決問題的能力。課程涵蓋基本計算、幾何形狀識別、簡單的分數和小數概念等內容。通過互動式教學和實際操作，孩子們可以輕鬆理解抽象概念。',
      ja: '小学校算数コースでは、お子様の数学的思考力と問題解決能力を育みます。基本的な計算、図形の認識、分数や小数の基礎概念などをカバーします。インタラクティブな指導と実践的なアプローチにより、抽象的な概念を簡単に理解できるようになります。',
      en: 'Our Elementary School Math Course is designed to develop children\'s mathematical thinking and problem-solving abilities. The course covers basic calculations, geometric shape recognition, simple fraction and decimal concepts, and more. Through interactive teaching and hands-on activities, children can easily understand abstract concepts.'
    },
    targetAge: {
      zh: '6-12歲',
      ja: '6〜12歳',
      en: '6-12 years old'
    },
    features: {
      zh: [
        '個人化學習計劃',
        '基礎數學概念強化',
        '互動式數學遊戲和活動',
        '定期進度評估'
      ],
      ja: [
        'パーソナライズされた学習計画',
        '基礎的な数学概念の強化',
        'インタラクティブな数学ゲームとアクティビティ',
        '定期的な進捗評価'
      ],
      en: [
        'Personalized learning plans',
        'Reinforcement of basic math concepts',
        'Interactive math games and activities',
        'Regular progress assessments'
      ]
    },
    pricing: {
      zh: '每月NT$8,000起',
      ja: '月額NT$8,000〜',
      en: 'From NT$8,000/month'
    },
    image: 'https://source.unsplash.com/random/800x600/?math,elementary'
  },
  {
    id: 'junior-science',
    name: {
      zh: '國中理科課程',
      ja: '中学校理科コース',
      en: 'Junior High School Science Course'
    },
    description: {
      zh: '國中理科課程專為應對台灣基測和學校考試而設計。我們的課程涵蓋物理、化學和生物的基本原理。學生將進行實驗和解決實際問題，培養批判性思維和科學探究能力。',
      ja: '中学校理科コースは、台湾の基本学力テストや学校の試験に対応するために設計されています。物理学、化学、生物学の基本原理をカバーします。学生は実験を行い、実際の問題を解決することで、批判的思考力と科学的探究能力を育成します。',
      en: 'The Junior High School Science Course is designed to address Taiwan\'s Basic Competence Test and school exams. Our curriculum covers the fundamental principles of physics, chemistry, and biology. Students will conduct experiments and solve real-world problems, fostering critical thinking and scientific inquiry skills.'
    },
    targetAge: {
      zh: '12-15歲',
      ja: '12〜15歳',
      en: '12-15 years old'
    },
    features: {
      zh: [
        '準備國中會考',
        '實驗和動手操作',
        '科學概念的深入理解',
        '問題解決策略'
      ],
      ja: [
        '基本学力テスト対策',
        '実験と実践的なアプローチ',
        '科学的概念の深い理解',
        '問題解決戦略'
      ],
      en: [
        'Preparation for Basic Competence Test',
        'Experiments and hands-on approach',
        'Deep understanding of scientific concepts',
        'Problem-solving strategies'
      ]
    },
    pricing: {
      zh: '每月NT$9,500起',
      ja: '月額NT$9,500〜',
      en: 'From NT$9,500/month'
    },
    image: 'https://source.unsplash.com/random/800x600/?science,laboratory'
  },
  {
    id: 'high-english',
    name: {
      zh: '高中英語課程',
      ja: '高校英語コース',
      en: 'High School English Course'
    },
    description: {
      zh: '我們的高中英語課程旨在提高學生的英語閱讀、寫作、聽力和口語能力。課程內容針對台灣大學入學考試，同時培養學生的溝通能力和批判性思維。',
      ja: '高校英語コースは、生徒の英語の読解力、作文力、リスニング、スピーキング能力を向上させることを目的としています。台湾の大学入学試験に焦点を当てながら、コミュニケーション能力と批判的思考力も育成します。',
      en: 'Our High School English Course aims to improve students\' English reading, writing, listening, and speaking skills. The curriculum is focused on Taiwan\'s university entrance exams while also developing students\' communication abilities and critical thinking.'
    },
    targetAge: {
      zh: '15-18歲',
      ja: '15〜18歳',
      en: '15-18 years old'
    },
    features: {
      zh: [
        '大學入學考試準備',
        '全英語環境',
        '寫作和文法強化',
        '定期模擬測驗'
      ],
      ja: [
        '大学入学試験対策',
        'オールイングリッシュ環境',
        'ライティングと文法の強化',
        '定期的な模擬試験'
      ],
      en: [
        'University entrance exam preparation',
        'All-English environment',
        'Writing and grammar reinforcement',
        'Regular mock tests'
      ]
    },
    pricing: {
      zh: '每月NT$10,000起',
      ja: '月額NT$10,000〜',
      en: 'From NT$10,000/month'
    },
    image: 'https://source.unsplash.com/random/800x600/?english,study'
  },
  {
    id: 'adult-language',
    name: {
      zh: '成人語言課程',
      ja: '成人向け語学コース',
      en: 'Adult Language Course'
    },
    description: {
      zh: '為職場專業人士設計的語言課程，提供英語、日語和中文學習。課程重點包括商業溝通、簡報技巧和日常對話。無論是為了職業發展還是個人興趣，我們的課程都能滿足您的需求。',
      ja: '社会人のために設計された語学コースで、英語、日本語、中国語を提供します。ビジネスコミュニケーション、プレゼンテーションスキル、日常会話などを重点的に学びます。キャリア開発や個人的な興味のいずれのためであっても、当コースはあなたのニーズを満たします。',
      en: 'A language course designed for working professionals, offering English, Japanese, and Chinese learning. The course focuses on business communication, presentation skills, and everyday conversation. Whether for career development or personal interest, our courses can meet your needs.'
    },
    targetAge: {
      zh: '18歲以上',
      ja: '18歳以上',
      en: '18+ years old'
    },
    features: {
      zh: [
        '職場語言技能',
        '靈活上課時間',
        '一對一個人化教學',
        '實用日常對話'
      ],
      ja: [
        '職場での言語スキル',
        '柔軟な授業時間',
        '1対1のパーソナライズされた指導',
        '実用的な日常会話'
      ],
      en: [
        'Workplace language skills',
        'Flexible class times',
        'One-on-one personalized instruction',
        'Practical everyday conversation'
      ]
    },
    pricing: {
      zh: '每月NT$12,000起',
      ja: '月額NT$12,000〜',
      en: 'From NT$12,000/month'
    },
    image: 'https://source.unsplash.com/random/800x600/?language,adult'
  }
];