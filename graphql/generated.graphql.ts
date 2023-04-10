import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String'];
  user: UserModel;
};

export type CartInput = {
  color?: InputMaybe<ProductColor>;
  productId: Scalars['Int'];
  quantity?: Scalars['Int'];
  size?: InputMaybe<ProductSize>;
};

export type CartItemModel = {
  __typename?: 'CartItemModel';
  color?: Maybe<ProductColor>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  orderId?: Maybe<Scalars['String']>;
  product: ProductModel;
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
  size?: Maybe<ProductSize>;
  status: CartStatus;
  totalAmount: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserModel;
  userId: Scalars['String'];
};

export enum CartStatus {
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type CategoryModel = {
  __typename?: 'CategoryModel';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<ProductModel>;
  slug: Scalars['String'];
};

export type CheckoutSessionResponse = {
  __typename?: 'CheckoutSessionResponse';
  status?: Maybe<Scalars['String']>;
};

export type CreateSessionResponse = {
  __typename?: 'CreateSessionResponse';
  url: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCart: CartItemModel;
  authenticate: AuthResponse;
  createUser: UserModel;
  decrementCartItem: CartItemModel;
  deleteCartItem: CartItemModel;
  incrementCartItem: CartItemModel;
  updateUser: UserModel;
};


export type MutationAddCartArgs = {
  cartInput: CartInput;
};


export type MutationAuthenticateArgs = {
  authInput: AuthInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDecrementCartItemArgs = {
  cartId: Scalars['String'];
};


export type MutationDeleteCartItemArgs = {
  cartId: Scalars['String'];
};


export type MutationIncrementCartItemArgs = {
  cartId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type OrderModel = {
  __typename?: 'OrderModel';
  cart: Array<CartItemModel>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  totalAmount: Scalars['Int'];
  userId: Scalars['String'];
};

export enum ProductColor {
  Aqua = 'AQUA',
  Beige = 'BEIGE',
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Burlywood = 'BURLYWOOD',
  Gray = 'GRAY',
  Green = 'GREEN',
  Greenyellow = 'GREENYELLOW',
  Navy = 'NAVY',
  Olive = 'OLIVE',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  Silver = 'SILVER',
  Skyblue = 'SKYBLUE',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type ProductModel = {
  __typename?: 'ProductModel';
  categories?: Maybe<Array<CategoryModel>>;
  colors?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  sizes?: Maybe<Array<Scalars['String']>>;
  slug: Scalars['String'];
};

export enum ProductSize {
  Free = 'FREE',
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL'
}

export type Query = {
  __typename?: 'Query';
  cartItems: Array<CartItemModel>;
  categories: Array<CategoryModel>;
  createCheckoutSession: CreateSessionResponse;
  findCategoryBySlug: CategoryModel;
  findProductBySlug: ProductModel;
  getOrderStatusFromStripe: CheckoutSessionResponse;
  getOrders: Array<OrderModel>;
  loginUser: UserModel;
  products: Array<ProductModel>;
  search: Array<ProductModel>;
};


export type QueryFindCategoryBySlugArgs = {
  categorySlug: Scalars['String'];
};


export type QueryFindProductBySlugArgs = {
  productSlug: Scalars['String'];
};


export type QueryGetOrderStatusFromStripeArgs = {
  id: Scalars['String'];
};


export type QueryGetOrdersArgs = {
  userId: Scalars['String'];
};


export type QuerySearchArgs = {
  name: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  cartItems: Array<CartItemModel>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CartFragment = { __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any };

export type CategoryFragment = { __typename?: 'CategoryModel', id: string, name: string, slug: string };

export type OrderFragment = { __typename?: 'OrderModel', id: string, totalAmount: number, userId: string, createdAt: any };

export type ProductFragment = { __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any };

export type UserFragment = { __typename?: 'UserModel', id: string, name: string, email: string };

export type AddCartMutationVariables = Exact<{
  cartInput: CartInput;
}>;


export type AddCartMutation = { __typename?: 'Mutation', addCart: { __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, user: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserModel', id: string, name: string, email: string } };

export type DecrementCartItemMutationVariables = Exact<{
  cartId: Scalars['String'];
}>;


export type DecrementCartItemMutation = { __typename?: 'Mutation', decrementCartItem: { __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, user: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } } };

export type DeleteCartItemMutationVariables = Exact<{
  cartId: Scalars['String'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: { __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, user: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } } };

export type IncrementCartItemMutationVariables = Exact<{
  cartId: Scalars['String'];
}>;


export type IncrementCartItemMutation = { __typename?: 'Mutation', incrementCartItem: { __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, user: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } } };

export type LoginMutationVariables = Exact<{
  authInput: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserModel', id: string, name: string, email: string } };

export type CartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartItemsQuery = { __typename?: 'Query', cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, product: { __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any } }> };

export type CategoryDetailPageQueryVariables = Exact<{
  categorySlug: Scalars['String'];
}>;


export type CategoryDetailPageQuery = { __typename?: 'Query', findCategoryBySlug: { __typename?: 'CategoryModel', id: string, name: string, slug: string, products: Array<{ __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any }> } };

export type CreateCheckoutSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateCheckoutSessionQuery = { __typename?: 'Query', createCheckoutSession: { __typename?: 'CreateSessionResponse', url: string } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryModel', id: string, name: string, slug: string, products: Array<{ __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any }> }> };

export type GetOrderStatusFromStripeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetOrderStatusFromStripeQuery = { __typename?: 'Query', getOrderStatusFromStripe: { __typename?: 'CheckoutSessionResponse', status?: string | null } };

export type GetOrdersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders: Array<{ __typename?: 'OrderModel', id: string, totalAmount: number, userId: string, createdAt: any, cart: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any, product: { __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any } }> }> };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any, categories?: Array<{ __typename?: 'CategoryModel', id: string, name: string, slug: string }> | null }> };

export type LoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'UserModel', id: string, name: string, email: string, cartItems: Array<{ __typename?: 'CartItemModel', id: string, quantity: number, totalAmount: number, size?: ProductSize | null, color?: ProductColor | null, productId: number, userId: string, orderId?: string | null, status: CartStatus, createdAt: any }> } };

