import React, { useState } from 'react';

export default function ChatAssistant() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    const response = await fetch('https://csbqxwwdf3.execute-api.us-east-1.amazonaws.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();

    setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ForceOne IT Assistente by Doug</h1>

      <div className="shadow-xl h-96 overflow-auto p-4 space-y-2 bg-gray-100 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.sender === 'bot' ? 'bg-blue-100' : 'bg-gray-200'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-grow border border-gray-300 p-2 rounded-lg"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
