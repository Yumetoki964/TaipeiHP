import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * よくある質問コンポーネント
 */
const FAQ = () => {
  const { t } = useTranslation('contact/index');
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqItems = t('faq.questions', { returnObjects: true });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom color="primary">
        {t('faq.title')}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {faqItems.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 1,
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{
                backgroundColor: (theme) =>
                  expanded === `panel${index}` ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                },
              }}
            >
              <Typography sx={{ fontWeight: expanded === `panel${index}` ? 'bold' : 'normal' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2, pb: 3 }}>
              <Typography variant="body1">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};

export default FAQ;