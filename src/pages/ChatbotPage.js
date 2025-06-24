import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Spinner, FormControl } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const ChatbotPage = () => {
  const [conversation, setConversation] = useState([
    { role: 'assistant', content: 'Hello! I\'m Pathfinder, your AI assistant. Feel free to ask me about career paths or just chat about anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    const updatedConversation = [...conversation, newUserMessage];
    setConversation(updatedConversation);
    setInput('');
    setIsTyping(true);

    try {
      const response = await apiClient.post('/chatbot/', {
        input: input,
        history: updatedConversation.slice(0, -1)
      });
      const botResponse = { role: 'assistant', content: response.data.data.response };
      setConversation(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = { role: 'assistant', content: 'Sorry, I am having trouble connecting. Please try again.' };
      setConversation(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-list">
        {conversation.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className={`chat-bubble ${msg.role}`}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown children={msg.content} remarkPlugins={[remarkGfm]} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message assistant">
            <div className="chat-bubble assistant">
              <Spinner animation="grow" size="sm" className="me-2" /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <Form onSubmit={handleSend} className="chat-form d-flex mt-3">
        <FormControl
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="me-2"
        />
        <Button variant="primary" type="submit" disabled={isTyping}>Send</Button>
      </Form>
    </div>
  );
};
export default ChatbotPage;