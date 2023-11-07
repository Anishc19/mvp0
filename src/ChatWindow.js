// ChatWindow.jsx
import React, { useState } from 'react';
import './App.css';
import { HumanMessage } from "langchain/schema";
// import { ChatMessageHistory } from "langchain/memory";


export const ChatWindow = ({title, agent, runMode}) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async(e) => {
    console.log("submit")
    console.log("current run mode: " + runMode)
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;
    setConversation((prevConvo) => [...prevConvo, { sender: 'user', text: userInput }]);
    // const aiResponse = 'This is a simulated response.'; // Replace with actual AI response if needed
    const messages = [new HumanMessage({ content: userInput })];
    console.log(messages)

    if (runMode === "Zero-Shot LLM") {
      console.log("Zero-Shot LLM boutta run")
      const aiResponse = await agent.predictMessages(messages);
      console.log(aiResponse);
      setConversation((prevConvo) => [...prevConvo, { sender: 'ai', text: aiResponse.content }]);
    } 

    else if (runMode === "Chat Model") {
      console.log("Chat Model boutta run")
      console.log("user input: " + userInput)
      console.log(agent.memory)
      console.log(agent)
      const aiResponse = await agent.call({ input : userInput });
      console.log(aiResponse);
      setConversation((prevConvo) => [...prevConvo, { sender: 'ai', text: aiResponse.response}]);
    }
    
    else if (runMode === "agent") {
      console.log("agent boutta run")
      const aiResponse = await agent.run(userInput);
      console.log(aiResponse);
      setConversation((prevConvo) => [...prevConvo, { sender: 'ai', text: aiResponse}]);
    }

    setInput('');
    console.log("end submit")
  };


  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Only render the chat window if it's not minimized
  if (!isMinimized) {
    return (
      <div
        className="chat-window"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '300px',
          position: 'absolute',
          padding: '10px',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd} // Stop dragging when the mouse leaves the window
      >
        <h2>{title}</h2> {/* Add this line */}
        <button onClick={toggleMinimize}>Minimize</button>
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question here..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    );
  }

  // Render a button to restore the window when minimized
  return (
    <div
      className="chat-bubble"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} // Stop dragging when the mouse leaves the bubble
    >
      <button onClick={toggleMinimize}>Open</button>
    </div>
  );
};
