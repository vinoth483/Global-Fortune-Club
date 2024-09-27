import React, { useState } from 'react';
import '../styles/SupportPage.css';

const SupportPage = () => {
  // Initialize the state with a default conversation
  const [messages, setMessages] = useState([
    { text: 'Hi', sender: 'User' }, // Customer's first message
    { text: 'Hi, how can I help you?', sender: 'Admin' }, // Admin's response
  ]);
  const [input, setInput] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'User' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(''); // Clear input

      // Simulate admin response
      setTimeout(() => {
        const adminResponse = generateAdminResponse(input);
        setMessages((prevMessages) => [...prevMessages, adminResponse]);
      }, 1000); // Simulate a delay for admin response
    }
  };

  const generateAdminResponse = (userInput) => {
    // Dummy admin response logic
    return { text: `Admin: Thank you for your message: "${userInput}"`, sender: 'Admin' };
  };

  return (
    <div className="support-page">
      <h1>Admin Chat Support</h1>
      <div className="page-layout">
        {/* User Search Section */}
        <div className="user-search">
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search users..."
          />
        </div>

        {/* Chat Box Section */}
        <div className="chat-window">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="message-container">
                <div className={`message ${message.sender.toLowerCase()}-message`}>
                  {message.text}
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default SupportPage;
