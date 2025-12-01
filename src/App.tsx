import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [selector, setSelector] = useState('span');
  const [text, setText] = useState('Hide sponsored result');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load settings
    chrome.storage.sync.get(['selector', 'text'], (items: { [key: string]: any }) => {
      if (items.selector) setSelector(items.selector);
      if (items.text) setText(items.text);
    });
  }, []);

  const saveOptions = () => {
    chrome.storage.sync.set({
      selector: selector,
      text: text
    }, () => {
      setStatus('Options saved.');
      setTimeout(() => {
        setStatus('');
      }, 750);
    });
  };

  return (
    <div className="w-64 p-4 bg-gray-50">
      <h1 className="text-lg font-bold mb-4">Google Search - Hide Sponsered Settings</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Element Selector
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-sm"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          placeholder="e.g. button"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text to Match (Optional)
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Hide sponsored result"
        />
      </div>

      <button
        onClick={saveOptions}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Save
      </button>

      {status && (
        <div className="mt-2 text-green-600 text-sm text-center">
          {status}
        </div>
      )}
    </div>
  );
}

export default App
