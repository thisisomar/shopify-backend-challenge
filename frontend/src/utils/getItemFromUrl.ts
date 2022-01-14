import { useRouter } from "next/router";
import { useGetItemQuery } from "../generated/graphql";

export const useGetItemFromUrl = () => {
  const router = useRouter();
  const intId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return useGetItemQuery({ variables: { itemId: intId } });
};