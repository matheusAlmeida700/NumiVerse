// import { apiClient } from "./apiClient";

// export interface Planet {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   color: string;
//   unlocked: boolean;
//   progress: number;
//   totalLessons: number;
//   completedLessons: number;
// }

// export const planetService = {
//   // Get all planets
//   getPlanets: async (): Promise<Planet[]> => {
//     const response = await apiClient.get("/planets");
//     return response.data;
//   },

//   // Get a specific planet by ID
//   getPlanetById: async (planetId: string): Promise<Planet> => {
//     const response = await apiClient.get(`/planets/${planetId}`);
//     return response.data;
//   },
// };
