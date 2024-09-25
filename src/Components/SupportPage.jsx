import React, { useState } from 'react';
import '../styles/SupportPage.css';

const SupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'User' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(''); // Clear input

      // Simulate AI response
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse = generateAIResponse(input);
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setIsTyping(false);
      }, 1000); // Simulate a delay for AI response
    }
  };

  const generateAIResponse = (userInput) => {
    // Simple AI response logic based on keywords
    if (userInput.toLowerCase().includes('help')) {
      return { text: "AI: How can I assist you today?", sender: 'AI' };
    } else if (userInput.toLowerCase().includes('issue')) {
      return { text: "AI: I'm sorry to hear you're facing an issue. Can you provide more details?", sender: 'AI' };
    } else if (userInput.toLowerCase().includes('thank you')) {
      return { text: "AI: You're welcome! Let me know if you need anything else.", sender: 'AI' };
    } else if (userInput.toLowerCase().includes('status')) {
      return { text: "AI: Please specify the order or ticket number you want to check.", sender: 'AI' };
    } else if (userInput.toLowerCase().includes('hello')) {
      return { text: "AI: Hi there! How can I help you today?", sender: 'AI' };
    } else {
      return { text: `AI: I received your message: "${userInput}". Can you elaborate?`, sender: 'AI' };
    }
  };

  return (
    <div className="support-page">
      <h1>Admin Chat Support</h1>
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender.toLowerCase()}-message`}>
              {message.text}
            </div>
          ))}
          {isTyping && <div className="message ai-message">AI: Typing...</div>}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
