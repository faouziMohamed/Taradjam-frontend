/* eslint-disable camelcase */
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { LOCAL_STORAGE_SELECTED_INDEX } from '@/lib/Constants';

import { RectangularSkeletonWaves } from '@/components/misc/Skeletons';
import TextVo from '@/components/translations/TextVo';

import {
  getCurrentSelectedSentenceIndex,
  setCurrentSelectedIndex,
  setCurrentSelectedSentence,
} from '@/features/Sentences';
import emptyList from '@/images/empty-list.svg';

/**
 * @param {{
 * isLoading: boolean,
 * sentences: SentenceData[],
 * setSelected: (index: number) => void,
 * onLoadMore: () => void,
 * isReachingEnd: boolean,
 * onClick: ()=>void
 * }} props
 */
export default function ListOfSentences({
  isLoading,
  sentences,
  setSelected,
  onLoadMore,
  isReachingEnd,
  onClick,
}) {
  const emptyFunction = () => {};
  if (isReachingEnd) return <EmptyListIllustration />;

  return (
    <List className='flex w-full flex-col overflow-hidden border border-gray-100 bg-white'>
      {isLoading ? (
        <RectangularSkeletonWaves length={10} />
      ) : (
        <ShowListItemsOfSentences
          sentences={sentences}
          setSelected={setSelected}
          onClick={onClick}
        />
      )}
      <ListItem className='flex w-full flex-col justify-center p-0 text-center '>
        <Button
          disabled={isLoading}
          variant='text'
          startIcon={isLoading ? <LoadingAnimateIcon /> : <MoreSentencesIcon />}
          onClick={isLoading ? emptyFunction : onLoadMore}
          className={`w-full text-[.82rem] text-cyan-600 
              hover:bg-cyan-100 hover:text-cyan-700 
              ${isLoading && 'cursor-not-allowed'}`}
        >
          {isLoading ? 'Chargement...' : 'Charger plus de phrases'}
        </Button>
      </ListItem>
    </List>
  );
}

/**
 *
 * @param {{
 * sentences: SentenceData[],
 * setSelected: (index: number) => void,
 * onClick: ()=>void
 * }} props
 */
function ShowListItemsOfSentences({ sentences, setSelected, onClick }) {
  const dispatch = useDispatch();
  const selectedSentenceIndex = useSelector(getCurrentSelectedSentenceIndex);
  return sentences.map((s, index) => (
    <ListItem className='flex w-full flex-col p-2' key={s.sentenceVoId}>
      <TextVo
        sentenceVoId={s.sentenceVoId}
        sentenceVo={s.sentenceVo}
        translatedText=''
        isSelected={selectedSentenceIndex === index}
        onClick={() => {
          setSelected(index);
          localStorage.setItem(LOCAL_STORAGE_SELECTED_INDEX, index);
          dispatch(setCurrentSelectedSentence(s));
          dispatch(setCurrentSelectedIndex(index));
          onClick();
        }}
        className={`
                      w-full rounded border-2 border-transparent p-1 
                     outline-2 hover:bg-cyan-50 focus:border-blue-200 
                      focus:bg-yellow-50 focus:outline focus:outline-blue-300
                    `}
      />
    </ListItem>
  ));
}

function EmptyListIllustration() {
  return (
    <Box className='relative flex h-full w-full flex-col items-center justify-center border-gray-100 '>
      <Box className='absolute z-20 bg-opacity-70 p-2'>
        <Typography className='text-md w-full text-center font-bold'>
          La liste des phrases est vide.
        </Typography>
      </Box>
      <Box className='relative flex items-center justify-center bg-cyan-50 bg-opacity-25  p-4'>
        <Box className='overlay absolute top-0 left-0 z-10 h-full w-full bg-cyan-50 bg-opacity-20' />
        <Image
          src={emptyList}
          alt='Empty list illustration'
          className='h-full w-full bg-opacity-50 object-contain'
        />
      </Box>
    </Box>
  );
}

function MoreSentencesIcon() {
  return <GraphicEqIcon className='rotate-90' />;
}

function LoadingAnimateIcon() {
  return <AutorenewIcon className='animate-spin ' />;
}
