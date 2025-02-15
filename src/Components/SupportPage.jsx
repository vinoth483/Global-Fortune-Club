import React, { useState, useRef, useEffect } from 'react';
import '../styles/SupportPage.css';

const SupportPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi', sender: 'User' },
    { text: 'Hi, how can I help you?', sender: 'Admin' },
  ]);
  const [input, setInput] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [showChatScrollButton, setShowChatScrollButton] = useState(false);
  const [showSearchScrollButton, setShowSearchScrollButton] = useState(false);

  const chatEndRef = useRef(null);
  const searchEndRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'User' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');

      // Simulate admin response after a delay
      setTimeout(() => {
        const adminResponse = generateAdminResponse(input);
        setMessages((prevMessages) => [...prevMessages, adminResponse]);
      }, 1000);
    }
  };

  const generateAdminResponse = (userInput) => {
    return { text: `Thank you for your message: "${userInput}"`, sender: 'Admin' };
  };

  const scrollToChatBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSearchBottom = () => {
    searchEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowChatScrollButton(scrollHeight - scrollTop > clientHeight + 50);
  };

  const handleSearchScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowSearchScrollButton(scrollHeight - scrollTop > clientHeight + 50);
  };

  useEffect(() => {
    if (!showChatScrollButton) {
      scrollToChatBottom();
    }
  }, [messages, showChatScrollButton]);

  const handleSearch = () => {
    console.log('Searching for:', userSearch);
  };

  return (
    <div className="support-page">
      <div className="page-layout">
        {/* User Search Area */}
        <div className="user-search" onScroll={handleSearchScroll}>
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search users..."
            aria-label="Search users"
          />
          <button className="search-button" onClick={handleSearch} aria-label="Search">
            Search
          </button>
          <div className="search-results">
            {/* Dynamically generated search results */}
            {/* <div>Search result 1</div>
            <div>Search result 2</div>
            <div>Search result 3</div> */}
            <div ref={searchEndRef}></div>
          </div>
          {showSearchScrollButton && (
            <button
              className="scroll-button search-scroll"
              onClick={scrollToSearchBottom}
              aria-label="Scroll to bottom of search results"
            >
              ↓ Scroll
            </button>
          )}
        </div>

        {/* Chat Window */}
        <div className="chat-window" onScroll={handleChatScroll}>
          <div className="messages">
            {/* {messages.map((message, index) => (
              <div key={index} className={`message-container ${message.sender.toLowerCase()}-container`}>
                <div className={`message ${message.sender.toLowerCase()}-message`}>
                  {message.text}
                </div>
              </div>
            ))} */}
            <div ref={chatEndRef}></div>
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              aria-label="Type your message"
            />
            <button onClick={handleSendMessage} aria-label="Send message">Send</button>
          </div>
          {showChatScrollButton && (
            <button className="scroll-button" onClick={scrollToChatBottom} aria-label="Scroll to bottom of chat">
              ↓ Scroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
