import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Snackbar, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TextFieldElement, SelectFieldElement } from '../../common/FormFields';
import { submitContactForm, submitContactFormMock } from '../../../services/contactService';

/**
 * お問い合わせフォームコンポーネント
 */
const ContactForm = () => {
  const { t, i18n } = useTranslation(['contact/index', 'common']);
  const currentLanguage = i18n.language;
  
  // フォームの状態
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: 'general',
    preferredLanguage: currentLanguage
  });
  
  // エラーの状態
  const [errors, setErrors] = useState({});
  
  // 送信状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
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
    
    // 名前の検証
    if (!formData.name.trim()) {
      newErrors.name = t('contactForm.required');
    }
    
    // メールアドレスの検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('contactForm.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contactForm.invalidEmail');
    }
    
    // メッセージの検証
    if (!formData.message.trim()) {
      newErrors.message = t('contactForm.required');
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
      // 実際のAPIが利用可能になったら submitContactForm に差し替える
      const response = await submitContactFormMock(formData);
      
      // 成功時
      setSnackbar({
        open: true,
        message: response.message[currentLanguage] || t('contactForm.success'),
        severity: 'success'
      });
      
      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        category: 'general',
        preferredLanguage: currentLanguage
      });
    } catch (error) {
      // エラー時
      setSnackbar({
        open: true,
        message: t('contactForm.error'),
        severity: 'error'
      });
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Snackbarを閉じる
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // カテゴリオプション
  const categoryOptions = [
    { value: 'general', label: t('contactForm.categories.general') },
    { value: 'course', label: t('contactForm.categories.course') },
    { value: 'trial', label: t('contactForm.categories.trial') }
  ];
  
  // 言語オプション
  const languageOptions = [
    { value: 'zh', label: t('contactForm.languages.zh') },
    { value: 'ja', label: t('contactForm.languages.ja') },
    { value: 'en', label: t('contactForm.languages.en') }
  ];
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        {t('contactForm.title')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextFieldElement
          name="name"
          label={t('contactForm.name')}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
          required
          fullWidth
        />
        
        <TextFieldElement
          name="email"
          label={t('contactForm.email')}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email}
          required
          type="email"
          fullWidth
        />
        
        <TextFieldElement
          name="phone"
          label={t('contactForm.phone')}
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        
        <SelectFieldElement
          name="category"
          label={t('contactForm.category')}
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          fullWidth
        />
        
        <TextFieldElement
          name="message"
          label={t('contactForm.message')}
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          helperText={errors.message}
          required
          multiline
          rows={5}
          fullWidth
        />
        
        <SelectFieldElement
          name="preferredLanguage"
          label={t('contactForm.preferredLanguage')}
          value={formData.preferredLanguage}
          onChange={handleChange}
          options={languageOptions}
          fullWidth
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
          sx={{ mt: 3 }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
              {t('contactForm.processing')}
            </>
          ) : (
            t('contactForm.submit')
          )}
        </Button>
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

export default ContactForm;