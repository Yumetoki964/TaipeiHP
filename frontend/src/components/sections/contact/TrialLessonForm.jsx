import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  TextFieldElement,
  SelectFieldElement,
  MultiSelectFieldElement
} from '../../common/FormFields';
import {
  submitTrialLessonForm,
  submitTrialLessonFormMock,
  getAvailableTimeSlotsMock
} from '../../../services/trialLessonService';

/**
 * 校舎リスト（実際のAPIまたはデータストアから取得するように修正が必要）
 */
const getMockSchools = () => [
  { 
    id: 'minghu',
    name: {
      zh: '拓人明湖校',
      ja: '拓人明湖校',
      en: 'Takuto Minghu School'
    }
  },
  { 
    id: 'neihu',
    name: {
      zh: '拓人內湖站前校',
      ja: '拓人内湖駅前校',
      en: 'Takuto Neihu Station School'
    }
  }
];

/**
 * コースリスト（実際のAPIまたはデータストアから取得するように修正が必要）
 */
const getMockCourses = () => [
  {
    id: 'math',
    name: {
      zh: '數學',
      ja: '数学',
      en: 'Mathematics'
    }
  },
  {
    id: 'english',
    name: {
      zh: '英語',
      ja: '英語',
      en: 'English'
    }
  },
  {
    id: 'science',
    name: {
      zh: '自然科學',
      ja: '理科',
      en: 'Science'
    }
  },
  {
    id: 'chinese',
    name: {
      zh: '國語',
      ja: '国語（中国語）',
      en: 'Chinese'
    }
  },
  {
    id: 'exam',
    name: {
      zh: '升學考試準備',
      ja: '受験対策',
      en: 'Exam Preparation'
    }
  }
];

/**
 * 体験授業申し込みフォームコンポーネント
 */
