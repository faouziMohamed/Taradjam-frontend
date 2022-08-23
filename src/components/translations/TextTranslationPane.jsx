/* eslint-disable camelcase */
import { Collapse, List, Skeleton, Stack, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import { RectangularSkeletonWaves } from '@/components/misc/Skeletons';
import { useProposedTranslation } from '@/hooks/useDataFetching';

import AddProposition from './AddProposition';
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
  const res = useProposedTranslation(selectedSentence?.textId);
  const { data: proposed, isLoading: propositionLoading, error, mutate } = res;
  return (
    <Stack gap={2} className='p-3 overflow-auto'>
      <Stack gap={0.5} className='shadow-sm p-1 shadow-black rounded'>
        {textLoading ? (
          <Skeleton
            variant='rectangular'
            className='w-full h-[3.75rem] rounded-lg bg-cyan-100'
            animation='wave'
          />
        ) : (
          <Typography
            variant='body1'
            component='p'
            className='p-2 bg-opacity-100 rounded bg-cyan-100 text-center text-2xl'
          >
            {selectedSentence.sentenceVo}
          </Typography>
        )}
        <AddProposition
          textLoading={textLoading}
          selectedSentence={selectedSentence}
          mutate={mutate}
          propositionLoading={propositionLoading}
        />
      </Stack>
      <List className='overflow-y-auto bg-white border border-gray-100 p-0 w-full flex flex-col rounded'>
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
          />
        </Collapse>
      ))}
    </TransitionGroup>
  );
}
