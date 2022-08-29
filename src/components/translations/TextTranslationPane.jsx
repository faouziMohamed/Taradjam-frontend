/* eslint-disable camelcase */
import { Collapse, List, Skeleton, Stack, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import { useProposedTranslation } from '@/hooks/useDataFetching';

import { RectangularSkeletonWaves } from '@/components/misc/Skeletons';
import AddProposition from '@/components/translations/AddProposition';

import ProposedTranslation from './ProposedTranslation';

/**
 * @param {{
 *   isLoading:boolean,
 *   selectedSentence: SentenceData
 * }} props
 * */
export default function TextTranslationPane({
  isLoading: textLoading,
  selectedSentence,
}) {
  const res = useProposedTranslation(selectedSentence?.sentenceVoId); // Fetch proposed translations for the selected sentence
  const { data: proposed, isLoading: propositionLoading, error } = res;
  return (
    <Stack gap={2} className='overflow-auto p-3'>
      <Stack gap={0.5} className='rounded p-1 shadow-sm shadow-black'>
        {textLoading ? (
          <Skeleton
            variant='rectangular'
            className='h-[3.75rem] w-full rounded-lg bg-cyan-100'
            animation='wave'
          />
        ) : (
          <Typography
            variant='body1'
            component='p'
            className='rounded bg-cyan-100 bg-opacity-100 p-2 text-center text-2xl'
          >
            {selectedSentence.sentenceVo}
          </Typography>
        )}
        <AddProposition
          textLoading={textLoading}
          propositionLoading={propositionLoading}
        />
      </Stack>
      <List className='flex w-full flex-col overflow-y-auto rounded border border-gray-100 bg-white p-0'>
        {propositionLoading || error ? (
          <RectangularSkeletonWaves length={10} />
        ) : (
          <PropositionsWithTransition proposed={proposed} />
        )}
      </List>
    </Stack>
  );
}

/**
 * @param {{ proposed: SentenceProposition }} props
 * */
function PropositionsWithTransition({ proposed }) {
  if (!proposed || proposed.propositions.length === 0) return null;
  return (
    <TransitionGroup>
      {proposed?.propositions?.map((p) => (
        <Collapse key={p.translationHash} in>
          <ProposedTranslation
            propositionId={p.propositionId}
            translatedText={p.translatedText}
            translatedBy={p.translatedBy}
            translationDate={p.translationDate}
            votes={p.votes}
          />
        </Collapse>
      ))}
    </TransitionGroup>
  );
}
