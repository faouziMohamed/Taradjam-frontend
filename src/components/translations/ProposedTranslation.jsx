/* eslint-disable camelcase */
import { Box, IconButton, ListItem, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { IoTriangle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { mutate } from 'swr';

import { API_ENDPOINTS } from '@/lib/Constants';
import { beautifyNumber } from '@/lib/utils';

import AlertSnackBar from '@/components/misc/AlertSnackBar';

import { getCurrentSelectedSentence } from '@/features/Sentences';

/**
 * @param {{
 * propositionId:int,
 * translatedText: string,
 * translatedBy:string,
 * translationDate:string,
 * votes:number,
 * }} props
 */

export default function ProposedTranslation(props) {
  const { translationDate, votes } = props;
  const { propositionId, translatedText, translatedBy } = props;
  const currentSentence = useSelector(getCurrentSelectedSentence);
  const [openAlert, setOpenAlert] = useState(false);
  const onClick = useCallback(
    (target = '') => {
      return async () => {
        /** @type {import("axios").AxiosResponse} */
        let response;
        try {
          response = await axios.put(
            API_ENDPOINTS.submitVote({
              propositionId,
              target,
            }),
          );
          if ([200, 202].includes(response.status)) {
            await mutate(
              API_ENDPOINTS.getProposedTranslations(
                currentSentence.sentenceVoId,
              ),
            );
          }
        } catch (err) {
          setOpenAlert(true);
        }
      };
    },
    [currentSentence.sentenceVoId, propositionId],
  );
  const date = dayjs().to(dayjs(translationDate));
  const onCloseAlert = () => setOpenAlert(false);
  return (
    <ListItem className='flex w-full gap-1  border-b border-slate-200 border-opacity-40 py-0 pl-0'>
      <Box className='flex'>
        <AlertSnackBar
          open={openAlert}
          severity='error'
          onClose={onCloseAlert}
          text='Un erreur est survenue lors du soumission du vote'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        />
        <Stack className='items-center gap-0'>
          <VoteIcon
            className='hover:text-blue-500'
            onClick={onClick('upvote')}
          />
          <Typography variant='body1' className='text-normal m-0 p-0 '>
            {beautifyNumber(votes)}
          </Typography>
          <VoteIcon
            className='hover:text-red-500 '
            downVote
            onClick={onClick('downvote')}
          />
        </Stack>
      </Box>
      <Stack gap={0.1} className='w-full rounded border p-2 pb-0 '>
        <Typography
          data-id={propositionId}
          id={propositionId}
          lang='fr'
          tabIndex={0}
          component='h2'
          variant='h6'
          className='w-full bg-cyan-100 bg-opacity-30 p-1 font-normal'
        >
          {translatedText}
        </Typography>
        <Stack direction='row' className='items-center justify-between '>
          <Typography className='px-1 text-xs italic text-gray-500'>
            {translatedBy} • {date}
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
}

function VoteIcon({ className = '', downVote = false, onClick = () => {} }) {
  return (
    <IconButton
      onClick={onClick}
      className={`hover:text-opacity-70 active:text-opacity-100 ${className}`}
    >
      <IoTriangle fontSize={16} className={`p-0 ${downVote && 'rotate-180'}`} />
    </IconButton>
  );
}
