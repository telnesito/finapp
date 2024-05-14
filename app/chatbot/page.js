"use client"
import React, { useEffect, useState, useRef } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Page = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, maxWidth: calculateMaxWidth(message.length) }]);
      setMessage('');
    }
  };

  // ancho de los mensajes
  const calculateMaxWidth = (messageLength) => {
    const basePercentage = 10; 
    const incrementPercentage = 5; 
    const numberOfIncrements = Math.ceil(messageLength / 20);
    const maxWidthPercentage = basePercentage + incrementPercentage * numberOfIncrements;
    return Math.min(maxWidthPercentage, 70); 
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='p-5 min-h-[760px] bg-[#F9FAFC]'>
      <div className='flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
        <p className='text-azulMarino text-[18px] font-medium mb-'>Chatbot</p>
        {/* divider */}
        <div className='h-[1px] mt-[5px] mb-[5px] bg-gray-100'></div>
  
        {/* enviar mensaje */}
        <div className='flex flex-col mt-[20px]'>
          <ul ref={messageContainerRef} className='h-[70vh] flex flex-col-reverse overflow-auto'>
            {messages.slice(0).reverse().map((message, index) => (
              <li key={index} className='p-2 m-1 rounded-lg text-white' style={{ maxWidth: `${message.maxWidth}%`, wordWrap: 'break-word', backgroundColor: '#001F3F' }}>{message.text}</li>
            ))}
          </ul>
  
          <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder={'Escribe un mensaje'}
            type='text'
            fullWidth
            sx={{
              '& fieldset': {
                borderColor: '#001F3F !important', 
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type='submit' sx={{ color: '#001F3F' }}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
