import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * 校舎カードコンポーネント
 * 校舎一覧ページで各校舎の概要を表示するカード
 *
 * @param {Object} props
 * @param {Object} props.school 校舎情報オブジェクト
 * @returns {JSX.Element}
 */
const SchoolCard = ({ school }) => {
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={school.images[0]}
        alt={school.name[lang]}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          {school.name[lang]}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {school.address[lang]}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t('common:phone')}: {school.phone}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            to={`/schools/${school.id}`}
            variant="outlined"
            sx={{
              borderColor: '#d4af37',
              color: '#d4af37',
              '&:hover': {
                borderColor: '#b8860b',
                backgroundColor: 'rgba(212, 175, 55, 0.1)'
              }
            }}
          >
            {t('common:viewDetails')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;