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
