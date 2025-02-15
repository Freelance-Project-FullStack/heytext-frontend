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
  InputAdornment,
  CardContent
} from '@mui/material';
import { SendOutlined, SettingOutlined, RobotOutlined, UserOutlined, LockOutlined, StarOutlined } from '@ant-design/icons';

const SAMPLE_PROMPTS = [
  {
    title: "Marketing Content",
    suggestions: [
      "Viết content quảng cáo cho font chữ mới",
      "Tạo caption Instagram cho studio thiết kế",
      "Viết bài blog về xu hướng typography 2024",
      "Tạo email marketing cho khóa học thiết kế"
    ]
  },
  {
    title: "Ý Tưởng Sáng Tạo",
    suggestions: [
      "Gợi ý phối font chữ cho thương hiệu thời trang",
      "Ý tưởng thiết kế logo sử dụng font script",
      "Cách kết hợp màu sắc và typography hiệu quả",
      "Xu hướng thiết kế bao bì sử dụng typography"
    ]
  },
  {
    title: "Lập Kế Hoạch",
    suggestions: [
      "Lên lịch học khóa Typography cơ bản",
      "Tạo roadmap học thiết kế 6 tháng",
      "Lập kế hoạch marketing cho studio",
      "Xây dựng portfolio thiết kế chữ"
    ]
  },
  {
    title: "Hỏi Đáp Dịch Vụ",
    suggestions: [
      "So sánh gói Free và Premium",
      "Cách nâng cấp tài khoản Premium",
      "Chính sách sử dụng font thương mại",
      "Quy trình mua và download font"
    ]
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [openSettings, setOpenSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef(null);
  const [isPremium] = useState(false); // Get from auth context

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!isPremium) {
      setMessages([
        ...messages,
        { 
          text: "Tính năng này chỉ dành cho người dùng Premium. Vui lòng nâng cấp tài khoản để sử dụng.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      return;
    }

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
    setInput(prompt);
  };

  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      {!isPremium && (
        <Alert 
          severity="info" 
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" startIcon={<StarOutlined />}>
              Nâng cấp Premium
            </Button>
          }
        >
          Nâng cấp tài khoản Premium để sử dụng AI Assistant và nhiều tính năng khác
        </Alert>
      )}

      {/* Messages Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {messages.length === 0 ? (
          // Show sample prompts when no messages
          <Grid container spacing={2}>
            {SAMPLE_PROMPTS.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category.title}
                    </Typography>
                    {category.suggestions.map((prompt, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          cursor: 'pointer',
                          p: 1,
                          '&:hover': { bgcolor: 'action.hover' },
                          borderRadius: 1
                        }}
                        onClick={() => handlePromptClick(prompt)}
                      >
                        {prompt}
                      </Typography>
                    ))}
                  </CardContent>
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
                p: 2,
                borderRadius: 2
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
      <Paper sx={{ p: 2, mt: 2 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isPremium ? "Nhập câu hỏi của bạn..." : "Nâng cấp Premium để sử dụng tính năng này"}
          disabled={!isPremium}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSend} disabled={!isPremium || !input.trim()}>
                  <SendOutlined />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Paper>
    </Box>
  );
};

export default Chatbot; 