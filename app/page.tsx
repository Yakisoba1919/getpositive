'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [positiveOutput, setPositiveOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data = await response.json();
      if (data.result) {
        setPositiveOutput(data.result);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Service temporarily unavailable';
      setPositiveOutput(`Sorry, ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          Half Glass Full Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Turn negative thoughts into positive perspectives with AI
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-gray-700 mb-2">
              Your thought:
            </label>
            <textarea
              id="inputText"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="E.g.: My glass is only half full..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Thinking...' : 'Transform to Positive'}
          </button>
        </form>

        {positiveOutput && (
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Positive Perspective:</h2>
            <p className="text-gray-700">{positiveOutput}</p>
          </div>
        )}

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Type your negative thought in the box</li>
            <li>Click &quot;Transform to Positive&quot;</li>
            <li>Receive an AI-generated positive perspective</li>
            <li>Try seeing things in this new light</li>
          </ol>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Half Glass Full Generator - Brighten your perspective with AI</p>
      </footer>
    </div>
  );
}