const TrialLessonForm = () => {
  const { t, i18n } = useTranslation(['contact/index', 'common']);
  const currentLanguage = i18n.language;
  
  // 校舎とコースのリスト
  const [schools] = useState(getMockSchools());
  const [courses] = useState(getMockCourses());
  
  // 日時の選択肢
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  // フォームの状態
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    age: '',
    schoolGrade: '',
    courseInterest: '',
    preferredSchool: '',
    preferredDate: [],
    preferredTime: [],
    message: '',
    preferredLanguage: currentLanguage
  });
  
  // エラーの状態
  const [errors, setErrors] = useState({});
  
  // 送信状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // 利用可能な日時を取得
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const data = await getAvailableTimeSlotsMock();
        setAvailableDates(data.dates);
        setAvailableTimeSlots(data.timeSlots);
      } catch (error) {
        console.error('Error fetching available time slots:', error);
        // フォールバックデータ
        setAvailableDates([]);
        setAvailableTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAvailableSlots();
  }, []);
  
  // 入力値変更ハンドラ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 入力時にエラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // フォームバリデーション
  const validateForm = () => {
    const newErrors = {};
    
    // 生徒名の検証
    if (!formData.studentName.trim()) {
      newErrors.studentName = t('trialLessonForm.required');
    }
    
    // 保護者名（18歳未満の場合必須）
    if (formData.age && parseInt(formData.age) < 18 && !formData.parentName.trim()) {
      newErrors.parentName = t('trialLessonForm.required');
    }
    
    // メールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('trialLessonForm.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('trialLessonForm.invalidEmail');
    }
    
    // 電話番号の検証
    if (!formData.phone.trim()) {
      newErrors.phone = t('trialLessonForm.required');
    }
    
    // 年齢の検証
    if (!formData.age) {
      newErrors.age = t('trialLessonForm.required');
    }
    
    // コースの検証
    if (!formData.courseInterest) {
      newErrors.courseInterest = t('trialLessonForm.required');
    }
    
    // 校舎の検証
    if (!formData.preferredSchool) {
      newErrors.preferredSchool = t('trialLessonForm.required');
    }
    
    // 日付の検証
    if (formData.preferredDate.length === 0) {
      newErrors.preferredDate = t('trialLessonForm.required');
    }
    
    // 時間の検証
    if (formData.preferredTime.length === 0) {
      newErrors.preferredTime = t('trialLessonForm.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // フォーム送信ハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 開発環境か本番環境かによって使い分け
      // 実際のAPIが利用可能になったら submitTrialLessonForm に差し替える
      const response = await submitTrialLessonFormMock(formData);
      
      // 成功時
      setSnackbar({
        open: true,
        message: response.message[currentLanguage] || t('trialLessonForm.success'),
        severity: 'success'
      });
      
      // フォームをリセット
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        age: '',
        schoolGrade: '',
        courseInterest: '',
        preferredSchool: '',
        preferredDate: [],
        preferredTime: [],
        message: '',
        preferredLanguage: currentLanguage
      });
    } catch (error) {
      // エラー時
      setSnackbar({
        open: true,
        message: t('trialLessonForm.error'),
        severity: 'error'
      });
      console.error('Trial lesson form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Snackbarを閉じる
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // 校舎オプション
  const schoolOptions = schools.map(school => ({
    value: school.id,
    label: school.name[currentLanguage] || school.name.en
  }));
  
  // コースオプション
  const courseOptions = courses.map(course => ({
    value: course.id,
    label: course.name[currentLanguage] || course.name.en
  }));
  
  // 日付オプション
  const dateOptions = availableDates.map(date => {
    // 日付をフォーマット (YYYY-MM-DD -> 読みやすい形式)
    const formattedDate = new Date(date).toLocaleDateString(
      currentLanguage === 'ja' ? 'ja-JP' : (currentLanguage === 'zh' ? 'zh-TW' : 'en-US'),
      { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    );
    return {
      value: date,
      label: formattedDate
    };
  });
  
  // 時間オプション
  const timeOptions = availableTimeSlots.map(time => ({
    value: time,
    label: time
  }));
  
  // 言語オプション
  const languageOptions = [
    { value: 'zh', label: t('contactForm.languages.zh') },
    { value: 'ja', label: t('contactForm.languages.ja') },
    { value: 'en', label: t('contactForm.languages.en') }
  ];
  
  if (isLoading) {
    return (
      <Paper elevation={2} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {t('trialLessonForm.loading')}
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        {t('trialLessonForm.title')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="studentName"
              label={t('trialLessonForm.studentName')}
              value={formData.studentName}
              onChange={handleChange}
              error={errors.studentName}
              helperText={errors.studentName}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="parentName"
              label={t('trialLessonForm.parentName')}
              value={formData.parentName}
              onChange={handleChange}
              error={errors.parentName}
              helperText={errors.parentName}
              required={formData.age && parseInt(formData.age) < 18}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="email"
              label={t('trialLessonForm.email')}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
              required
              type="email"
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="phone"
              label={t('trialLessonForm.phone')}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              helperText={errors.phone}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="age"
              label={t('trialLessonForm.age')}
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
              helperText={errors.age}
              required
              type="number"
              inputProps={{ min: 5, max: 65 }}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name="schoolGrade"
              label={t('trialLessonForm.schoolGrade')}
              value={formData.schoolGrade}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SelectFieldElement
              name="courseInterest"
              label={t('trialLessonForm.courseInterest')}
              value={formData.courseInterest}
              onChange={handleChange}
              options={courseOptions}
              error={errors.courseInterest}
              helperText={errors.courseInterest || t('trialLessonForm.selectCourse')}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SelectFieldElement
              name="preferredSchool"
              label={t('trialLessonForm.preferredSchool')}
              value={formData.preferredSchool}
              onChange={handleChange}
              options={schoolOptions}
              error={errors.preferredSchool}
              helperText={errors.preferredSchool || t('trialLessonForm.selectSchool')}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MultiSelectFieldElement
              name="preferredDate"
              label={t('trialLessonForm.preferredDate')}
              value={formData.preferredDate}
              onChange={handleChange}
              options={dateOptions}
              error={errors.preferredDate}
              helperText={errors.preferredDate || t('trialLessonForm.selectDate')}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MultiSelectFieldElement
              name="preferredTime"
              label={t('trialLessonForm.preferredTime')}
              value={formData.preferredTime}
              onChange={handleChange}
              options={timeOptions}
              error={errors.preferredTime}
              helperText={errors.preferredTime || t('trialLessonForm.selectTime')}
              required
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextFieldElement
              name="message"
              label={t('trialLessonForm.additionalMessage')}
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SelectFieldElement
              name="preferredLanguage"
              label={t('trialLessonForm.preferredLanguage')}
              value={formData.preferredLanguage}
              onChange={handleChange}
              options={languageOptions}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                  {t('trialLessonForm.processing')}
                </>
              ) : (
                t('trialLessonForm.submit')
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default TrialLessonForm;