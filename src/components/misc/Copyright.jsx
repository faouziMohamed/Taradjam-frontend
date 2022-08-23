import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Typography color='secondary' component='strong' className='inline-block'>
        {process.env.NEXT_PUBLIC_BACKEND_API_URL}
      </Typography>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
