'use client';

import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import styles from './IndexCard.module.css'

interface IndexCardProps {
  text: string
  link: string
}

export default function IndexCard(props: IndexCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${props.link}`);
  };

  return (
    <>
      <Card sx={{ width: 200 }}>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography variant="h5" component="h2" className={styles.cardText}>
              <b>{props.text}</b>
            </Typography>
            <ArrowForwardIcon />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </>
  );
}
