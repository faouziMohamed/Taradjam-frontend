import { ListItem, Skeleton } from '@mui/material';

export function RectangularSkeletonWaves({ length = 10 }) {
  return Array.from({ length }).map((_, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={`sk-${i}_${_}`} className='flex w-full flex-col p-2'>
      <Skeleton
        variant='rectangular'
        className='h-[3rem] w-full grow rounded-lg bg-gray-100'
        animation='wave'
      />
    </ListItem>
  ));
}
