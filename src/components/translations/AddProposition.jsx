import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { API_URL } from '@/lib/Constants';

/**
 * @param {{
 *  textLoading: boolean,
 *  propositionLoading: boolean,
 *  selectedSentence:SentenceData,
 *  mutate: import("swr").KeyedMutator<SentenceProposition>
 * }} props
 */

export default function AddProposition({
  textLoading,
  selectedSentence,
  mutate,
  propositionLoading,
}) {
  /** @type {import("react").MutableRefObject<HTMLFormElement>} */
  const formRef = useRef(null);
  const [proposedTranslation, setProposedTranslation] = useState('');
  const [exists, setExists] = useState(false);
  useEffect(() => {
    setProposedTranslation(formRef?.current?.proposed.value || '');
  }, []);
  const author = 'Anonyme';
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        textVoId: selectedSentence.textId,
        translatedText: proposedTranslation,
        translatedBy: author,
        translationDate: new Date(Date.now()),
        translationLangId: 1,
      };
      /** @type {import("axios").AxiosResponse} */
      let response;
      try {
        response = await axios.post(`${API_URL}/propose/new/translation`, data);
        if ([200, 202].includes(response.status)) {
          setProposedTranslation('');
          e.target.reset();
          mutate();
        }
      } catch (err) {
        // eslint-disable-next-line no-unused-expressions
        String(err.message).endsWith('409') && setExists(true);
      }
    },
    [mutate, proposedTranslation, selectedSentence?.textId],
  );
  const label = 'Proposer une traduction';
  return (
    <Box
      autoComplete='off'
      onSubmit={proposedTranslation ? onSubmit : undefined}
      component='form'
      className='flex flex-col gap-0 mt-1'
      ref={formRef}
    >
      <Snackbar
        open={exists}
        autoHideDuration={6000}
        onClose={() => setExists(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={() => setExists(false)} severity='error' className=''>
          La traduction que vous avez proposée existe déjà.
        </Alert>
      </Snackbar>
      <TextField
        className='w-full text-xl border-0 outline-none'
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

function SlideTransition(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction='down' />;
}
