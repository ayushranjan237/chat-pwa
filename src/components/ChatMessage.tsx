import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'You'; // Check if the message is from the user

  return (
    <Flex
      direction="column"
      align={isUser ? 'flex-end' : 'flex-start'}
      mb={2}
    >
      {!isUser && (
        <Text fontSize="sm" color="gray.500" mb={1}>
          {message.sender}
        </Text>
      )}
      <Box
        bg={isUser ? 'teal.500' : 'gray.200'}
        color={isUser ? 'white' : 'black'}
        borderRadius="lg"
        px={4}
        py={2}
        maxWidth="70%"
      >
        {message.message}
      </Box>
      <Text fontSize="xs" color="gray.500" alignSelf={isUser ? 'flex-end' : 'flex-start'}>
        {message.timestamp}
      </Text>
    </Flex>
  );
};

export default ChatMessage;
