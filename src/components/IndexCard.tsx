'use client';

import { Card, CardActionArea, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

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
            <h2>{props.text}</h2>
            <ArrowForwardIcon />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
    </>
  );
}
