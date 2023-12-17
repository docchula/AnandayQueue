import useSWR from 'swr';

export default function useAllParticipant() {
  const { data } = useSWR('/api/participant', { refreshInterval: 3000 });
  return {
    allParticipant: data,
  };
}
