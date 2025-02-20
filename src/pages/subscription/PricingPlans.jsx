import { BookOutlined, CheckOutlined, DownloadOutlined, FontColorsOutlined, RobotOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Chip, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import PaymentQRCode from 'components/payment/PaymentQRCode';

const PricingPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      title: 'Basic',
      name: 'Free',
      description: 'A budget-friendly option for those who want to try out the service',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { text: 'Truy cập font chữ miễn phí', icon: <FontColorsOutlined />, available: true },
        { text: 'Tải xuống font miễn phí', icon: <DownloadOutlined />, available: true },
        { text: 'Xem trước và thử nghiệm font', icon: <FontColorsOutlined />, available: true },
        { text: 'AI Assistant', icon: <RobotOutlined />, available: false },
        { text: 'Truy cập font Premium', icon: <FontColorsOutlined />, available: false },
        { text: 'Truy cập khóa học', icon: <BookOutlined />, available: false }
      ],
      buttonText: 'Bắt đầu miễn phí',
      buttonVariant: 'outlined'
    },
    {
      title: 'Professional',
      name: 'Premium',
      description: 'A budget-friendly option for those who want to try out the service',
      price: {
        monthly: 99000,
        yearly: 990000
      },
      features: [
        { text: 'Tất cả tính năng Free', icon: <CheckOutlined />, available: true },
        { text: 'Không giới hạn AI Assistant', icon: <RobotOutlined />, available: true },
        { text: 'Truy cập toàn bộ font Premium', icon: <FontColorsOutlined />, available: true },
        { text: 'Truy cập toàn bộ khóa học', icon: <BookOutlined />, available: true },
        { text: 'Ưu tiên hỗ trợ khách hàng', icon: <CheckOutlined />, available: true },
        { text: 'Giảm giá đặc biệt cho doanh nghiệp', icon: <CheckOutlined />, available: true }
      ],
      buttonText: 'Nâng cấp ngay',
      buttonVariant: 'contained',
      highlighted: true
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chọn gói phù hợp với bạn
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Button
          variant={billingPeriod === 'monthly' ? 'contained' : 'outlined'}
          onClick={() => setBillingPeriod('monthly')}
          sx={{ mr: 1, fontSize: '16px', padding: '8px 16px' }}
        >
          Theo tháng
        </Button>
        <Button
          variant={billingPeriod === 'yearly' ? 'contained' : 'outlined'}
          onClick={() => setBillingPeriod('yearly')}
          sx={{ fontSize: '16px', padding: '8px 16px' }}
        >
          Theo năm
          <Chip label="Tiết kiệm 20%" color="success" size="small" sx={{ ml: 1 }} />
        </Button>
      </Box>

      <Grid container spacing={0} pl={4} justifyContent="center" >
        {plans.map((plan, index) => (
          <Grid item xs={8} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                border: plan.highlighted ? '2px solid #4caf50' : '1px solid #ddd',
                backgroundColor: plan.highlighted ? '#e8f5e9' : 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '100%', // Ensures consistent card height
                width: '90%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)'
                }
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                {/* <Typography
                  variant="h9"
                  sx={{
                    fontWeight: 'bold',
                    paddingLeft: '1rem',
                    paddingTop: '0.5rem',
                    color: plan.title === 'Premium' ? '#4caf50' : 'black', // Highlight Premium
                  }}
                >
                  {plan.title}
                </Typography> */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    paddingLeft: '1rem',
                    paddingBottom: '0.6rem',
                    color: plan.name === 'Premium' ? '#4caf50' : 'black', // Highlight Premium
                    fontSize: '1.5rem'
                  }}
                >
                  {plan.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    paddingLeft: '1rem',
                    paddingBottom: '0.5rem',
                    color: plan.name === 'Premium' ? '#4caf50' : 'black'
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '2.5rem', // Kích thước lớn hơn cho giá
                      fontWeight: 'bold',
                    }}
                  >
                    {billingPeriod === 'monthly' ? `$${plan.price.monthly}` : `$${plan.price.yearly}`}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '1rem', // Kích thước nhỏ hơn cho đơn vị thời gian
                      fontWeight: 'normal',
                      marginLeft: '0.25rem'
                    }}
                  >
                    {billingPeriod === 'monthly' ? '/tháng' : '/năm'}
                  </Typography>
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    paddingLeft: '1rem',
                    color: 'gray',
                    fontSize: '0.8rem'
                  }}
                >
                  {plan.description}
                </Typography>


                <List sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', paddingLeft: '1rem',paddingBottom: '0.5rem' }} >Features</Typography>
       
                  {plan.features.map((feature, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>{feature.icon}</ListItemIcon>
                      <ListItemText
                        primary={feature.text}
                        sx={{
                          color: feature.available ? 'black' : 'gray',
                          textDecoration: feature.available ? 'none' : 'line-through',
                          textDecorationColor: 'red'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <PaymentQRCode
                  amount={billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  orderId={plan.name}
                  packageId="Premium"
                  label="Thanh toán"
                  variant={plan.buttonVariant}
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans;