export type ProductDetailPageQueryVariables = Exact<{
  productSlug: Scalars['String'];
}>;


export type ProductDetailPageQuery = { __typename?: 'Query', findProductBySlug: { __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any, categories?: Array<{ __typename?: 'CategoryModel', id: string, name: string, slug: string }> | null } };

export type SearchQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'ProductModel', id: string, name: string, slug: string, description: string, images: Array<string>, price: number, colors?: Array<string> | null, sizes?: Array<string> | null, createdAt: any }> };

export const CartFragmentDoc = gql`
    fragment Cart on CartItemModel {
  id
  quantity
  totalAmount
  size
  color
  productId
  userId
  orderId
  status
  createdAt
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on CategoryModel {
  id
  name
  slug
}
    `;
export const OrderFragmentDoc = gql`
    fragment Order on OrderModel {
  id
  totalAmount
  userId
  createdAt
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on ProductModel {
  id
  name
  slug
  description
  images
  price
  colors
  sizes
  createdAt
}
    `;
export const UserFragmentDoc = gql`
    fragment User on UserModel {
  id
  name
  email
}
    `;
export const AddCartDocument = gql`
    mutation AddCart($cartInput: CartInput!) {
  addCart(cartInput: $cartInput) {
    ...Cart
    user {
      ...User
      cartItems {
        ...Cart
      }
    }
  }
}
    ${CartFragmentDoc}
${UserFragmentDoc}`;
export type AddCartMutationFn = Apollo.MutationFunction<AddCartMutation, AddCartMutationVariables>;

