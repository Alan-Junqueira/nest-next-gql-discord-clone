/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  members?: Maybe<Array<Member>>;
  name?: Maybe<Scalars['String']['output']>;
  type: ChannelType;
  updatedAt: Scalars['String']['output'];
};

/** Defines the type of channel */
export enum ChannelType {
  Audio = 'AUDIO',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type CreateProfileDto = {
  email: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServerDto = {
  name: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export type Member = {
  __typename?: 'Member';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  profileId: Scalars['String']['output'];
  role: MemberRole;
  server?: Maybe<Server>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

/** Defines the role of the member on a server */
export enum MemberRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Moderator = 'MODERATOR'
}

export type Mutation = {
  __typename?: 'Mutation';
  createProfile: Profile;
  createServer: Server;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileDto;
};


export type MutationCreateServerArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: CreateServerDto;
};

export type Profile = {
  __typename?: 'Profile';
  channels?: Maybe<Array<Maybe<Channel>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  servers?: Maybe<Array<Maybe<Server>>>;
};

export type Query = {
  __typename?: 'Query';
  getProfileByEmail: Profile;
  getProfileById: Profile;
  getServers: Array<Server>;
};


export type QueryGetProfileByEmailArgs = {
  profileEmail: Scalars['String']['input'];
};


export type QueryGetProfileByIdArgs = {
  profileId: Scalars['String']['input'];
};


export type QueryGetServersArgs = {
  email: Scalars['String']['input'];
  profileId: Scalars['String']['input'];
};

export type Server = {
  __typename?: 'Server';
  channels?: Maybe<Array<Maybe<Channel>>>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  inviteCode?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<Member>>>;
  name: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  profileId: Scalars['Float']['output'];
};

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileDto;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id: string, imageUrl: string, name?: string | null, email?: string | null } };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerDto;
  file: Scalars['Upload']['input'];
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: string, name: string, imageUrl: string, members?: Array<{ __typename?: 'Member', id: string } | null> | null } };

export type GetServersQueryVariables = Exact<{
  profileId: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type GetServersQuery = { __typename?: 'Query', getServers: Array<{ __typename?: 'Server', id: string, name: string, imageUrl: string }> };


export const CreateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProfileDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateServerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateServer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServerDTO"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServerMutation, CreateServerMutationVariables>;
export const GetServersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetServersQuery, GetServersQueryVariables>;