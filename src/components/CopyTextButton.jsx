import { useState } from 'react';
import { IconButton, Tooltip, Snackbar } from '@mui/material';
import { CopyOutlined } from '@ant-design/icons';

const CopyTextButton = ({ font, type, tooltipTitle, textToCopy }) => {
  const [open, setOpen] = useState(false);

  const getTextToCopy = () => {
    const baseUrl = window.location.origin;
    switch (type) {
      case 'text':
        return textToCopy;
      case 'html':
        return `<link href="${baseUrl}${font.fontUrl}" rel="stylesheet">
<style>
  .font-${font.id} {
    font-family: '${font.name}', sans-serif;
  }
</style>`;
      case 'css':
        return `font-family: '${font.name}', sans-serif;`;
      case 'cdn':
        return font.cdnUrl || `${baseUrl}${font.fontUrl}`;
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTextToCopy());
      setOpen(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={handleCopy} size="small" disabled={font.disabled}>
          <CopyOutlined />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default CopyTextButton;
