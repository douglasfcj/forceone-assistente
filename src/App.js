import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();

    setMessages([...newMessages, { text: data.reply, sender: 'bot' }]);
  };

  return (
    <div className="max-w-xl mx-auto my-10 border border-gray-200 rounded-xl shadow-md">
      <div className="bg-gray-800 text-white p-4 rounded-t-lg text-center font-bold">
        ForceOne IT - Assistente AWS
      </div>

      <div className="h-[400px] overflow-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`inline-block max-w-[80%] p-2 rounded-lg shadow ${
                msg.sender === 'bot' ? 'bg-blue-100' : 'bg-green-100'
              }`}
            >
              {msg.text}
            </div>
          ))}
      </div>

      <div className="flex gap-2 p-4 bg-gray-100 rounded-b-lg">
        <input
          className="flex-grow border border-gray-300 rounded-lg p-2"
          placeholder="Digite sua mensagem aqui..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

export default App;
