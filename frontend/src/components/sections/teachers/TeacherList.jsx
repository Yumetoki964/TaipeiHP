import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Box, CircularProgress, Alert, TextField, MenuItem, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TeacherCard from './TeacherCard';
import teacherService from '../../../services/teacherService';

/**
 * 講師一覧コンポーネント
 * すべての講師を一覧表示し、フィルタリング機能を提供する
 *
 * @returns {JSX.Element}
 */
const TeacherList = () => {
  const { t, i18n } = useTranslation(['teachers', 'common']);
  const lang = i18n.language;
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  // 全ての講師から専門分野の一覧を取得する関数
  const getAllSpecialties = (teachersList) => {
    const specialtiesSet = new Set();
    teachersList.forEach(teacher => {
      teacher.specialties[lang].forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    });
    return ['all', ...Array.from(specialtiesSet)];
  };

  const [specialties, setSpecialties] = useState(['all']);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await teacherService.getAllTeachers();
        
        // APIレスポンス形式の違いを処理（開発環境と本番環境で異なる場合）
        let teacherData;
        if (Array.isArray(response)) {
          // 開発環境：直接配列が返される
          teacherData = response;
        } else if (response.data) {
          // 本番環境：{success, message, data}形式のオブジェクト
          teacherData = response.data;
        } else {
          // 想定外の形式
          throw new Error('Unexpected API response format');
        }
        
        setTeachers(teacherData);
        setFilteredTeachers(teacherData);
        setSpecialties(getAllSpecialties(teacherData));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch teachers:', err);
        setError(t('errors.failedToLoadTeachers'));
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [t, lang]);

  // 言語が変更されたときに専門分野の一覧を更新する
  useEffect(() => {
    if (teachers.length > 0) {
      setSpecialties(getAllSpecialties(teachers));
    }
  }, [lang, teachers]);

  // 検索とフィルタリングを処理する
  useEffect(() => {
    const filterTeachers = () => {
      let result = [...teachers];
      
      // 検索キーワードでフィルタリング
      if (searchTerm) {
        result = result.filter(teacher => 
          teacher.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.biography[lang].toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // 専門分野でフィルタリング
      if (specialtyFilter !== 'all') {
        result = result.filter(teacher => 
          teacher.specialties[lang].includes(specialtyFilter)
        );
      }
      
      setFilteredTeachers(result);
    };
    
    filterTeachers();
  }, [searchTerm, specialtyFilter, teachers, lang]);

  // 検索文字列が変更されたときのハンドラー
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 専門分野フィルターが変更されたときのハンドラー
  const handleSpecialtyChange = (event) => {
    setSpecialtyFilter(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold'
          }}
        >
          {t('teachersTitle')}
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}
        >
          {t('teachersSubtitle')}
        </Typography>

        {/* 検索とフィルタリングオプション */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
          <TextField
            label={t('searchTeachers')}
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="material-icons">search</span>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            select
            label={t('filterBySpecialty')}
            value={specialtyFilter}
            onChange={handleSpecialtyChange}
            variant="outlined"
            sx={{ width: { xs: '100%', sm: '250px' } }}
          >
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty === 'all' ? t('allSpecialties') : specialty}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* フィルター後の講師が0件の場合 */}
        {filteredTeachers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {t('noTeachersFound')}
            </Typography>
          </Box>
        )}

        {/* 講師一覧 */}
        <Grid container spacing={4}>
          {filteredTeachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherList;