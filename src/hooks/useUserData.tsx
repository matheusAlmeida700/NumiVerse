import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export function useUserData() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userService.getById(user.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
}
