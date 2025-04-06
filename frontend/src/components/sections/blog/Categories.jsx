import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../../hooks/useLanguage';

/**
 * ブログカテゴリーリストコンポーネント
 * 
 * @param {Array} categories - カテゴリーデータの配列
 * @param {string} activeCategory - 現在選択中のカテゴリー
 * @param {Function} onSelectCategory - カテゴリー選択時のコールバック関数
 * @returns {JSX.Element}
 */
const Categories = ({ categories = [], activeCategory = null, onSelectCategory }) => {
  const { t } = useTranslation('blog');
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // カテゴリーのクリックハンドラー
  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      // onSelectCategoryがない場合は、URLのクエリパラメータを使用してナビゲート
      const searchParams = new URLSearchParams(location.search);
      if (category) {
        searchParams.set('category', category);
      } else {
        searchParams.delete('category');
      }
      navigate(`/blog?${searchParams.toString()}`);
    }
  };
  
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold',
          color: '#333',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '30px',
            height: '2px',
            backgroundColor: '#d4af37'
          }
        }}
      >
        {t('categories')}
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <List component="nav" dense>
        {/* すべてのカテゴリーオプション */}
        <ListItem 
          button 
          onClick={() => handleCategoryClick(null)}
          selected={activeCategory === null}
          sx={{ 
            '&.Mui-selected': { 
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(212, 175, 55, 0.2)'
              }
            }
          }}
        >
          <ListItemText primary={t('allCategories')} />
          <Chip 
            label={categories.length} 
            size="small" 
            sx={{ 
              fontSize: '0.75rem', 
              height: '22px', 
              backgroundColor: activeCategory === null ? '#d4af37' : '#e0e0e0',
              color: activeCategory === null ? 'white' : '#666'
            }} 
          />
        </ListItem>
        
        <Divider component="li" />
        
        {/* カテゴリーリスト */}
        {categories.map((category, index) => {
          const categoryName = category[currentLang];
          return (
            <React.Fragment key={index}>
              <ListItem 
                button 
                onClick={() => handleCategoryClick(categoryName)}
                selected={activeCategory === categoryName}
                sx={{ 
                  '&.Mui-selected': { 
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.2)'
                    }
                  }
                }}
              >
                <ListItemText primary={categoryName} />
              </ListItem>
              {index < categories.length - 1 && <Divider component="li" light />}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default Categories;