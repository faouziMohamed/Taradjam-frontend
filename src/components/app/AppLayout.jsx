import { Stack } from '@mui/material';
import Container from '@mui/material/Container';

import Header from '@/components/header/Header';
import Copyright from '@/components/misc/Copyright';

/**
 * import th FC from react jsdoc
 * @typedef {import("react").ReactChildren} Children
 * @param {{
 *  children: Children,
 *  isLoading?:boolean,
 *  className?:string,
 *  contentOverflow?: boolean
 * }} props
 */

export default function AppLayout({
  children,
  className = '',
  /* , isLoading = false, */
  contentOverflow = false,
}) {
  return (
    <Container
      className={`absolute top-0 left-0 m-0 h-full w-full max-w-none p-0 
       ${!contentOverflow ? 'overflow-hidden' : 'overflow-y-auto'}
       ${className}`}
    >
      <Container
        className={`
          grid h-full w-full max-w-none  
          grid-rows-[auto_1fr] border-l border-gray-50 p-0 
           ${!contentOverflow ? 'overflow-hidden' : 'overflow-y-auto'}
          `}
      >
        <Header />
        <Stack
          gap={1}
          className={`
            ${!contentOverflow ? 'overflow-hidden' : 'overflow-y-auto'}
          `}
        >
          {children}
          <Copyright />
        </Stack>
      </Container>
    </Container>
  );
}
