import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';

import { listTodos } from '../server/src/graphql/queries.js'; 
import config from '../server/src/amplifyconfiguration.json';

Amplify.configure(config); 

export default function App(){
  const [todos, setTodos] = useState([]);
  const [nextToken, setNextToken] = useState(null);

  useEffect(() => {
    if (!window.__hasFetched__) {
      fetchTodos();
      window.__hasFetched__ = true;
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const client = generateClient();
      const result = await client.graphql({ query: listTodos });
      setTodos(result.data.listTodos.items);
      setNextToken(result.data.listTodos.nextToken);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  return (
    <div>
      <h2>Lista de TODOs</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <small>Creado en: {new Date(todo.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      {nextToken && (
        <button onClick={() => fetchTodos(nextToken)}>Cargar más</button>
      )}
    </div>
  );
};
