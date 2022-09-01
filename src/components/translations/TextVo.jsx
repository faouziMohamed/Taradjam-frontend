import { Typography } from '@mui/material';
import { memo } from 'react';

/**
 * @param {{
 * elRef:import("react").RefObject<HTMLParagraphElement>,
 * sentenceVoId:int,
 * sentenceVo:string,
 * translatedText:string,
 * className:string,
 * isSelected:boolean,
 * onClick: import("react").Dispatch<import("react").SetStateAction<number>>
 * }} props
 */
function TextOriginal({
  elRef,
  sentenceVoId,
  sentenceVo,
  translatedText,
  className = '',
  isSelected,
  onClick,
}) {
  return (
    <Typography
      key={sentenceVoId}
      data-id={sentenceVoId}
      id={sentenceVoId}
      lang='fr'
      tabIndex={0}
      component='p'
      ref={elRef}
      className={`
      ${translatedText ? 'bg-cyan-100' : 'bg-red-100'} 
      ${isSelected && `border-yellow-200 bg-yellow-100 `}
      cursor-pointer bg-opacity-30 ${className}
        `}
      onClick={onClick}
    >
      {sentenceVo}
    </Typography>
  );
}

const TextVo = memo(TextOriginal);
TextVo.displayName = 'TextVo';
export default TextVo;
