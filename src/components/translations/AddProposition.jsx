import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { mutate } from 'swr';

import { API_ENDPOINTS } from '@/lib/Constants';

import AlertSnackBar from '@/components/misc/AlertSnackBar';

import { getCurrentSelectedSentence } from '@/features/Sentences';

/** @param {{ textLoading: boolean, propositionLoading: boolean }} props */
export default function AddProposition({ textLoading, propositionLoading }) {
  /** @type {import("react").MutableRefObject<HTMLFormElement>} */
  const formRef = useRef(null);
  const [proposedTranslation, setProposedTranslation] = useState('');
  const [exists, setExists] = useState(false);
  useEffect(() => {
    setProposedTranslation(formRef?.current?.proposed.value || '');
  }, []);
  const currentSentence = useSelector(getCurrentSelectedSentence);

  const author = 'Anonyme';
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        sentenceVoId: currentSentence.sentenceVoId,
        translatedText: proposedTranslation,
        translatedBy: author,
        translationDate: new Date(Date.now()),
        translationLangId: 1,
      };
      /** @type {import("axios").AxiosResponse} */
      let response;
      try {
        response = await axios.post(API_ENDPOINTS.addNewProposition(), data);
        if ([200, 202].includes(response.status)) {
          setProposedTranslation('');
          e.target.reset();
          await mutate(
            API_ENDPOINTS.getProposedTranslations(currentSentence.sentenceVoId),
          );
        }
      } catch (err) {
        // eslint-disable-next-line no-unused-expressions
        String(err.message).endsWith('409') && setExists(true);
      }
    },
    [proposedTranslation, currentSentence?.sentenceVoId],
  );
  const label = 'Proposer une traduction';
  return (
    <Box
      autoComplete='off'
      onSubmit={proposedTranslation ? onSubmit : undefined}
      component='form'
      className='mt-1 flex flex-col gap-0'
      ref={formRef}
    >
      <AlertSnackBar
        open={exists}
        onClose={() => setExists(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        severity='error'
        text='La traduction que vous avez proposée existe déjà.'
      />
      <TextField
        className='w-full border-0 text-xl outline-none'
        autoFocus
        sx={{ border: 'none', outline: 'none' }}
        disabled={textLoading || propositionLoading}
        name='proposed'
        type='text'
        defaultValue={proposedTranslation}
        error={exists}
        placeholder={label}
        onChange={(e) => {
          // eslint-disable-next-line no-unused-expressions
          exists && setExists(false);
          setProposedTranslation(e.target.value);
        }}
        label={label}
        variant='outlined'
      />
      <Button
        disabled={propositionLoading || !proposedTranslation}
        startIcon={<GradingTwoToneIcon />}
        type='submit'
      >
        Ajouter une traduction
      </Button>
    </Box>
  );
}
