import { TEACHERS } from '../shared';

/**
 * 講師情報を取得するサービス
 */
const teacherService = {
  /**
   * すべての講師情報を取得する
   * @returns {Promise<Array>} 講師情報の配列
   */
  getAllTeachers: async () => {
    try {
      const response = await fetch(TEACHERS.LIST);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },
  
  /**
   * 特定の講師情報を取得する
   * @param {string} teacherId 講師ID
   * @returns {Promise<Object>} 講師情報
   */
  getTeacherById: async (teacherId) => {
    try {
      const response = await fetch(TEACHERS.DETAIL(teacherId));
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching teacher with id ${teacherId}:`, error);
      throw error;
    }
  }
};

export default teacherService;