import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Flex, Input, IconButton } from '@chakra-ui/react';
import { FiSend, FiPaperclip} from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import axios from 'axios';

//const PAGE_SIZE = 10; // Number of messages to fetch per page

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  attachment?: string;
}

const ChatScreen: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const pageRef = useRef<number>(0);
  const hasMoreMessagesRef = useRef<boolean>(true);

  // Function to fetch chat data from the API
  const fetchChatData = async () => {
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${pageRef.current}`
      );
      const newMessages = response.data.messages;
      if (!Array.isArray(newMessages)) {
        // If the API response doesn't contain the 'messages' array
        hasMoreMessagesRef.current = false;
        return;
      }
      if (newMessages.length === 0) {
        hasMoreMessagesRef.current = false;
      } else {
        setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
      hasMoreMessagesRef.current = false;
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchChatData();
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newChatMessage = {
      id: chatMessages.length + 1,
      sender: 'You', // Assuming the user is sending the message
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setChatMessages([...chatMessages, newChatMessage]);
    setNewMessage('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newChatMessage: Message = {
          id: chatMessages.length + 1,
          sender: 'You', // Assuming the user is sending the message
          message: newMessage.trim(),
          timestamp: new Date().toISOString(),
          attachment: reader.result as string, // Store the data URL of the attached file
        };
        setChatMessages([...chatMessages, newChatMessage]);
        setNewMessage('');
        setFileInputKey(Date.now()); // Reset file input for the next attachment
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle infinite scrolling
  const handleScroll = useCallback(() => {
    const { scrollTop} = document.documentElement;
    if (scrollTop === 0 && hasMoreMessagesRef.current) {
      // When scrolled to the top and there are more messages to fetch
      pageRef.current++;
      fetchChatData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Flex direction="column" h="100vh" p={4} bg="gray.100">
    <Box flex={1} overflowY="auto">
      {chatMessages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </Box>
    <Flex mt={4} align="center">
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        flex={1}
        mr={2}
        bg="white"
        color="black"
        border="1px solid #ccc"
        borderRadius="md"
        _focus={{ outline: 'none', boxShadow: '0 0 3px #00B8D9' }}
      />
      <IconButton
        icon={<FiPaperclip />}
        as="label"
        htmlFor="file-input"
        cursor="pointer"
        aria-label="Attach File"
        bg="teal.400"
        color="white"
        borderRadius="full"
        _hover={{ bg: 'teal.500' }}
      />
      <input
        type="file"
        id="file-input"
        key={fileInputKey}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <IconButton
        icon={<FiSend />}
        onClick={handleSendMessage}
        aria-label="Send Message"
        bg="teal.500"
        color="white"
        borderRadius="full"
        _hover={{ bg: 'teal.600' }}
      />
    </Flex>
  </Flex>
  );
};

export default ChatScreen;
