import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FiPaperclip } from 'react-icons/fi';
interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  attachment?: string;
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
       // Limit message width for better readability
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
        p={3}
      >
        {message.attachment ? (
          <>
            <Flex align="center" mb={2}>
              <FiPaperclip size={18} />
              <Text fontSize="sm" ml={2}>
                Attachment
              </Text>
            </Flex>
            <Box as="a" href={message.attachment} target="_blank" rel="noopener noreferrer">
              View Attachment
            </Box>
          </>
        ) : (
          message.message
        )}
      </Box>
      <Text fontSize="xs" color="gray.500" alignSelf={isUser ? 'flex-end' : 'flex-start'}>
        {message.timestamp}
      </Text>
    </Flex>
  );
};

export default ChatMessage;