/**
 * __useAddCartMutation__
 *
 * To run a mutation, you first call `useAddCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCartMutation, { data, loading, error }] = useAddCartMutation({
 *   variables: {
 *      cartInput: // value for 'cartInput'
 *   },
 * });
 */
export function useAddCartMutation(baseOptions?: Apollo.MutationHookOptions<AddCartMutation, AddCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCartMutation, AddCartMutationVariables>(AddCartDocument, options);
      }
export type AddCartMutationHookResult = ReturnType<typeof useAddCartMutation>;
export type AddCartMutationResult = Apollo.MutationResult<AddCartMutation>;
export type AddCartMutationOptions = Apollo.BaseMutationOptions<AddCartMutation, AddCartMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DecrementCartItemDocument = gql`
    mutation DecrementCartItem($cartId: String!) {
  decrementCartItem(cartId: $cartId) {
    ...Cart
    user {
      ...User
      cartItems {
        ...Cart
      }
    }
  }
}
    ${CartFragmentDoc}
${UserFragmentDoc}`;
export type DecrementCartItemMutationFn = Apollo.MutationFunction<DecrementCartItemMutation, DecrementCartItemMutationVariables>;

/**
 * __useDecrementCartItemMutation__
 *
 * To run a mutation, you first call `useDecrementCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecrementCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decrementCartItemMutation, { data, loading, error }] = useDecrementCartItemMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useDecrementCartItemMutation(baseOptions?: Apollo.MutationHookOptions<DecrementCartItemMutation, DecrementCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecrementCartItemMutation, DecrementCartItemMutationVariables>(DecrementCartItemDocument, options);
      }
export type DecrementCartItemMutationHookResult = ReturnType<typeof useDecrementCartItemMutation>;
export type DecrementCartItemMutationResult = Apollo.MutationResult<DecrementCartItemMutation>;
export type DecrementCartItemMutationOptions = Apollo.BaseMutationOptions<DecrementCartItemMutation, DecrementCartItemMutationVariables>;
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($cartId: String!) {
  deleteCartItem(cartId: $cartId) {
    ...Cart
    user {
      ...User
      cartItems {
        ...Cart
      }
    }
  }
}
    ${CartFragmentDoc}
${UserFragmentDoc}`;
export type DeleteCartItemMutationFn = Apollo.MutationFunction<DeleteCartItemMutation, DeleteCartItemMutationVariables>;

/**
 * __useDeleteCartItemMutation__
 *
 * To run a mutation, you first call `useDeleteCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCartItemMutation, { data, loading, error }] = useDeleteCartItemMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useDeleteCartItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument, options);
      }
export type DeleteCartItemMutationHookResult = ReturnType<typeof useDeleteCartItemMutation>;
export type DeleteCartItemMutationResult = Apollo.MutationResult<DeleteCartItemMutation>;
export type DeleteCartItemMutationOptions = Apollo.BaseMutationOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export const IncrementCartItemDocument = gql`
    mutation IncrementCartItem($cartId: String!) {
  incrementCartItem(cartId: $cartId) {
    ...Cart
    user {
      ...User
      cartItems {
        ...Cart
      }
    }
  }
}
    ${CartFragmentDoc}
${UserFragmentDoc}`;
export type IncrementCartItemMutationFn = Apollo.MutationFunction<IncrementCartItemMutation, IncrementCartItemMutationVariables>;

/**
 * __useIncrementCartItemMutation__
 *
 * To run a mutation, you first call `useIncrementCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementCartItemMutation, { data, loading, error }] = useIncrementCartItemMutation({
 *   variables: {
 *      cartId: // value for 'cartId'
 *   },
 * });
 */
export function useIncrementCartItemMutation(baseOptions?: Apollo.MutationHookOptions<IncrementCartItemMutation, IncrementCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementCartItemMutation, IncrementCartItemMutationVariables>(IncrementCartItemDocument, options);
      }
