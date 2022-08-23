import { Typography } from '@mui/material';
import { memo } from 'react';

/**
 * @param {{
 * elRef:import("react").RefObject<HTMLParagraphElement>,
 * textId:int,
 * sentenceVo:string,
 * translatedText:string,
 * className:string,
 * isSelected:boolean,
 * onClick: import("react").Dispatch<import("react").SetStateAction<number>>
 * }} props
 */
function TextOriginal({
  elRef,
  textId,
  sentenceVo,
  translatedText,
  className = '',
  isSelected,
  onClick,
}) {
  return (
    <Typography
      key={textId}
      data-id={textId}
      id={textId}
      lang='fr'
      tabIndex={0}
      component='p'
      ref={elRef}
      className={`
      ${translatedText ? 'bg-cyan-100' : 'bg-red-100'} 
      ${isSelected && `bg-yellow-100 border-yellow-200 `}
      bg-opacity-30 cursor-pointer ${className}
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
