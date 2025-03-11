import React, { useState } from 'react';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();

    setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ForceOne IT Assistente AWS</h1>
      <div className="shadow-xl h-96 overflow-auto p-4 space-y-2 border rounded-lg">
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
          className="border p-2 flex-grow rounded"
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
