import React from 'react';
import { ChakraProvider, defaultSystem, Text } from '@chakra-ui/react';
import AutoTodo from './components/AutoTodo/AutoTodo';
import { initialItems } from './components/AutoTodo/constants';
import { useGetTransformUser } from './hooks/useGetTransformUser';

const App: React.FC = () => {
  const user = useGetTransformUser();
  return (
    <ChakraProvider value={defaultSystem}>
      <Text>1. Auto Todo</Text>
      <AutoTodo initialItems={initialItems} />
      <Text>2. Create data from API</Text>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </ChakraProvider>
  );
};

export default App;
