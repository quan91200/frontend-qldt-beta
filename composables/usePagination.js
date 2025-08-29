import {
  computed
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  usePageNumber
} from './usePageNumber'

/**
 * Composable for pagination.
 *
 * @param {{
 *   queryKey?: string,
 *   pageSize?: number,
 *   totalItems?: number,
 *   defaultPage?: number
 * }} options
 */
export function usePagination({
  queryKey = 'page',
  pageSize = 10,
  totalItems = 0,
  defaultPage = 1,
} = {}) {
  const router = useRouter()

  // Current page (reactive, synced with query param)
  const page = usePageNumber(queryKey, defaultPage)

  // Total pages
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems / pageSize))
  )

  // Helpers
  const setPage = (newPage) => {
    const safePage = Math.min(
      Math.max(1, newPage),
      totalPages.value
    )

    router.push({
      query: {
        [queryKey]: safePage
      },
    })
  }

  const nextPage = () => setPage(page.value + 1)
  const prevPage = () => setPage(page.value - 1)

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    setPage,
    nextPage,
    prevPage,
  }
}
