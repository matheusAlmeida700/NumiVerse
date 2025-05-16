
import { useQuery } from '@tanstack/react-query';
import { planetService, Planet } from '@/services/planetService';

export const usePlanets = () => {
  // Get all planets
  const {
    data: planets,
    isLoading: isLoadingPlanets,
    error: planetsError,
  } = useQuery({
    queryKey: ['planets'],
    queryFn: planetService.getPlanets,
    retry: 1,
    select: (data: Planet[]) => {
      // Sort planets by some criteria if needed
      return data;
    }
  });

  // Get a specific planet by ID
  const getPlanetById = (planetId: string) => {
    return useQuery({
      queryKey: ['planet', planetId],
      queryFn: () => planetService.getPlanetById(planetId),
      retry: 1,
      enabled: !!planetId,
    });
  };

  return {
    planets,
    isLoadingPlanets,
    planetsError,
    getPlanetById,
  };
};
