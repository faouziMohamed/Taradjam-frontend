import { Container } from '@mui/material';

import Header from '@/components/header/Header';
import LandPage from '@/components/home/LandPage';

export default function Main() {
  return (
    <Container className='absolute top-0 left-0 h-full w-full max-w-none overflow-auto bg-hero-pattern bg-fixed bg-no-repeat p-0 smh:overflow-hidden'>
      <Header />
      <LandPage />
    </Container>
  );
}
