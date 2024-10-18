/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProcedimiento = /* GraphQL */ `
  query GetProcedimiento($id: ID!) {
    getProcedimiento(id: $id) {
      id
      nombre
      codigo
      reclamadoRDS
      diferenciaRDS
      autorizadoRDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProcedimientos = /* GraphQL */ `
  query ListProcedimientos(
    $filter: ModelProcedimientoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProcedimientos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        codigo
        reclamadoRDS
        diferenciaRDS
        autorizadoRDS
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// Mutación para eliminar un Todo
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;

// Mutación para eliminar un Procedimiento
export const deleteProcedimiento = /* GraphQL */ `
  mutation DeleteProcedimiento($input: DeleteProcedimientoInput!) {
    deleteProcedimiento(input: $input) {
      id
      nombre
      codigo
      reclamadoRDS
      diferenciaRDS
      autorizadoRDS
      createdAt
      updatedAt
      __typename
    }
  }
`;

// Mutación para crear un Todo
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;

// Mutación para crear un Procedimiento
export const createProcedimiento = /* GraphQL */ `
  mutation CreateProcedimiento(
    $input: CreateProcedimientoInput!
    $condition: ModelProcedimientoConditionInput
  ) {
    createProcedimiento(input: $input, condition: $condition) {
  
      nombre
      codigo
      reclamadoRDS
      diferenciaRDS
      autorizadoRDS
      __typename
    }
  }
`;
