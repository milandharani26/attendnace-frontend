import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './card.scss'

interface DcardProps {
  title?: string
  value?: string
  growth?: number
  progress?: number
}


const DCard: React.FC<DcardProps> = ({ title = "Total Revenue", value = "$24,500", growth = 2.5, progress = 75 }) => {
  return (
    <Card className="dashboard-card">
      <CardContent>
        <Typography variant="h6" component="div" className="card-title">
          {title}
        </Typography>
        <Typography variant="h4" component="div" className="card-value">
          {value}
        </Typography>
        <Box className="card-growth">
          <TrendingUpIcon className="growth-icon" />
          <Typography variant="body2" component="span">
            {/* {growth}% more than last week */}
            {`${growth}% ${growth > 0 ? "more" : "less"} than last week`}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} className="card-progress" />
      </CardContent>
    </Card>
  )
}

export default DCard
