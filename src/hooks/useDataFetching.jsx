import useSWR from 'swr';

import { fetcher } from '@/lib/utils';

/** @param {string} key */
const useFetchSentences = (key) => {
  /** @type {import("swr").SWRResponse<PaginationData<SentenceData>>} */
  const res = useSWR(key, fetcher);
  const { data, error, mutate } = res;
  const hasMore = data && data.nextPage < data.totalPageCount;
  return { data, error, mutate, hasMore, isLoading: !data };
};

export const useUnstranslatedSentences = ({
  start = 1,
  limit = 10,
  meta = false,
}) => {
  const key = `/api/untranslated/sentences?start=${start}&limit=${limit}&meta=${meta}`;
  return useFetchSentences(key);
};

export const useTranslatedSentences = ({
  start = 1,
  limit = 10,
  meta = false,
}) => {
  const key = `/api/translated/sentences?start=${start}&limit=${limit}&meta=${meta}`;
  return useFetchSentences(key);
};

/**
 * @param {{
 *  start?:number,
 *  limit?:number,
 *  meta?:boolean,
 *  variant?:"translated"|"untranslated"|"both"
 * }} query
 *
 * @returns {{
 *  data: SentenceData[],
 *  isLoading: boolean,
 *  hasMore: boolean,
 *  mutate: import("swr").KeyedMutator<QueriedSentences>
 * }}
 */
export const useSentences = ({
  start = 1,
  limit = 10,
  meta = false,
  variant = 'both',
}) => {
  const variantKeys = {
    translated: '/api/translated/sentences',
    untranslated: '/api/untranslated/sentences',
    both: '/api/sentences',
  };
  const url = variantKeys[variant] || variantKeys.both;
  const key = `${url}?start=${start}&limit=${limit}&meta=${meta}`;
  return useFetchSentences(key);
};

/**
 * @param {{
 *  limit?:number,
 *  meta?:boolean,
 *  variant?:"translated"|"untranslated"|"both"
 * }} query
 */
export const useRandomSentences = ({
  limit = 10,
  meta = false,
  variant = 'both',
}) => {
  const variantKeys = {
    translated: '/api/random/translated/sentences',
    untranslated: '/api/random/untranslated/sentences',
    both: '/api/random/sentences',
  };
  const url = variantKeys[variant] || variantKeys.both;
  const key = `${url}?limit=${limit}&meta=${meta}`;
  return useFetchSentences(key);
};

/** @param {string} tid */
export function useProposedTranslation(tid) {
  const key = `proposed/translations/${tid}`;
  /** @type {import("swr").SWRResponse<SentenceProposition>} */
  const res = useSWR(key, fetcher);
  const { data, error, mutate } = res;
  return { data, error, mutate, isLoading: !data && !error };
}
