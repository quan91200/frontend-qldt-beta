import {
  ref,
  watch,
} from 'vue'

import {
  useRoute
} from 'vue-router'

/**
 * Composable to get current page number as a ref (reactive).
 *
 * @param {string} queryKey - Query parameter name. Default = "page".
 * @param {number} defaultPage - Fallback page number if invalid. Default = 1.
 * @returns {import('vue').Ref<number>} Current page number (reactive).
 */
export function usePageNumber(queryKey = 'page', defaultPage = 1) {
  const route = useRoute()
  const page = ref(defaultPage)

  const updatePage = () => {
    const param = route.query[queryKey]
    const value = Array.isArray(param) ? Number(param.at(0)) : Number(param)
    page.value = Number.isNaN(value) ? defaultPage : value
  }

  updatePage()

  watch(
    () => route.query[queryKey],
    () => updatePage()
  )

  return page
}
