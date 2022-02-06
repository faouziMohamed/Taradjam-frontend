/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Button, Stack, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import { useCallback, useEffect, useState } from 'react';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import { ListSentences } from '@/components/translations/ListSentences';
import { TranslationBlock } from '@/components/translations/TranslationBlock';

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]);
  return (
    <AppLayout>
      <Button
        size='small'
        aria-label='Sentences list'
        onClick={handleClick}
        color='inherit'
        className='self-end my-1'
        startIcon={<MenuOpenRoundedIcon className='text-5xl' />}
        sx={{ display: { tablet: 'none' } }}
      >
        Voir les phrases
      </Button>
      <Box className='grid grid-cols-1 sm:grid-cols-[1fr_0.5fr] gap-2 overflow-hidden'>
        <Stack gap={0.5} className='p-3'>
          <TranslationBlock />
        </Stack>

        {/* ListSentences rendered in small screen */}
        <FZDialog
          open={open}
          setOpen={setOpen}
          sx={{ display: { xs: 'flex', tablet: 'none' } }}
        >
          <ListSentences />
        </FZDialog>

        {/* ListSentences Rendered if screen size > 640px */}
        <Box
          sx={{ overflow: 'auto', display: { tablet: 'block', xs: 'none' } }}
        >
          <ListSentences />
        </Box>
      </Box>
    </AppLayout>
  );
}
