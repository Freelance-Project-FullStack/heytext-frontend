import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slider,
  TextField,
  Box,
  Stack,
  Chip
} from '@mui/material';
import { useState } from 'react';

const FontPreview = ({ font, open, onClose }) => {
  const [fontSize, setFontSize] = useState(32);
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');

  if (!font) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{font.name}</Typography>
          <Chip 
            label={font.isActive ? 'Active' : 'Inactive'} 
            color={font.isActive ? 'success' : 'default'}
          />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/* Font Information */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Category: {font.category}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {font.styles.map(style => (
                <Chip key={style} label={style} size="small" />
              ))}
            </Stack>
          </Box>

          {/* Font Size Control */}
          <Box>
            <Typography gutterBottom>
              Font Size: {fontSize}px
            </Typography>
            <Slider
              value={fontSize}
              onChange={(e, value) => setFontSize(value)}
              min={8}
              max={72}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Preview Text Input */}
          <TextField
            fullWidth
            multiline
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Preview Text"
          />

          {/* Preview Area */}
          <Box 
            sx={{ 
              p: 3, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              minHeight: '200px'
            }}
          >
            <Typography
              sx={{
                fontFamily: font.name,
                fontSize: `${fontSize}px`,
                lineHeight: 1.5
              }}
            >
              {text}
            </Typography>
          </Box>

          {/* Statistics */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Statistics
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="body2">
                Downloads: {font.downloads.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Views: {font.views.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Rating: {font.rating} / 5
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FontPreview; 