export type IncrementCartItemMutationHookResult = ReturnType<typeof useIncrementCartItemMutation>;
export type IncrementCartItemMutationResult = Apollo.MutationResult<IncrementCartItemMutation>;
export type IncrementCartItemMutationOptions = Apollo.BaseMutationOptions<IncrementCartItemMutation, IncrementCartItemMutationVariables>;
export const LoginDocument = gql`
    mutation Login($authInput: AuthInput!) {
  authenticate(authInput: $authInput) {
    access_token
    user {
      ...User
      cartItems {
        ...Cart
      }
    }
  }
}
    ${UserFragmentDoc}
${CartFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      authInput: // value for 'authInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CartItemsDocument = gql`
    query CartItems {
  cartItems {
    ...Cart
    product {
      ...Product
    }
  }
}
    ${CartFragmentDoc}
${ProductFragmentDoc}`;

/**
 * __useCartItemsQuery__
 *
 * To run a query within a React component, call `useCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
      }
export function useCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
        }
export type CartItemsQueryHookResult = ReturnType<typeof useCartItemsQuery>;
export type CartItemsLazyQueryHookResult = ReturnType<typeof useCartItemsLazyQuery>;
export type CartItemsQueryResult = Apollo.QueryResult<CartItemsQuery, CartItemsQueryVariables>;
export const CategoryDetailPageDocument = gql`
    query CategoryDetailPage($categorySlug: String!) {
  findCategoryBySlug(categorySlug: $categorySlug) {
    ...Category
    products {
      ...Product
    }
  }
}
    ${CategoryFragmentDoc}
${ProductFragmentDoc}`;

/**
 * __useCategoryDetailPageQuery__
 *
 * To run a query within a React component, call `useCategoryDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryDetailPageQuery({
 *   variables: {
 *      categorySlug: // value for 'categorySlug'
 *   },
 * });
 */
export function useCategoryDetailPageQuery(baseOptions: Apollo.QueryHookOptions<CategoryDetailPageQuery, CategoryDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryDetailPageQuery, CategoryDetailPageQueryVariables>(CategoryDetailPageDocument, options);
      }
export function useCategoryDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryDetailPageQuery, CategoryDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryDetailPageQuery, CategoryDetailPageQueryVariables>(CategoryDetailPageDocument, options);
        }
export type CategoryDetailPageQueryHookResult = ReturnType<typeof useCategoryDetailPageQuery>;
export type CategoryDetailPageLazyQueryHookResult = ReturnType<typeof useCategoryDetailPageLazyQuery>;
export type CategoryDetailPageQueryResult = Apollo.QueryResult<CategoryDetailPageQuery, CategoryDetailPageQueryVariables>;
export const CreateCheckoutSessionDocument = gql`
    query CreateCheckoutSession {
  createCheckoutSession {
    url
  }
}
    `;

