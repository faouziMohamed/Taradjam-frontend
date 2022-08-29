import { Alert, Snackbar } from '@mui/material';

import Transition from '@/components/misc/Transition';

/**
 * @typedef {import("@mui/material").AlertColor} AlertColor
 * @typedef {import("@mui/material").SnackbarOrigin} SnackbarOrigin
 * @typedef {import("@mui/material").SnackbarCloseReason} SnackbarCloseReason
 * @typedef {import("react").SyntheticEvent} SyntheticEvent
 *
 * @typedef {{
 * open:boolean,
 * autoHideDuration:number,
 * onClose: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void,
 * anchorOrigin: SnackbarOrigin,
 * severity: AlertColor,
 * text: string
 * }} PropsArgs
 */
export default function AlertSnackBar(props) {
  const { anchorOrigin, severity, text = '' } = props;
  const { open = false, autoHideDuration = 6000, onClose } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={Transition}
    >
      <Alert onClose={onClose} severity={severity} className=''>
        {text}
      </Alert>
    </Snackbar>
  );
}
