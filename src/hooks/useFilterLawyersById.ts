import { useLawyers } from './useLawyers'

export const useFilterLawyersById = (id: number | string) => {
  const lawyers = useLawyers({ page: 1, count: 200 })

  const lawyer = lawyers.data?.items?.find((lawyer) => lawyer.id === id)

  const loading = lawyers.isFetching
  const error = lawyers.error

  if (loading) {
    return { loading: true, error: null, lawyer: null }
  }

  if (error) {
    return { loading: false, error, lawyer: null }
  }

  if (!lawyers.data?.items) {
    return { loading: false, error: null, lawyer: null }
  }

  return { lawyer, loading, error }
}