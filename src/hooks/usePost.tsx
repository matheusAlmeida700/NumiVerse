import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/api";

export const usePost = (id?: string) => {
  const isFetchingSingle = !!id;

  const query = useQuery({
    queryKey: isFetchingSingle ? ["post", id] : ["posts"],
    queryFn: isFetchingSingle
      ? () => postService.getById(id!)
      : postService.getAll,
    enabled: isFetchingSingle ? !!id : true,
  });

  return query;
};

export const useAnswer = (id?: string) => {
  const isFetchingSingle = !!id;

  const query = useQuery({
    queryKey: isFetchingSingle ? ["answer", id] : ["answers"],
    queryFn: isFetchingSingle
      ? () => postService.getById(id!)
      : postService.getAll,
    enabled: isFetchingSingle ? !!id : true,
  });

  return query;
};

export default usePost;
