import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import AppLayout from '@/components/app/AppLayout';

import notFoundImg from '@/images/404-dark.svg';

export default function NotFoundPage() {
  return (
    <AppLayout className='overflow-hidden bg-cyan-50' contentOverflow>
      <Stack className=' items-center justify-start p-8 lgh:justify-center'>
        <Stack className='items-center gap-6'>
          <Box
            className={`
              after:content-[" "] relative flex w-4/5
              max-w-[50rem] items-center justify-center rounded-xl bg-yellow-200 
              p-4 text-center after:absolute after:-bottom-7 after:ml-[6rem]
              after:flex after:border-[15px] after:border-transparent
              after:border-t-yellow-200 sm:after:-ml-14
            `}
          >
            <Typography variant='h1' component='h1' fontSize='2rem'>
              <span> Vous venez de prendre un</span>{' '}
              <span className='font-normal text-blue-500'>chemin</span> qui{' '}
              <span className='font-normal text-red-400'>
                n&apos;existe pas
              </span>{' '}
              !
            </Typography>
          </Box>

          <Box className='relative w-full'>
            <Image
              src={notFoundImg}
              width={450}
              height={350}
              alt='404 page not found'
            />
          </Box>

          <Box
            className={`
              before:content-[" "] relative flex w-4/5
              max-w-[50rem] items-center justify-center rounded-xl bg-cyan-200 
              p-4 text-center after:absolute after:-top-7 after:ml-[6rem]
              after:flex after:border-[15px] after:border-transparent
              after:border-b-cyan-200 sm:after:-ml-20
            `}
          >
            <Typography variant='h1' component='h1' fontSize='2rem'>
              <span> Ourengué </span>{' '}
              <span className='font-normal text-blue-500'>ndziya</span> amba{' '}
              <span className='font-normal text-red-600'> kaysi existé</span> !
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </AppLayout>
  );
}
