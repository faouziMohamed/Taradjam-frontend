import Typography from '@mui/material/Typography';

import { APP_NAME } from '@/lib/Constants';

export default function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Typography color='secondary' component='strong' className='inline-block'>
        {APP_NAME}
      </Typography>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
