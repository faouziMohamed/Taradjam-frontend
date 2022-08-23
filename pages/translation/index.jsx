import 'dayjs/locale/fr';

import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useState } from 'react';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import ListOfSentences from '@/components/translations/ListOfSentences';
import TextTranslationPane from '@/components/translations/TextTranslationPane';
import useInfiniteSentences from '@/hooks/useInfiniteSentences';

dayjs.extend(relativeTime);
dayjs.locale('fr');

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]);
  const response = useInfiniteSentences({ pageSize: 10, page: 0 });
  const { isLoading, data, setSize, size, isReachingEnd } = response;
  const sentencesRes = useSentences(data);
  const [selectedSentence, sentences, selected, setSelected] = sentencesRes;
  const UsableListOfSentences = useCallback(
    () => (
      <ListOfSentences
        isLoading={isLoading}
        isReachingEnd={isReachingEnd}
        sentences={sentences}
        selected={selected}
        setSelected={setSelected}
        onLoadMore={() => {
          setSize(size + 1);
          localStorage.setItem('size', size);
        }}
        onClick={() => setOpen(false)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sentences],
  );
  return (
    <AppLayout>
      {/* Button shown on small screen */}
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
        <TextTranslationPane
          isLoading={isLoading}
          selectedSentence={selectedSentence}
        />
        {/* ListSentences rendered in small screen */}
        <FZDialog
          open={open}
          setOpen={setOpen}
          sx={{ display: { xs: 'flex', tablet: 'none' } }}
        >
          <UsableListOfSentences />
        </FZDialog>
        {/* ListSentences Rendered if screen size > 640px */}
        <Box
          sx={{ overflowY: 'auto', display: { tablet: 'block', xs: 'none' } }}
        >
          <UsableListOfSentences />
        </Box>
      </Box>
    </AppLayout>
  );
}

/**
 * @summary Take the response data from the API response and transform them into an array of sentences
 * @param {PaginationData<SentenceData>[]} dataSentences */
function useSentences(dataSentences = []) {
  /** @type {SentenceData[]} */
  const sentences = [];
  let selectedIndex = 0;
  if (typeof window !== 'undefined') {
    selectedIndex = Number(localStorage.getItem('selectedIndex'));
  }
  const [selected, setSelected] = useState(selectedIndex ?? 0);
  dataSentences.forEach(({ data }) => sentences.push(...data));
  const index = selected >= 0 && selected < sentences.length ? selected : 0;
  const selectedSentence = sentences[index];
  return [selectedSentence, sentences, selected, setSelected];
}
