import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

/**
 * ブログ検索バーコンポーネント
 * 
 * @param {string} initialValue - 初期検索キーワード
 * @param {Function} onSearch - 検索実行時のコールバック関数
 * @returns {JSX.Element}
 */
const SearchBar = ({ initialValue = '', onSearch }) => {
  const { t } = useTranslation('blog');
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  // 検索実行ハンドラー
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  // 検索クリアハンドラー
  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
          '&:focus-within': {
            borderColor: '#d4af37',
            boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.2)',
          }
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('searchPlaceholder')}
          inputProps={{ 'aria-label': t('searchBlog') }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {searchTerm && (
          <IconButton 
            sx={{ p: '10px' }} 
            aria-label={t('clearSearch')} 
            onClick={handleClear}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        
        <IconButton 
          type="submit" 
          sx={{ 
            p: '10px',
            color: '#d4af37',
            '&:hover': {
              backgroundColor: 'rgba(212, 175, 55, 0.1)'
            }
          }} 
          aria-label={t('search')}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;