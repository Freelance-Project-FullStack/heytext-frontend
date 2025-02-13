import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel
} from '@mui/material';
import { FileSearchOutlined, OrderedListOutlined, TableOutlined, DownloadOutlined } from '@ant-design/icons';

const FontSelector = () => {
  const [fonts, setFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [sampleText, setSampleText] = useState('Type something to preview');
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid');
  
  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const mockFonts = [
      {
        id: 1,
        name: 'Arial Pro',
        downloads: 1500,
        isPro: true,
        fontFamily: 'Arial',
        previewText: 'The quick brown fox jumps over the lazy dog',
      },
      {
        id: 2,
        name: 'Roboto',
        downloads: 2300,
        isPro: false,
        fontFamily: 'Roboto',
        previewText: 'The quick brown fox jumps over the lazy dog',
      },
      // Thêm fonts khác
    ];
    setFonts(mockFonts);
  }, []);

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // Update sample text based on language
    const texts = {
      en: 'The quick brown fox jumps over the lazy dog',
      vi: 'Tôi yêu tiếng nước tôi từ khi mới ra đời',
      fr: 'Le vif renard brun saute par-dessus le chien paresseux'
    };
    setSampleText(texts[event.target.value]);
  };

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Font Preview Input Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Type something to preview"
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Language</InputLabel>
              <Select value={language} onChange={handleLanguageChange} label="Language">
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Tiếng Việt</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Typography gutterBottom>Font Size: {fontSize}px</Typography>
          <Slider
            value={fontSize}
            onChange={handleFontSizeChange}
            min={8}
            max={72}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>

      {/* Controls Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2 }}>
        <TextField
          placeholder="Search fonts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FileSearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
        >
          <ToggleButton value="list">
            <OrderedListOutlined />
          </ToggleButton>
          <ToggleButton value="grid">
            <TableOutlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Fonts List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {filteredFonts.map((font) => (
            <Grid item xs={12} sm={6} md={4} key={font.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{font.name}</Typography>
                    <Chip
                      label={font.isPro ? 'PRO' : 'FREE'}
                      color={font.isPro ? 'primary' : 'success'}
                      size="small"
                    />
                  </Box>
                  
                  <Typography
                    sx={{
                      fontFamily: font.fontFamily,
                      fontSize: `${fontSize}px`,
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {sampleText}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {font.downloads.toLocaleString()} downloads
                    </Typography>
                    <IconButton color="primary">
                      <DownloadOutlined />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          {filteredFonts.map((font) => (
            <Box
              key={font.id}
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6">{font.name}</Typography>
                  <Chip
                    label={font.isPro ? 'PRO' : 'FREE'}
                    color={font.isPro ? 'primary' : 'success'}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {font.downloads.toLocaleString()} downloads
                  </Typography>
                  <IconButton color="primary">
                    <DownloadOutlined />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography
                sx={{
                  fontFamily: font.fontFamily,
                  fontSize: `${fontSize}px`,
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {sampleText}
              </Typography>
            </Box>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default FontSelector; 