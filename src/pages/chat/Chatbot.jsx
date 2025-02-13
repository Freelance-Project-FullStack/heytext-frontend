import { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Grid,
  Avatar,
  Alert,
  InputAdornment
} from '@mui/material';
import { SendOutlined, SettingOutlined, RobotOutlined, UserOutlined, LockOutlined, StarOutlined } from '@ant-design/icons';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef(null);

  const samplePrompts = [
    {
      title: "Giải thích code",
      description: "Giải thích đoạn code này hoạt động như thế nào?"
    },
    {
      title: "Debug code",
      description: "Giúp tôi tìm lỗi trong đoạn code này"
    },
    {
      title: "Tối ưu code",
      description: "Làm thế nào để tối ưu đoạn code này?"
    },
    {
      title: "Viết test",
      description: "Viết unit test cho function này"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([
      ...messages,
      { text: input, sender: 'user', timestamp: new Date() }
    ]);

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "This is a mock response. Please configure API key for real responses.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt.description);
  };

  return (
    <Box sx={{ height: '90vh', display: 'flex' }}>
      {/* Left Sidebar - Chat History */}
      <Box
        sx={{
          width: 240,
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          startIcon={<RobotOutlined />}
          onClick={() => setMessages([])}
          sx={{ mb: 2 }}
        >
          New Chat
        </Button>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          Previous Chats
        </Typography>
        {/* Chat history list */}
        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          {[1, 2, 3].map((item) => (
            <Button
              key={item}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                mb: 1,
                px: 2
              }}
            >
              <Typography noWrap>Previous Chat {item}</Typography>
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Pro Feature Alert */}
        <Alert 
          severity="info" 
          sx={{ m: 2 }}
          action={
            <Button color="inherit" size="small" startIcon={<StarOutlined />}>
              Upgrade to Pro
            </Button>
          }
        >
          Unlock advanced features with Pro: Code completion, longer context, priority support
        </Alert>

        {/* Messages Area */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.length === 0 ? (
            // Show sample prompts when no messages
            <Grid container spacing={2} sx={{ p: 2 }}>
              {samplePrompts.map((prompt, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <Typography variant="subtitle1">{prompt.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {prompt.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            // Show messages
            messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  mb: 2,
                  bgcolor: message.sender === 'bot' ? 'action.hover' : 'transparent',
                  p: 2
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: message.sender === 'bot' ? 'primary.main' : 'secondary.main',
                    mr: 2
                  }}
                >
                  {message.sender === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography>{message.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setOpenSettings(true)}>
                    <SettingOutlined />
                  </IconButton>
                  <IconButton onClick={handleSend} disabled={!input.trim()}>
                    <SendOutlined />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Press Enter to send, Shift + Enter for new line
          </Typography>
        </Box>
      </Box>

      {/* API Key Settings Dialog */}
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
        <DialogTitle>API Settings</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              )
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Your API key is stored locally and never shared
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenSettings(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chatbot; 