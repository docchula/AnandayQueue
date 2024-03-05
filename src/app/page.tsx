import IndexCard from '@/src/components/IndexCard';
import { Stack } from '@mui/material';

export default function Home() {
  const list = [
    { text: 'Queue', link: 'queue' },
    { text: 'Admin', link: 'admin' },
    { text: 'Runner', link: 'runner' },
    { text: 'Inside', link: 'inside' },
    { text: 'Outside', link: 'outside' },
    { text: 'MC-inside', link: 'mcinside' },
    { text: 'MC-outside', link: 'mcoutside' },
    { text: 'Register', link: 'register' },
    { text: 'Entrance', link: 'entrance' },
  ];
  return (
    <Stack
      spacing={0.5}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
    >
      {list.map((item) => (
        <IndexCard text={item.text} link={item.link} key={item.text} />
      ))}
    </Stack>
  );
}
