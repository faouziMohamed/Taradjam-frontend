/* eslint-disable camelcase */
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { IconButton, ListItem, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { golfyNumber } from '@/lib/utils';

/**
 * @param {{
 * propositionId:int,
 * translatedText: string,
 * translatedBy:string,
 * translationDate:string
 * }} props
 */
export default function ProposedTranslation({
  propositionId,
  translatedText,
  translatedBy,
  translationDate,
}) {
  const date = dayjs().to(new Date(translationDate));
  return (
    <ListItem className='w-full flex p-1 flex-col'>
      <Stack gap={0.1} className='w-full p-2 pb-0 border rounded '>
        <Typography
          data-id={propositionId}
          id={propositionId}
          lang='fr'
          tabIndex={0}
          component='h2'
          variant='h6'
          className={`
                      bg-cyan-100 bg-opacity-30 w-full 
                        p-1 font-normal 
                    `}
        >
          {translatedText}
        </Typography>
        <Stack direction='row' className='justify-between items-center '>
          <Typography className='text-xs italic text-gray-500 px-1'>
            {translatedBy} • {date}
          </Typography>
          <Stack className='flex-row gap-0'>
            <Stack direction='row' gap={0} className='items-center'>
              <IconButton size='small'>
                <ThumbUpIcon className='text-md text-cyan-500' />
                <ThumbUpOutlinedIcon
                  className='text-md'
                  sx={{ display: 'none' }}
                />
              </IconButton>
              <Typography className='text-sm'>
                {golfyNumber(4563795952)}
              </Typography>
            </Stack>
            <Stack direction='row' gap={0} className='items-center'>
              <IconButton size='small'>
                <ThumbDownIcon
                  className='text-md text-red-400'
                  sx={{ display: 'none' }}
                />
                <ThumbDownOutlinedIcon className='text-md text-gray-500' />
              </IconButton>
              <Typography className='text-sm'>95k</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  );
}
