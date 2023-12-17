'use client';

import { Card, CardActionArea, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { Sarabun } from 'next/font/google';

interface IndexCardProps {
  text: string
  link: string
}

const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '400', '500', '600'],
});

export default function IndexCard(props: IndexCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${props.link}`);
  };

  return (
    <>
      <Card sx={{ width: 200 }}>
        <CardActionArea onClick={handleClick}>
          <CardContent className={sarabun.className}>
            <h2>{props.text}</h2>
            <ArrowForwardIcon />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </>
  );
}
