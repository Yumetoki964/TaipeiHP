import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * 講師カードコンポーネント
 * 講師一覧ページで各講師の概要を表示するカード
 *
 * @param {Object} props
 * @param {Object} props.teacher 講師情報オブジェクト
 * @returns {JSX.Element}
 */
const TeacherCard = ({ teacher }) => {
  const { t, i18n } = useTranslation(['teachers', 'common']);
  const lang = i18n.language;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
      <CardMedia
        component="img"
        height="280"
        image={teacher.image}
        alt={teacher.name[lang]}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          {teacher.name[lang]}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {teacher.specialties[lang].slice(0, 3).map((specialty, index) => (
            <Chip 
              key={index} 
              label={specialty} 
              size="small" 
              sx={{ backgroundColor: '#f5f5f5' }}
            />
          ))}
          {teacher.specialties[lang].length > 3 && (
            <Chip 
              label={`+${teacher.specialties[lang].length - 3}`} 
              size="small" 
              sx={{ backgroundColor: '#e0e0e0' }}
            />
          )}
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2, 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {teacher.biography[lang].substring(0, 120)}...
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Button
            component={Link}
            to={`/teachers/${teacher.id}`}
            variant="outlined"
            sx={{
              borderColor: '#d4af37',
              color: '#d4af37',
              '&:hover': {
                borderColor: '#b8860b',
                backgroundColor: 'rgba(212, 175, 55, 0.1)'
              }
            }}
            fullWidth
          >
            {t('common:viewProfile')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;