/**
 * __useCreateCheckoutSessionQuery__
 *
 * To run a query within a React component, call `useCreateCheckoutSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckoutSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateCheckoutSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateCheckoutSessionQuery(baseOptions?: Apollo.QueryHookOptions<CreateCheckoutSessionQuery, CreateCheckoutSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateCheckoutSessionQuery, CreateCheckoutSessionQueryVariables>(CreateCheckoutSessionDocument, options);
      }
export function useCreateCheckoutSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateCheckoutSessionQuery, CreateCheckoutSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateCheckoutSessionQuery, CreateCheckoutSessionQueryVariables>(CreateCheckoutSessionDocument, options);
        }
export type CreateCheckoutSessionQueryHookResult = ReturnType<typeof useCreateCheckoutSessionQuery>;
export type CreateCheckoutSessionLazyQueryHookResult = ReturnType<typeof useCreateCheckoutSessionLazyQuery>;
export type CreateCheckoutSessionQueryResult = Apollo.QueryResult<CreateCheckoutSessionQuery, CreateCheckoutSessionQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    ...Category
    products {
      ...Product
    }
  }
}
    ${CategoryFragmentDoc}
${ProductFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetOrderStatusFromStripeDocument = gql`
    query GetOrderStatusFromStripe($id: String!) {
  getOrderStatusFromStripe(id: $id) {
    status
  }
}
    `;

/**
 * __useGetOrderStatusFromStripeQuery__
 *
 * To run a query within a React component, call `useGetOrderStatusFromStripeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderStatusFromStripeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderStatusFromStripeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderStatusFromStripeQuery(baseOptions: Apollo.QueryHookOptions<GetOrderStatusFromStripeQuery, GetOrderStatusFromStripeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderStatusFromStripeQuery, GetOrderStatusFromStripeQueryVariables>(GetOrderStatusFromStripeDocument, options);
      }
export function useGetOrderStatusFromStripeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderStatusFromStripeQuery, GetOrderStatusFromStripeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderStatusFromStripeQuery, GetOrderStatusFromStripeQueryVariables>(GetOrderStatusFromStripeDocument, options);
        }
export type GetOrderStatusFromStripeQueryHookResult = ReturnType<typeof useGetOrderStatusFromStripeQuery>;
export type GetOrderStatusFromStripeLazyQueryHookResult = ReturnType<typeof useGetOrderStatusFromStripeLazyQuery>;
export type GetOrderStatusFromStripeQueryResult = Apollo.QueryResult<GetOrderStatusFromStripeQuery, GetOrderStatusFromStripeQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders($userId: String!) {
  getOrders(userId: $userId) {
    ...Order
    cart {
      ...Cart
      product {
        ...Product
      }
    }
  }
}
    ${OrderFragmentDoc}
${CartFragmentDoc}
${ProductFragmentDoc}`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    ...Product
    categories {
      ...Category
    }
  }
}
    ${ProductFragmentDoc}
${CategoryFragmentDoc}`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const LoginUserDocument = gql`
    query LoginUser {
  loginUser {
    ...User
    cartItems {
      ...Cart
    }
  }
}
    ${UserFragmentDoc}
${CartFragmentDoc}`;

/**
 * __useLoginUserQuery__
 *
 * To run a query within a React component, call `useLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginUserQuery(baseOptions?: Apollo.QueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
      }
export function useLoginUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
        }
export type LoginUserQueryHookResult = ReturnType<typeof useLoginUserQuery>;
export type LoginUserLazyQueryHookResult = ReturnType<typeof useLoginUserLazyQuery>;
export type LoginUserQueryResult = Apollo.QueryResult<LoginUserQuery, LoginUserQueryVariables>;
export const ProductDetailPageDocument = gql`
    query ProductDetailPage($productSlug: String!) {
  findProductBySlug(productSlug: $productSlug) {
    ...Product
    categories {
      ...Category
    }
  }
}
    ${ProductFragmentDoc}
${CategoryFragmentDoc}`;

/**
 * __useProductDetailPageQuery__
 *
 * To run a query within a React component, call `useProductDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDetailPageQuery({
 *   variables: {
 *      productSlug: // value for 'productSlug'
 *   },
 * });
 */
export function useProductDetailPageQuery(baseOptions: Apollo.QueryHookOptions<ProductDetailPageQuery, ProductDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDetailPageQuery, ProductDetailPageQueryVariables>(ProductDetailPageDocument, options);
      }
export function useProductDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDetailPageQuery, ProductDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDetailPageQuery, ProductDetailPageQueryVariables>(ProductDetailPageDocument, options);
        }
export type ProductDetailPageQueryHookResult = ReturnType<typeof useProductDetailPageQuery>;
export type ProductDetailPageLazyQueryHookResult = ReturnType<typeof useProductDetailPageLazyQuery>;
export type ProductDetailPageQueryResult = Apollo.QueryResult<ProductDetailPageQuery, ProductDetailPageQueryVariables>;
export const SearchDocument = gql`
    query Search($name: String!) {
  search(name: $name) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;