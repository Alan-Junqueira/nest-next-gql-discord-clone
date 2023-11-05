import { GET_SERVERS } from "@/graphql/queries/server/GetServers";
import {
  GetServersQuery,
  GetServersQueryVariables,
} from "@/graphql/types/graphql";
import { useProfileStore } from "@/store/profileStore";
import { useQuery } from "@apollo/client";

export const useServers = () => {
  const [profile] = useProfileStore((state) => [state.state.profile]);

  const { data: servers, loading } = useQuery<
    GetServersQuery,
    GetServersQueryVariables
  >(GET_SERVERS, {
    variables: {
      profileId: profile?.id ?? "",
      email: profile?.email ?? ""
    }
  });

  return {
    servers: servers?.getServers ?? [],
    loading,
  };
};
