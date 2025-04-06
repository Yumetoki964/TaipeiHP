import { COMPANY_INFO } from '../shared';

/**
 * 会社情報を取得する
 * @returns {Promise<object>} 会社の基本情報
 */
export const getCompanyInfo = async () => {
  try {
    const response = await fetch(COMPANY_INFO.DETAIL);
    if (!response.ok) {
      throw new Error('会社情報の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('会社情報取得エラー:', error);
    // エラー時のモックデータを返す
    return {
      name: {
        zh: '夢時商業股份有限公司',
        ja: '夢時商業股份有限公司',
        en: 'Yumetoki Commercial Co., Ltd.'
      },
      foundingYear: '2018',
      representative: {
        zh: '張芳瑜',
        ja: '張芳瑜',
        en: 'Chang Fang Yu'
      },
      address: {
        zh: '台北市內湖區內湖路二段179號',
        ja: '台北市内湖区内湖路二段179号',
        en: 'No. 179, Section 2, Neihu Road, Neihu District, Taipei City, Taiwan'
      },
      phone: '+886 2 2797 0777',
      email: 'info@yumetoki-edu.com',
      registrationNumber: '12345678'
    };
  }
};

/**
 * 会社の歴史を取得する
 * @returns {Promise<Array>} 会社の歴史
 */
export const getCompanyHistory = async () => {
  try {
    const response = await fetch(COMPANY_INFO.HISTORY);
    if (!response.ok) {
      throw new Error('会社の歴史情報の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('会社の歴史取得エラー:', error);
    // エラー時のモックデータを返す
    return [
      {
        year: '2018',
        month: '1',
        title: {
          zh: '夢時商業股份有限公司成立',
          ja: '夢時商業股份有限公司設立',
          en: 'Establishment of Yumetoki Commercial Co., Ltd.'
        },
        description: {
          zh: '在台北市內湖區成立公司，開始提供1對1教育服務。',
          ja: '台北市内湖区に会社を設立し、1対1の教育サービスの提供を開始。',
          en: 'Established the company in Neihu District, Taipei, and began providing 1-on-1 educational services.'
        },
        image: '/assets/images/company/founding.jpg'
      },
      {
        year: '2019',
        month: '4',
        title: {
          zh: '開設第一所校舍',
          ja: '初の校舎開設',
          en: 'Opening of the first school'
        },
        description: {
          zh: '在內湖區開設第一所校舍，專注於提供高品質的個別化教學。',
          ja: '内湖区に最初の校舎を開設し、高品質の個別指導に特化。',
          en: 'Opened the first school in Neihu District, focusing on providing high-quality personalized teaching.'
        },
        image: '/assets/images/company/first_school.jpg'
      },
      {
        year: '2021',
        month: '9',
        title: {
          zh: '與日本教育機構合作',
          ja: '日本の教育機関との提携',
          en: 'Partnership with Japanese educational institution'
        },
        description: {
          zh: '與日本知名教育機構建立合作關係，引進先進的教學方法。',
          ja: '日本の有名教育機関と提携し、先進的な教授法を導入。',
          en: 'Established a partnership with a renowned Japanese educational institution to introduce advanced teaching methods.'
        },
        image: '/assets/images/company/japan_partnership.jpg'
      },
      {
        year: '2022',
        month: '7',
        title: {
          zh: '開設第二所校舍',
          ja: '第二校舎の開設',
          en: 'Opening of the second school'
        },
        description: {
          zh: '因應學生需求增加，在明湖地區開設第二所校舍。',
          ja: '学生の需要増加に応じて、明湖地区に第二校舎を開設。',
          en: 'Opened the second school in the Minghu area in response to increasing student demand.'
        },
        image: '/assets/images/company/second_school.jpg'
      },
      {
        year: '2024',
        month: '3',
        title: {
          zh: '拓展線上教學服務',
          ja: 'オンライン教育サービスの拡大',
          en: 'Expansion to online teaching services'
        },
        description: {
          zh: '開始提供線上教學服務，讓學生能夠更靈活地學習。',
          ja: 'オンライン教育サービスの提供を開始し、より柔軟な学習環境を実現。',
          en: 'Started providing online teaching services to enable more flexible learning for students.'
        },
        image: '/assets/images/company/online_service.jpg'
      }
    ];
  }
};

/**
 * 会社のビジョン・ミッション・価値観を取得する
 * @returns {Promise<Array>} 会社のビジョン・ミッション・価値観
 */
export const getCompanyValues = async () => {
  try {
    const response = await fetch(COMPANY_INFO.VALUES);
    if (!response.ok) {
      throw new Error('会社のビジョン・ミッション情報の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('会社のビジョン・ミッション取得エラー:', error);
    // エラー時のモックデータを返す
    return [
      {
        title: {
          zh: '我們的使命',
          ja: '私たちの使命',
          en: 'Our Mission'
        },
        description: {
          zh: '透過個人化教學方式，為每位學生創造最佳的學習體驗，激發其學習潛力，培養終身學習的熱情。',
          ja: '個別指導を通じて、すべての生徒に最適な学習体験を提供し、学習の可能性を引き出し、生涯学習への情熱を育みます。',
          en: 'To create the best learning experience for each student through personalized teaching methods, inspire their learning potential, and cultivate a passion for lifelong learning.'
        },
        icon: 'school'
      },
      {
        title: {
          zh: '我們的願景',
          ja: '私たちのビジョン',
          en: 'Our Vision'
        },
        description: {
          zh: '成為台灣最值得信賴的個人化教育服務提供者，幫助學生在學業與生活中取得成功。',
          ja: '台湾で最も信頼される個別指導サービスの提供者となり、学生が学業と生活の両面で成功を収められるよう支援します。',
          en: 'To become the most trusted provider of personalized educational services in Taiwan, helping students achieve success in their academic and personal lives.'
        },
        icon: 'visibility'
      },
      {
        title: {
          zh: '我們的核心價值',
          ja: '私たちの核心的価値',
          en: 'Our Core Values'
        },
        description: {
          zh: '個人化關注、高品質教學、持續創新、誠信與尊重、終身學習。',
          ja: '個別の配慮、高品質の指導、継続的な革新、誠実さと尊重、生涯学習。',
          en: 'Personalized attention, high-quality teaching, continuous innovation, integrity and respect, lifelong learning.'
        },
        icon: 'stars'
      }
    ];
  }
};

/**
 * 日本の兄弟会社情報を取得する
 * @returns {Promise<object>} 日本の兄弟会社情報
 */
export const getSisterCompany = async () => {
  try {
    const response = await fetch(COMPANY_INFO.SISTER_COMPANY);
    if (!response.ok) {
      throw new Error('兄弟会社情報の取得に失敗しました');
    }
    return await response.json();
  } catch (error) {
    console.error('兄弟会社情報取得エラー:', error);
    // エラー時のモックデータを返す
    return {
      name: {
        zh: '日本拓人教育株式會社',
        ja: '日本拓人教育株式会社',
        en: 'Japan Takuto Education Co., Ltd.'
      },
      description: {
        zh: '日本拓人教育株式會社是夢時商業的姐妹公司，於1975年在日本成立，提供高品質的個別指導服務。擁有超過45年的教育經驗，在日本全國設有多所校舍，是日本值得信賴的教育機構之一。',
        ja: '日本拓人教育株式会社は、夢時商業の兄弟会社として1975年に日本で設立され、高品質の個別指導サービスを提供しています。45年以上の教育経験を持ち、日本全国に多数の校舎を展開する信頼できる教育機関です。',
        en: 'Japan Takuto Education Co., Ltd. is a sister company of Yumetoki Commercial, established in Japan in 1975, providing high-quality personalized tutoring services. With over 45 years of educational experience, it operates multiple schools across Japan and is one of the trusted educational institutions in Japan.'
      },
      location: {
        zh: '日本東京都新宿區',
        ja: '日本東京都新宿区',
        en: 'Shinjuku, Tokyo, Japan'
      },
      website: 'https://www.takuto-education.co.jp',
      logo: '/assets/images/company/sister_company_logo.png',
      images: [
        '/assets/images/company/sister_company1.jpg',
        '/assets/images/company/sister_company2.jpg'
      ]
    };
  }
};