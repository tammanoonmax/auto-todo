import React, { FC, useRef, useState } from 'react';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { Item, ItemType } from './types';
import { AUTO_TODO_DELAY } from './constants';
import { addToList, filterOutItem } from '../../utils/helper';

interface AutoTodoProps {
  initialItems: Item[];
  delay?: number;
}

const AutoTodo: FC<AutoTodoProps> = ({ initialItems, delay = AUTO_TODO_DELAY }) => {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);
  const timeoutRefs = useRef(new Map());

  const getListAndSetterByType = (type: string): [Item[], React.Dispatch<React.SetStateAction<Item[]>>] => {
    switch (type) {
      case ItemType.Fruit:
        return [fruitList, setFruitList];
      case ItemType.Vegetable:
        return [vegetableList, setVegetableList];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };

  const addItemToList = (item: Item) => {
    const [, setList] = getListAndSetterByType(item.type);

    setList((prev) => addToList(prev, item));
    setMainList((prev) => filterOutItem(prev, item));

    const timeoutId = setTimeout(() => {
      setMainList((prev) => addToList(prev, item));
      setList((prev) => filterOutItem(prev, item));
      timeoutRefs.current.delete(item.name); 
    }, delay);

    timeoutRefs.current.set(item.name, timeoutId);
  };

  const backToMainList = (item: Item) => {
    const [, setList] = getListAndSetterByType(item.type);

    const timeoutId = timeoutRefs.current.get(item.name);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(item.name);
    }

    setMainList((prev) => addToList(prev, item));
    setList((prev) => filterOutItem(prev, item));
  };

  return (
    <Flex p={5} justify="center" align="stretch" gap={10} wrap="nowrap">
      <Box flex="1" borderWidth="1px" p={4} rounded="md">
        <VStack gap={4}>
          {mainList.map((item, idx) => (
            <Button
              key={idx}
              colorScheme={item.type === 'Fruit' ? 'orange' : 'green'}
              onClick={() => addItemToList(item)}
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Box>

      <Box flex="1" borderWidth="1px" p={4} rounded="md">
        <VStack gap={4}>
          <Box fontWeight="bold">Fruits</Box>
          {fruitList.map((item, idx) => (
            <Button
              key={idx}
              colorScheme="orange"
              onClick={() => backToMainList(item)}
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Box>

      <Box flex="1" borderWidth="1px" p={4} rounded="md">
        <VStack gap={4}>
          <Box fontWeight="bold">Vegetables</Box>
          {vegetableList.map((item, idx) => (
            <Button
              key={idx}
              colorScheme="green"
              onClick={() => backToMainList(item)}
            >
              {item.name}
            </Button>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default AutoTodo;
