import { useQuery } from "@tanstack/react-query";
import { givingMethodsPublicService } from "@/services/giving";

/** Active methods from the backend. Shared by the page list and the request form (one fetch). */
export const useGivingMethods = () =>
  useQuery({
    queryKey: ["giving-methods", "public"],
    queryFn: givingMethodsPublicService.list,
    staleTime: 60 * 1000,
  });
