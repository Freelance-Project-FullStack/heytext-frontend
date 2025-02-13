import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import {
  CheckOutlined,
  CloseOutlined,
  FontColorsOutlined,
  RobotOutlined,
  BookOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const PricingPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        {
          text: 'Truy cập font chữ miễn phí',
          icon: <FontColorsOutlined />,
          available: true
        },
        {
          text: 'Tải xuống font miễn phí',
          icon: <DownloadOutlined />,
          available: true
        },
        {
          text: 'Xem trước và thử nghiệm font',
          icon: <FontColorsOutlined />,
          available: true
        },
        {
          text: 'AI Assistant',
          icon: <RobotOutlined />,
          available: false
        },
        {
          text: 'Truy cập font Premium',
          icon: <FontColorsOutlined />,
          available: false
        },
        {
          text: 'Truy cập khóa học',
          icon: <BookOutlined />,
          available: false
        }
      ],
      buttonText: 'Bắt đầu miễn phí',
      buttonVariant: 'outlined'
    },
    {
      name: 'Premium',
      price: {
        monthly: 99000,
        yearly: 990000
      },
      features: [
        {
          text: 'Tất cả tính năng Free',
          icon: <CheckOutlined />,
          available: true
        },
        {
          text: 'Không giới hạn AI Assistant',
          icon: <RobotOutlined />,
          available: true
        },
        {
          text: 'Truy cập toàn bộ font Premium',
          icon: <FontColorsOutlined />,
          available: true
        },
        {
          text: 'Truy cập toàn bộ khóa học',
          icon: <BookOutlined />,
          available: true
        },
        {
          text: 'Ưu tiên hỗ trợ khách hàng',
          icon: <CheckOutlined />,
          available: true
        },
        {
          text: 'Giảm giá đặc biệt cho doanh nghiệp',
          icon: <CheckOutlined />,
          available: true
        }
      ],
      buttonText: 'Nâng cấp ngay',
      buttonVariant: 'contained',
      highlighted: true
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chọn gói phù hợp với bạn
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant={billingPeriod === 'monthly' ? 'contained' : 'outlined'}
          onClick={() => setBillingPeriod('monthly')}
          sx={{ mr: 1 }}
        >
          Theo tháng
        </Button>
        <Button
          variant={billingPeriod === 'yearly' ? 'contained' : 'outlined'}
          onClick={() => setBillingPeriod('yearly')}
        >
          Theo năm
          <Chip 
            label="Tiết kiệm 20%" 
            color="success" 
            size="small" 
            sx={{ ml: 1 }} 
          />
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {billingPeriod === 'monthly' ? `$${plan.price.monthly}/tháng` : `$${plan.price.yearly}/năm`}
                </Typography>
                <List>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        {feature.icon}
                      </ListItemIcon>
                      <ListItemText primary={feature.text} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant={plan.buttonVariant}
                  fullWidth
                  onClick={() => {}}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans; 