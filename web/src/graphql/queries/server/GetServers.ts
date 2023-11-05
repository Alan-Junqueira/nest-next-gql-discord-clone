import { gql } from "@apollo/client";

export const GET_SERVERS = gql`
  query GetServers($profileId: String!, $email: String!) {
    getServers(profileId: $profileId, email: $email) {
      id
      name
      imageUrl
    }
  }
`;
