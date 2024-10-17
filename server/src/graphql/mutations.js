/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProcedimiento = /* GraphQL */ `
  mutation CreateProcedimiento(
    $input: CreateProcedimientoInput!
    $condition: ModelProcedimientoConditionInput
  ) {
    createProcedimiento(input: $input, condition: $condition) {
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
export const updateProcedimiento = /* GraphQL */ `
  mutation UpdateProcedimiento(
    $input: UpdateProcedimientoInput!
    $condition: ModelProcedimientoConditionInput
  ) {
    updateProcedimiento(input: $input, condition: $condition) {
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
export const deleteProcedimiento = /* GraphQL */ `
  mutation DeleteProcedimiento(
    $input: DeleteProcedimientoInput!
    $condition: ModelProcedimientoConditionInput
  ) {
    deleteProcedimiento(input: $input, condition: $condition) {
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
