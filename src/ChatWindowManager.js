// ChatWindowManager.jsx
import React, { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { OpenAI } from "langchain/llms/openai";

import { ChatOpenAI } from "langchain/chat_models/openai";


import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";

import { ConversationChain } from "langchain/chains";
import { ChatMessageHistory, BufferMemory } from "langchain/memory";
import { HumanMessage } from "langchain/schema";


const curr_openAIApiKey = "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";

export const ChatWindowManager = () => {
  const [chatWindows, setChatWindows] = useState([]);
  
  const addZeroShotLLM = () => {
    const basic_llm = new OpenAI({
        openAIApiKey: curr_openAIApiKey,
      });
    setChatWindows(prevWindows => [...prevWindows, { agent: basic_llm, title: `Zero-Shot LLM ${prevWindows.length + 1}`, runMode: "Zero-Shot LLM" }]);
    };

  const addChatModel = () => {
    const basic_llm = new OpenAI({
        openAIApiKey: curr_openAIApiKey,
      });
    // const chat_mem = new ChatMessageHistory();
    const chat_mem = new BufferMemory();
    
    const conversation_chain = new ConversationChain({ llm: basic_llm, memory: chat_mem });
    console.log(conversation_chain)
    setChatWindows(prevWindows => [...prevWindows, { agent: conversation_chain, title: `Chat Model ${prevWindows.length + 1}`, runMode: "Chat Model" }]);
  };

  const addMathAgent = async() => {

    const tools = [
        new Calculator(), 
    ]
    const chat_model = new ChatOpenAI({
      openAIApiKey: curr_openAIApiKey,
      temperature: 0,
    });
    const executor = await initializeAgentExecutorWithOptions(tools, chat_model, {
      agentType: "openai-functions",
      verbose: true,
    });
    setChatWindows(prevWindows => [...prevWindows, { agent: executor, title: `Math Agent ${prevWindows.length + 1}`, runMode: "agent" }]);

  }


    return (
    //     <div>
    //     <button onClick={addLLMWindow}>Add LLM Window</button>
    //     {chatWindows.map((_, index) => (
    //         <ChatWindow key={index} title={`Base LLM ${index + 1}`} llm = {basic_llm} />
    //     ))}
    //     </div>
    // );
        <div>
        <button onClick={addZeroShotLLM}>+ Zero-Shot LLM</button>
        <button onClick={addChatModel}>+ Chat Model</button>
        <button onClick={addMathAgent}>+ Math Agent</button>
        {chatWindows.map((window, index) => (
        <ChatWindow key={index} title={window.title} agent={window.agent} runMode={window.runMode}/>
        ))}
    </div>
    );
};