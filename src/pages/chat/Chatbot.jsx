import { RobotOutlined, SendOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
const SAMPLE_PROMPTS = [
  {
    title: 'Marketing Content',
    suggestions: [
      'Viết content quảng cáo cho font chữ mới',
      'Tạo caption Instagram cho studio thiết kế',
      'Viết bài blog về xu hướng typography 2024',
      'Tạo email marketing cho khóa học thiết kế'
    ]
  },
  {
    title: 'Ý Tưởng Sáng Tạo',
    suggestions: [
      'Gợi ý phối font chữ cho thương hiệu thời trang',
      'Ý tưởng thiết kế logo sử dụng font script',
      'Cách kết hợp màu sắc và typography hiệu quả',
      'Xu hướng thiết kế bao bì sử dụng typography'
    ]
  },
  {
    title: 'Lập Kế Hoạch',
    suggestions: [
      'Lên lịch học khóa Typography cơ bản',
      'Tạo roadmap học thiết kế 6 tháng',
      'Lập kế hoạch marketing cho studio',
      'Xây dựng portfolio thiết kế chữ'
    ]
  },
  {
    title: 'Hỏi Đáp Dịch Vụ',
    suggestions: [
      'So sánh gói Free và Premium',
      'Cách nâng cấp tài khoản Premium',
      'Chính sách sử dụng font thương mại',
      'Quy trình mua và download font'
    ]
  }
];

const Chatbot = () => {
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callApi = async (input) => {
    try {
      const response = await axios(`/chatbot/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling API:', error);
      return 'Xin lỗi, đã có lỗi xảy ra khi kết nối với API.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (user?.subscription != 'premium') {
      setMessages([
        ...messages,
        {
          text: 'Tính năng này chỉ dành cho người dùng Premium. Vui lòng nâng cấp tài khoản để sử dụng.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      return;
    }

    // Thêm tin nhắn của người dùng vào state
    const userMessage = { text: input, sender: 'user', timestamp: new Date() };
    setMessages([...messages, userMessage]);

    // Gọi API và nhận câu trả lời
    const botResponse = await callApi(input);

    // Thêm câu trả lời từ bot vào state
    setMessages((prev) => [
      ...prev,
      {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);

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
      {user?.subscription != 'premium' && (
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
          placeholder={user?.subscription == 'premium' ? 'Nhập câu hỏi của bạn...' : 'Nâng cấp Premium để sử dụng tính năng này'}
          disabled={user?.subscription != 'premium'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSend} disabled={!user?.subscription == 'premium' || !input.trim()}>
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
