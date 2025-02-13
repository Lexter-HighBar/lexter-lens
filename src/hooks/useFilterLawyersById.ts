import { useLawyers } from './useLawyers'

export const useFilterLawyersById = (id: number | string) => {
  const lawyers = useLawyers({ page: 1, count: 200 })
  const lawyer = lawyers.data?.items.find((lawyer) => lawyer.id === id)

  const loading = lawyers.isFetching
  const error = lawyers.error

  return { lawyer, loading, error }
}
