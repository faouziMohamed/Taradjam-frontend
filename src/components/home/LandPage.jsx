import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState } from 'react';

import { APP_DESCRIPTION } from '@/lib/Constants';

import AppLogo from '@/components/app/AppLogo';
import FZDialog from '@/components/misc/Dialog';
import Link from '@/components/misc/Link';

import mainImage from '@/images/mainImage2.png';

const LandPage = () => {
  return (
    <Stack className='h-full w-full p-2 xl:flex-row'>
      <section className='flex h-full flex-col items-center gap-3 px-3 smh:justify-center'>
        <Stack>
          <ResponsiveAppLogo />
          <Typography
            variant='body2'
            className='text-center font-mono text-[0.98rem] text-slate-100'
          >
            {APP_DESCRIPTION}
          </Typography>
        </Stack>
        <Stack className='justify-center gap-1 self-center'>
          <Button
            variant='contained'
            component={Link}
            noLinkStyle
            href='/translation'
            className='bg-green-600 font-bold hover:bg-blue-800'
            startIcon={<GTranslateOutlinedIcon />}
          >
            Commencer la traduction
          </Button>
          <ExplainModal />
        </Stack>
        <Stack gap={1} className='items-center md:max-w-[90%] '>
          <Typography
            variant='body2'
            className='text-center font-serif text-xl text-slate-100'
          >
            Ce projet consiste, à partir de phrases en un langues{' '}
            <span className='text-[1.2rem] font-semibold text-yellow-400'>
              source
            </span>
            , de recevoir des propositions de traduction en un langue de{' '}
            <span className='text-[1.2rem] font-semibold text-green-400'>
              destination
            </span>
            , pour créer un dataset de données sur plusieurs langues.
          </Typography>
        </Stack>
      </section>
    </Stack>
  );
};

export default LandPage;

function ResponsiveAppLogo() {
  return (
    <>
      <AppLogo size='medium' sx={{ display: { xs: 'block', sm: 'none' } }} />
      <AppLogo
        size='xlarge'
        sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}
      />
      <AppLogo
        size='2xl'
        sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
      />
    </>
  );
}

function ExplainModal() {
  const [open, setOpen] = useState(false);
  return (
    <Box className='flex justify-center'>
      <Button
        variant='oulined'
        onClick={() => setOpen(true)}
        startIcon={<EmojiObjectsOutlinedIcon />}
        className=' w-max bg-opacity-60 text-[.68rem] font-bold text-white hover:bg-yellow-500 hover:text-white'
      >
        Comment ça marche ?
      </Button>
      <FZDialog setOpen={setOpen} open={open} title='Comment ça marche?'>
        <section className='flex w-full bg-cyan-800 p-3'>
          <div className='relative flex w-full  grow justify-center lg:w-9/12  '>
            <Image
              className='w-full object-cover  '
              src={mainImage}
              alt='Illustration du processus'
            />
          </div>
        </section>
      </FZDialog>
    </Box>
  );
}
