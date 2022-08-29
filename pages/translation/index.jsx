import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'dayjs/locale/fr';

import { LOCAL_STORAGE_SELECTED_INDEX } from '@/lib/Constants';
import useInfiniteSentences from '@/hooks/useInfiniteSentences';

import AppLayout from '@/components/app/AppLayout';
import FZDialog from '@/components/misc/Dialog';
import ListOfSentences from '@/components/translations/ListOfSentences';
import TextTranslationPane from '@/components/translations/TextTranslationPane';

import {
  setCurrentSelectedIndex,
  setCurrentSelectedSentence,
} from '@/features/Sentences';

dayjs.extend(relativeTime);
dayjs.locale('fr');

export default function Index() {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen(!open), [open]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('tablet'));
  useEffect(() => setOpen(matches ? false : open || false), [matches, open]); // Close the menu if the screen is big enough
  const response = useInfiniteSentences({ pageSize: 10, page: 0 }); // Fetch sentences from the API
  const { isLoading, data, setSize, size, isReachingEnd } = response;
  const [sentences, setCurrentIndex, selectedSentence] = useSentences(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentSelectedSentence(selectedSentence));
  }, [dispatch, selectedSentence]);

  const UsableListOfSentences = useCallback(
    () => (
      <ListOfSentences
        isLoading={isLoading}
        isReachingEnd={isReachingEnd}
        sentences={sentences}
        setSelected={setCurrentIndex}
        onLoadMore={() => {
          setSize(size + 1);
          localStorage.setItem('size', size);
        }}
        onClick={() => setOpen(false)}
      />
    ),
    [isLoading, isReachingEnd, sentences, setCurrentIndex, setSize, size],
  );
  return (
    <AppLayout>
      {/* Button shown on small screen */}
      <Button
        size='small'
        aria-label='Sentences list'
        onClick={handleClick}
        color='inherit'
        className='my-1 self-end'
        startIcon={<MenuOpenRoundedIcon className='text-5xl' />}
        sx={{ display: { tablet: 'none' } }}
      >
        Voir les phrases
      </Button>
      <Box className='grid grid-cols-1 gap-2 overflow-hidden sm:grid-cols-[1fr_0.5fr]'>
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
  let storedIndex = 0;
  const dispatch = useDispatch();
  if (typeof window !== 'undefined') {
    storedIndex =
      Number(localStorage.getItem(LOCAL_STORAGE_SELECTED_INDEX)) || 0;
  }

  const [currentIndex, setCurrentIndex] = useState(storedIndex);

  dataSentences.forEach(({ data }) => sentences.push(...data));
  const selectedIndex =
    currentIndex >= 0 && currentIndex < sentences.length ? currentIndex : 0;
  const selectedSentence = sentences[selectedIndex];
  dispatch(setCurrentSelectedIndex(selectedIndex));
  return [sentences, setCurrentIndex, selectedSentence];
}
