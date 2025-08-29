import {
  computed
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  usePageNumber
} from '~/composables/usePageNumber'

/**
 * Composable for pagination.
 *
 * @param {Object} options
 * @param {string} [options.queryKey='page'] - Name query param.
 * @param {number} [options.pageSize=10] - Number of items per page.
 * @param {number} [options.totalItems=0] - Total items.
 * @param {number} [options.defaultPage=1] - Default page if not query.
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

  /**
   * Effective page size (>= 1)
   * pageSize <= 0 : fallback 1
   */
  const effectivePageSize = computed(() => (pageSize > 0 ? pageSize : 1))

  /**
   * Total pages
   * Always >= 1
   */
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(totalItems / effectivePageSize.value))
  })

  /**
   * Set page
   * Clamp about [1, totalPages]
   *
   * @param {string} newPage
   */
  const setPage = (newPage) => {
    const safePage = Math.min(
      Math.max(1, newPage),
      totalPages.value
    )

    if (safePage === page.value) return

    router.push({
      query: {
        ...router.currentRoute.value.query,
        [queryKey]: safePage
      },
    })
  }

  const nextPage = () => setPage(page.value + 1)
  const prevPage = () => setPage(page.value - 1)

  return {
    pageSize,

    effectivePageSize,
    page,
    totalItems,
    totalPages,

    setPage,
    nextPage,
    prevPage,
  }
}
