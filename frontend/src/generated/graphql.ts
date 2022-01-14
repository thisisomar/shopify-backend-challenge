import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ExportInfo = {
  __typename?: 'ExportInfo';
  success: Scalars['Boolean'];
  url: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  created: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  updated: Scalars['DateTime'];
};

export type ItemInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type ItemUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Item;
  deleteItem: Scalars['Boolean'];
  exportData: ExportInfo;
  updateItem: Item;
};


export type MutationCreateItemArgs = {
  item: ItemInput;
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['Int'];
};


export type MutationExportDataArgs = {
  fields: Array<Scalars['String']>;
};


export type MutationUpdateItemArgs = {
  item: ItemUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  getItem: Item;
  items: Array<Item>;
};


export type QueryGetItemArgs = {
  itemId: Scalars['Int'];
};

export type CreateItemMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, name: string, description: string, quantity: number } };

export type DeleteItemMutationVariables = Exact<{
  itemId: Scalars['Int'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type UpdateItemMutationVariables = Exact<{
  itemId: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', name: string, description: string, quantity: number, updated: any } };

export type ExportDataMutationVariables = Exact<{
  fields: Array<Scalars['String']> | Scalars['String'];
}>;


export type ExportDataMutation = { __typename?: 'Mutation', exportData: { __typename?: 'ExportInfo', success: boolean, url: string } };

export type GetInventoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInventoryQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, description: string, quantity: number }> };

export type GetItemQueryVariables = Exact<{
  itemId: Scalars['Int'];
}>;


export type GetItemQuery = { __typename?: 'Query', getItem: { __typename?: 'Item', id: string, name: string, description: string, quantity: number } };


export const CreateItemDocument = gql`
    mutation CreateItem($name: String!, $description: String!, $quantity: Int!) {
  createItem(item: {name: $name, description: $description, quantity: $quantity}) {
    id
    name
    description
    quantity
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const DeleteItemDocument = gql`
    mutation DeleteItem($itemId: Int!) {
  deleteItem(itemId: $itemId)
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const UpdateItemDocument = gql`
    mutation UpdateItem($itemId: Int!, $name: String!, $description: String!, $quantity: Int!) {
  updateItem(
    item: {id: $itemId, name: $name, description: $description, quantity: $quantity}
  ) {
    name
    description
    quantity
    updated
  }
}
    `;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};
export const ExportDataDocument = gql`
    mutation ExportData($fields: [String!]!) {
  exportData(fields: $fields) {
    success
    url
  }
}
    `;

export function useExportDataMutation() {
  return Urql.useMutation<ExportDataMutation, ExportDataMutationVariables>(ExportDataDocument);
};
export const GetInventoryDocument = gql`
    query GetInventory {
  items {
    id
    name
    description
    quantity
  }
}
    `;

export function useGetInventoryQuery(options: Omit<Urql.UseQueryArgs<GetInventoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetInventoryQuery>({ query: GetInventoryDocument, ...options });
};
export const GetItemDocument = gql`
    query GetItem($itemId: Int!) {
  getItem(itemId: $itemId) {
    id
    name
    description
    quantity
  }
}
    `;

export function useGetItemQuery(options: Omit<Urql.UseQueryArgs<GetItemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetItemQuery>({ query: GetItemDocument, ...options });
};