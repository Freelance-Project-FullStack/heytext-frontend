import {
  BookOutlined,
  CrownOutlined,
  DollarOutlined,
  DownloadOutlined,
  FontColorsOutlined,
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// charts
import { Line, Pie } from '@ant-design/plots';

const DashboardDefault = () => {
  // const [dateRange, setDateRange] = useState([null, null]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Date Range */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Thống kê tổng quan</Typography>
        {/* <DatePicker.RangePicker 
          value={dateRange}
          onChange={setDateRange}
        /> */}
      </Box>

      {/* User Statistics */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Thống kê người dùng
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Tổng người dùng" count="8,250" percentage={12.3} extra="Tháng trước: 7,345" icon={<UserOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Người dùng Premium" count="2,900" percentage={8.6} extra="35% tổng user" icon={<CrownOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Người dùng mới" count="950" percentage={27.4} extra="Tháng này" icon={<RiseOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Tỷ lệ chuyển đổi" count="32.5%" percentage={4.2} extra="Free → Premium" icon={<RiseOutlined />} />
        </Grid>
      </Grid>

      {/* Revenue Statistics */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Thống kê doanh thu
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <MainCard title="Doanh thu theo thời gian">
            <Line data={revenueData} xField="date" yField="amount" seriesField="type" legend={{ position: 'top' }} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard title="Phân bổ doanh thu">
            <Pie data={revenueDistribution} angleField="value" colorField="type" radius={0.8} label={{ type: 'outer' }} />
          </MainCard>
        </Grid>
      </Grid>

      {/* Font Statistics */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Thống kê font chữ
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Tổng font" count="1,250" percentage={15.2} extra="Premium: 850" icon={<FontColorsOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Lượt tải font" count="18,800" percentage={22.4} extra="Tháng này: 2,430" icon={<DownloadOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Doanh thu font" count="32,5M" percentage={18.2} extra="Tháng này" icon={<DollarOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Font mới" count="45" percentage={12.8} extra="Tháng này" icon={<FontColorsOutlined />} />
        </Grid>
      </Grid>

      {/* Course Statistics */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Thống kê khóa học
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Tổng khóa học" count="25" percentage={8.4} extra="Active: 22" icon={<BookOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Học viên" count="3,850" percentage={16.2} extra="Tháng này: +320" icon={<UserOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Doanh thu khóa học" count="28,2M" percentage={14.8} extra="Tháng này" icon={<DollarOutlined />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce title="Tỷ lệ hoàn thành" count="76.5%" percentage={5.2} extra="Trung bình" icon={<RiseOutlined />} />
        </Grid>
      </Grid>

      {/* Top Performers */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MainCard title="Top Font được tải xuống">
            <List>
              {topFonts.map((font, index) => (
                <ListItem key={font.id + index} divider>
                  <ListItemText primary={font.name} secondary={`${font.downloads.toLocaleString()} lượt tải`} />
                  <Typography color="primary">{font.revenue.toLocaleString()}đ</Typography>
                </ListItem>
              ))}
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard title="Top khóa học">
            <List>
              {topCourses.map((course, index) => (
                <ListItem key={course.id + index} divider>
                  <ListItemText primary={course.name} secondary={`${course.students.toLocaleString()} học viên`} />
                  <Typography color="primary">{course.revenue.toLocaleString()}đ</Typography>
                </ListItem>
              ))}
            </List>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

// Mock data
const revenueData = [
  { date: '2024-01', type: 'Font Sales', amount: 15000000 },
  { date: '2024-01', type: 'Premium Users', amount: 25000000 },
  { date: '2024-01', type: 'Courses', amount: 18000000 },
  { date: '2024-02', type: 'Font Sales', amount: 18000000 },
  { date: '2024-02', type: 'Premium Users', amount: 28000000 },
  { date: '2024-02', type: 'Courses', amount: 20000000 },
  { date: '2024-03', type: 'Font Sales', amount: 22000000 },
  { date: '2024-03', type: 'Premium Users', amount: 32000000 },
  { date: '2024-03', type: 'Courses', amount: 25000000 }
];

const revenueDistribution = [
  { type: 'Font Sales', value: 35 },
  { type: 'Premium Users', value: 45 },
  { type: 'Courses', value: 20 }
];

const topFonts = [
  { id: 1, name: 'Arial Pro', downloads: 2500, revenue: 25000000 },
  { id: 2, name: 'Helvetica Now', downloads: 2100, revenue: 21000000 },
  { id: 3, name: 'Montserrat Plus', downloads: 1800, revenue: 18000000 },
  { id: 4, name: 'Roboto Premium', downloads: 1500, revenue: 15000000 },
  { id: 5, name: 'Open Sans Pro', downloads: 1200, revenue: 12000000 }
];

const topCourses = [
  { id: 1, name: 'Typography Masterclass', students: 850, revenue: 42500000 },
  { id: 2, name: 'Font Design Basic', students: 720, revenue: 36000000 },
  { id: 3, name: 'Digital Branding', students: 650, revenue: 32500000 },
  { id: 4, name: 'Logo Design Pro', students: 580, revenue: 29000000 },
  { id: 5, name: 'UI Typography', students: 520, revenue: 26000000 }
];

export default DashboardDefault;
