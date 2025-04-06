import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocationOn, Phone, AccessTime } from '@mui/icons-material';

/**
 * モック校舎データ（実際のAPIまたはデータストアから取得するように修正が必要）
 */
const getMockSchoolsData = () => [
  {
    id: 'minghu',
    name: {
      zh: '拓人明湖校',
      ja: '拓人明湖校',
      en: 'Takuto Minghu School'
    },
    address: {
      zh: '台北市內湖區康寧路三段189巷21弄8號1樓',
      ja: '台北市内湖区康寧路三段189巷21弄8号1階',
      en: '1F, No. 8, Alley 21, Lane 189, Section 3, Kangning Road, Neihu District, Taipei City'
    },
    phone: '+886 2 2631 7339',
    hours: {
      weekdays: {
        zh: '週一至週五: 14:00 - 21:00',
        ja: '月曜〜金曜: 14:00 - 21:00',
        en: 'Monday to Friday: 14:00 - 21:00'
      },
      weekends: {
        zh: '週六至週日: 9:00 - 18:00',
        ja: '土曜・日曜: 9:00 - 18:00',
        en: 'Saturday & Sunday: 9:00 - 18:00'
      }
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.1738858325117!2d121.596945!3d25.070378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac7bce656dbb%3A0x73bc5379ce8a5ab4!2sNo.%208%2C%20Alley%2021%2C%20Lane%20189%2C%20Section%203%2C%20Kangning%20Rd%2C%20Neihu%20District%2C%20Taipei%20City%2C%20Taiwan%20114!5e0!3m2!1sen!2s!4v1637903982548!5m2!1sen!2s'
  },
  {
    id: 'neihu',
    name: {
      zh: '拓人內湖站前校',
      ja: '拓人内湖駅前校',
      en: 'Takuto Neihu Station School'
    },
    address: {
      zh: '台北市內湖區內湖路二段351號1樓',
      ja: '台北市内湖区内湖路二段351号1階',
      en: '1F, No. 351, Section 2, Neihu Road, Neihu District, Taipei City'
    },
    phone: '+886 2 2790 3772',
    hours: {
      weekdays: {
        zh: '週一至週五: 14:00 - 21:00',
        ja: '月曜〜金曜: 14:00 - 21:00',
        en: 'Monday to Friday: 14:00 - 21:00'
      },
      weekends: {
        zh: '週六至週日: 9:00 - 18:00',
        ja: '土曜・日曜: 9:00 - 18:00',
        en: 'Saturday & Sunday: 9:00 - 18:00'
      }
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.3851231147024!2d121.59364!3d25.064722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac1a46bc3179%3A0xaa26331addac7f6!2sNo.%20351%2C%20Section%202%2C%20Neihu%20Rd%2C%20Neihu%20District%2C%20Taipei%20City%2C%20Taiwan%20114!5e0!3m2!1sen!2s!4v1637904102548!5m2!1sen!2s'
  }
];

/**
 * 校舎連絡先コンポーネント
 */
const SchoolContacts = () => {
  const { t, i18n } = useTranslation(['contact/index', 'common']);
  const currentLanguage = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  // 校舎データの読み込み
  useEffect(() => {
    // 実際のアプリケーションではAPIから取得する
    setSchools(getMockSchoolsData());
    // 初期選択校舎
    setSelectedSchool(getMockSchoolsData()[0]?.id || null);
  }, []);
  
  // 地図ダイアログを表示するスクール
  const handleSelectSchool = (schoolId) => {
    setSelectedSchool(schoolId);
  };
  
  const selectedSchoolData = schools.find(school => school.id === selectedSchool);
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        {t('schoolContacts.title')}
      </Typography>
      
      <Grid container spacing={3}>
        {/* 校舎リスト */}
        <Grid item xs={12} md={6}>
          {schools.map((school) => (
            <Card 
              key={school.id} 
              variant="outlined" 
              sx={{ 
                mb: 2,
                border: selectedSchool === school.id ? `2px solid ${theme.palette.primary.main}` : undefined
              }}
              onClick={() => handleSelectSchool(school.id)}
            >
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {school.name[currentLanguage] || school.name.en}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {school.address[currentLanguage] || school.address.en}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {school.phone}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                  <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>{t('schoolContacts.openingHours')}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{t('schoolContacts.weekdays')}</strong>: {school.hours.weekdays[currentLanguage]?.split(': ')[1] || school.hours.weekdays.en.split(': ')[1]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{t('schoolContacts.weekends')}</strong>: {school.hours.weekends[currentLanguage]?.split(': ')[1] || school.hours.weekends.en.split(': ')[1]}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  href={`tel:${school.phone}`}
                  startIcon={<Phone />}
                >
                  {t('schoolContacts.call')}
                </Button>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => handleSelectSchool(school.id)}
                >
                  {t('schoolContacts.visit')}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
        
        {/* 地図表示 */}
        <Grid item xs={12} md={6}>
          {selectedSchoolData && (
            <Box sx={{ 
              height: isMobile ? '300px' : '100%', 
              minHeight: '300px',
              border: '1px solid #ddd', 
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <iframe
                src={selectedSchoolData.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`Map to ${selectedSchoolData.name[currentLanguage] || selectedSchoolData.name.en}`}
              ></iframe>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SchoolContacts;