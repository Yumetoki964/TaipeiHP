import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * 校舎の地図を表示するコンポーネント
 * Google Mapsの埋め込みマップを表示する
 *
 * @param {Object} props
 * @param {string} props.mapUrl Google Mapsの埋め込みURL
 * @param {string} props.title 地図のタイトル
 * @returns {JSX.Element}
 */
const MapView = ({ mapUrl, title }) => {
  const { t } = useTranslation(['common']);

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#d4af37', fontWeight: 'bold' }}>
        {t('common:locationMap')}
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingBottom: '56.25%', // 16:9アスペクト比
          overflow: 'hidden',
          borderRadius: 1
        }}
      >
        <iframe
          src={mapUrl}
          title="School location"
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Paper>
  );
};

export default MapView;