import { SCHOOLS } from '../shared';

/**
 * 校舎情報を取得するサービス
 */
const schoolService = {
  /**
   * すべての校舎情報を取得する
   * @returns {Promise<Array>} 校舎情報の配列
   */
  getAllSchools: async () => {
    try {
      const response = await fetch(SCHOOLS.LIST);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },
  
  /**
   * 特定の校舎情報を取得する
   * @param {string} schoolId 校舎ID
   * @returns {Promise<Object>} 校舎情報
   */
  getSchoolById: async (schoolId) => {
    try {
      const response = await fetch(SCHOOLS.DETAIL(schoolId));
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching school with id ${schoolId}:`, error);
      throw error;
    }
  }
};

export default schoolService;