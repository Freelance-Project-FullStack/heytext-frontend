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
  InputLabel,
  Stack,
  Button,
  Drawer,
  Divider,
  FormControlLabel,
  Switch
} from '@mui/material';
// import { useSelector } from 'react-redux';
import { FileSearchOutlined, OrderedListOutlined, TableOutlined, DownloadOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons';
import { fontService } from 'services/fontService';
import CopyTextButton from 'components/CopyTextButton';

const FONT_CATEGORIES = ['Sans Serif', 'Serif', 'Script', 'Display', 'Decorative', 'Monospace', 'Calligraphy', 'Handwritten'];

const FONT_STYLES = ['Regular', 'Bold', 'Italic', 'Light', 'Medium', 'Black'];

const FONT_USES = ['Logo', 'Branding', 'Website', 'Print', 'Packaging', 'Social Media'];

const FontSelector = () => {
  // const { user } = useSelector((state) => state.auth);
  const [fonts, setFonts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [sampleText, setSampleText] = useState('Type something to preview');
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid');
  const [openFilters, setOpenFilters] = useState(false);

  // Font style controls
  const [fontStyles, setFontStyles] = useState({
    weight: 400,
    letterSpacing: 0,
    lineHeight: 1.5,
    textTransform: 'none'
  });

  // Advanced filters
  const [filters, setFilters] = useState({
    categories: [],
    styles: [],
    uses: [],
    minDownloads: 0,
    maxPrice: 1000,
    rating: 0,
    hideDisabled: false
  });

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      const searchParams = {
        search: searchTerm,
        categories: filters.categories,
        styles: filters.styles,
        uses: filters.uses,
        minDownloads: filters.minDownloads,
        maxPrice: filters.maxPrice,
        rating: filters.rating,
        hideDisabled: filters.hideDisabled
      };

      const response = await fontService.searchFonts(searchParams);
      setFonts(response.data || []);
    } catch (error) {
      console.error('Error loading fonts:', error);
      // Add error handling/notification here
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadFonts();
    }, 500); // Debounce search to avoid too many API calls

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filters]);

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
    const texts = {
      en: 'The quick brown fox jumps over the lazy dog',
      vi: 'Tôi yêu tiếng nước tôi từ khi mới ra đời',
      fr: 'Le vif renard brun saute par-dessus le chien paresseux'
    };
    setSampleText(texts[event.target.value]);
  };

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

          {/* Font Style Controls */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Font Weight</Typography>
              <Slider
                value={fontStyles.weight}
                onChange={(e, val) => setFontStyles({ ...fontStyles, weight: val })}
                min={100}
                max={900}
                step={100}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Letter Spacing</Typography>
              <Slider
                value={fontStyles.letterSpacing}
                onChange={(e, val) => setFontStyles({ ...fontStyles, letterSpacing: val })}
                min={-5}
                max={10}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Line Height</Typography>
              <Slider
                value={fontStyles.lineHeight}
                onChange={(e, val) => setFontStyles({ ...fontStyles, lineHeight: val })}
                min={1}
                max={3}
                step={0.1}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Text Transform</Typography>
              <Select
                fullWidth
                value={fontStyles.textTransform}
                onChange={(e) => setFontStyles({ ...fontStyles, textTransform: e.target.value })}
              >
                <MenuItem value="none">Normal</MenuItem>
                <MenuItem value="uppercase">UPPERCASE</MenuItem>
                <MenuItem value="lowercase">lowercase</MenuItem>
                <MenuItem value="capitalize">Capitalize</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Typography gutterBottom>Font Size: {fontSize}px</Typography>
          <Slider value={fontSize} onChange={handleFontSizeChange} min={8} max={72} valueLabelDisplay="auto" />
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
            )
          }}
          sx={{ flex: 1 }}
        />

        <Button variant="outlined" startIcon={<FilterOutlined />} onClick={() => setOpenFilters(true)}>
          Filters
        </Button>

        <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
          <ToggleButton value="list">
            <OrderedListOutlined />
          </ToggleButton>
          <ToggleButton value="grid">
            <TableOutlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Active Filters */}
      {(filters.categories.length > 0 || filters.styles.length > 0 || filters.uses.length > 0) && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {filters.categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onDelete={() =>
                  setFilters({
                    ...filters,
                    categories: filters.categories.filter((c) => c !== cat)
                  })
                }
              />
            ))}
            {filters.styles.map((style) => (
              <Chip
                key={style}
                label={style}
                onDelete={() =>
                  setFilters({
                    ...filters,
                    styles: filters.styles.filter((s) => s !== style)
                  })
                }
              />
            ))}
            {filters.uses.map((use) => (
              <Chip
                key={use}
                label={use}
                onDelete={() =>
                  setFilters({
                    ...filters,
                    uses: filters.uses.filter((u) => u !== use)
                  })
                }
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Fonts Grid/List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {fonts.map((font) => (
            <Grid item xs={12} sm={6} md={4} key={font.id}>
              <Card
                sx={{
                  opacity: font.disabled ? 0.7 : 1,
                  position: 'relative'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{font.name}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={font.isPro ? 'PRO' : 'FREE'} color={font.isPro ? 'primary' : 'success'} size="small" />
                      {font.rating && <Chip icon={<StarOutlined />} label={font.rating} size="small" color="warning" />}
                    </Stack>
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: font.name,
                      fontSize: `${fontSize}px`,
                      fontWeight: fontStyles.weight,
                      letterSpacing: `${fontStyles.letterSpacing}px`,
                      lineHeight: fontStyles.lineHeight,
                      textTransform: fontStyles.textTransform,
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {sampleText}
                  </Typography>

                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Sample Text:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: 'grey.100',
                        p: 1,
                        borderRadius: 1
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: font.name,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {sampleText}
                      </Typography>
                      <CopyTextButton font={font} type="text" tooltipTitle="Copy Text" textToCopy={sampleText} />
                    </Box>

                    <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                      Integration Code:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <CopyTextButton font={font} type="html" tooltipTitle="Copy HTML" />
                      <CopyTextButton font={font} type="css" tooltipTitle="Copy CSS" />
                      <CopyTextButton font={font} type="cdn" tooltipTitle="Copy CDN URL" />
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {font.styles.map((style) => (
                      <Chip key={style} label={style} size="small" variant="outlined" />
                    ))}
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {font.downloads.toLocaleString()} downloads
                      </Typography>
                      {font.price > 0 && (
                        <Typography variant="body2" color="primary">
                          ${font.price}
                        </Typography>
                      )}
                    </Box>
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
          {fonts.map((font) => (
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
                  <Stack direction="row" spacing={1}>
                    <Chip label={font.isPro ? 'PRO' : 'FREE'} color={font.isPro ? 'primary' : 'success'} size="small" />
                    {font.rating && <Chip icon={<StarOutlined />} label={font.rating} size="small" color="warning" />}
                  </Stack>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {font.downloads.toLocaleString()} downloads
                  </Typography>
                  {font.price > 0 && (
                    <Typography variant="body2" color="primary">
                      ${font.price}
                    </Typography>
                  )}
                  <IconButton color="primary">
                    <DownloadOutlined />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontFamily: font.name,
                  fontSize: `${fontSize}px`,
                  fontWeight: fontStyles.weight,
                  letterSpacing: `${fontStyles.letterSpacing}px`,
                  lineHeight: fontStyles.lineHeight,
                  textTransform: fontStyles.textTransform,
                  minHeight: '80px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {sampleText}
              </Typography>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Sample Text:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'grey.100',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: font.name,
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {sampleText}
                  </Typography>
                  <CopyTextButton font={font} type="text" tooltipTitle="Copy Text" textToCopy={sampleText} />
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                  Integration Code:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <CopyTextButton font={font} type="html" tooltipTitle="Copy HTML" />
                  <CopyTextButton font={font} type="css" tooltipTitle="Copy CSS" />
                  <CopyTextButton font={font} type="cdn" tooltipTitle="Copy CDN URL" />
                </Stack>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {font.styles.map((style) => (
                  <Chip key={style} label={style} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
          ))}
        </Card>
      )}

      {/* Filters Drawer */}
      <Drawer anchor="right" open={openFilters} onClose={() => setOpenFilters(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>

          <Typography gutterBottom>Categories</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              multiple
              value={filters.categories}
              onChange={(e) => setFilters({ ...filters, categories: e.target.value })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {FONT_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Styles</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              multiple
              value={filters.styles}
              onChange={(e) => setFilters({ ...filters, styles: e.target.value })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {FONT_STYLES.map((style) => (
                <MenuItem key={style} value={style}>
                  {style}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Uses</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              multiple
              value={filters.uses}
              onChange={(e) => setFilters({ ...filters, uses: e.target.value })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {FONT_USES.map((use) => (
                <MenuItem key={use} value={use}>
                  {use}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={filters.hideDisabled}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    hideDisabled: e.target.checked
                  })
                }
              />
            }
            label="Hide Unavailable Fonts"
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          <Typography gutterBottom>Minimum Downloads</Typography>
          <Slider
            value={filters.minDownloads}
            onChange={(e, val) => setFilters({ ...filters, minDownloads: val })}
            min={0}
            max={10000}
            step={100}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>Maximum Price</Typography>
          <Slider
            value={filters.maxPrice}
            onChange={(e, val) => setFilters({ ...filters, maxPrice: val })}
            min={0}
            max={1000}
            step={10}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>Minimum Rating</Typography>
          <Slider
            value={filters.rating}
            onChange={(e, val) => setFilters({ ...filters, rating: val })}
            min={0}
            max={5}
            step={0.5}
            valueLabelDisplay="auto"
            marks
            sx={{ mb: 3 }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default FontSelector;
