import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';

export default function ChatAssistant() {
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
    setUserInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ForceOne IT Assistente AWS</h1>
      <Card className="shadow-xl">
        <CardContent className="h-96 overflow-auto p-4 space-y-2">
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
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-2">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-grow"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </Card>
  );
};

export default App;
