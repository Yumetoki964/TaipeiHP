import React from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, useTheme, useMediaQuery } from '@mui/material';
// Timeline関連のコンポーネントはMaterial UI Labからインポートする必要がありますが、
// 現在は未使用のコンポーネントなのでコメントアウトします
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, 
//          TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * 会社の歴史コンポーネント
 * 会社の歴史を年表形式で表示する
 */
const History = ({ historyItems }) => {
  const { t, i18n } = useTranslation('about');
  const currentLang = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!historyItems || historyItems.length === 0) return null;

  // 歴史を年代順に並び替え
  const sortedHistoryItems = [...historyItems].sort((a, b) => {
    const yearComparison = parseInt(a.year) - parseInt(b.year);
    if (yearComparison !== 0) return yearComparison;
    if (a.month && b.month) {
      return parseInt(a.month) - parseInt(b.month);
    }
    return 0;
  });

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#d4af37',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#d4af37'
              }
            }}
          >
            {t('history.title')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: '700px', mx: 'auto', mt: 3 }}
          >
            {t('history.description')}
          </Typography>
        </Box>

        {/* Timeline実装は現在コメントアウト - 必要なコンポーネントがライブラリに含まれていないため */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {sortedHistoryItems.map((item, index) => (
            <Card key={index} sx={{ maxWidth: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.year}
                  {item.month && <Typography component="span" variant="body1">.{item.month}</Typography>}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1a1a1a' }}>
                  {item.title[currentLang]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description[currentLang]}
                </Typography>
              </CardContent>
              {item.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.title[currentLang]}
                />
              )}
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

History.propTypes = {
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string.isRequired,
      month: PropTypes.string,
      title: PropTypes.shape({
        zh: PropTypes.string.isRequired,
        ja: PropTypes.string.isRequired,
        en: PropTypes.string.isRequired
      }).isRequired,
      description: PropTypes.shape({
        zh: PropTypes.string.isRequired,
        ja: PropTypes.string.isRequired,
        en: PropTypes.string.isRequired
      }).isRequired,
      image: PropTypes.string
    })
  )
};

export default History;