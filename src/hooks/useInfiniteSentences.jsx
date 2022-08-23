import useSWRInfinite from 'swr/infinite';

import { fetcher } from '@/lib/utils';

/**
 * @typedef {{
 *   pageSize: number,
 *   page: number,
 *   shuffle: boolean,
 *   variant: "translated" | "untranslated" | "both"
 * }} InfiniteSentencesProps
 *
 * @param {InfiniteSentencesProps} props
 */
function getKey({
  page = 0,
  pageSize = 10,
  shuffle = false,
  variant = 'both',
}) {
  return (pageNumber = page) => {
    const queries = { pageNumber, pageSize, shuffle, variant };
    return `sentences?${new URLSearchParams(queries)}`;
  };
}

/**
 * @summary Fetches sentences from the backend using {@link useSWRInfinite} from swr package.
 * @param {InfiniteSentencesProps} props
 */
export default function useInfiniteSentences({
  pageSize = 10,
  page = 0,
  shuffle = false,
  variant = 'both',
}) {
  /** @type {import("swr/infinite").SWRInfiniteResponse<PaginationData<SentenceData>>} */
  const result = useSWRInfinite(
    getKey(page, pageSize, shuffle, variant),
    fetcher,
  );

  const { data, error, mutate, size, setSize, isValidating } = result;
  const isLoading = !data && !error;
  const isLoadingInitialData = !data && !error;
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('size')) localStorage?.setItem('size', size);
    const sizeStored = Number(localStorage.getItem('size')) || 0;
    if (sizeStored > size) setSize(sizeStored);
  }
  const hasMore =
    isLoading || (size > 0 && data && typeof data[size - 1] !== 'undefined');

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);

  const isRefreshing = isValidating && data && data.length === size;
  const handleRefresh = () => mutate();

  return {
    data,
    error,
    mutate,
    hasMore,
    isLoading,
    isRefreshing,
    isEmpty,
    isReachingEnd,
    size,
    setSize,
    handleRefresh,
    isLoadingInitialData,
  };
}
