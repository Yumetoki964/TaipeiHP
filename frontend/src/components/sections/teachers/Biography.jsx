import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * 講師の経歴・プロフィールを表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.teacher 講師情報オブジェクト
 * @returns {JSX.Element}
 */
const Biography = ({ teacher }) => {
  const { i18n } = useTranslation(['teachers']);
  const lang = i18n.language;

  // 改行を尊重して表示する処理
  const formatBiography = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="h3" sx={{ color: '#d4af37', fontWeight: 'bold', mb: 2 }}>
          {i18n.t('teachers:biography')}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {formatBiography(teacher.biography[lang])}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Biography;