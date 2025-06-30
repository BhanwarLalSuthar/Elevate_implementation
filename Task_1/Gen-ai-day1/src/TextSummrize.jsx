import { useState } from 'react';
import { getSummary } from './gemini';

function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setError('');
    setSummary([]);
    setLoading(true);
    try {
      if (!text.trim()) {
        setError('Please enter some text to summarize.');
        return;
      }
      const result = await getSummary(text);
      if (result && result[0] === "Could not parse AI response") {
        setError(`An error occurred: ${result[0]}. Raw response: ${result[1]}`);
        setSummary([]);
      } else {
        setSummary(result);
      }
    } catch (e) {
      setError('An unexpected error occurred while summarizing the text.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Text Summarizer</h1>
      <div className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to get a summary..."
        />
      </div>
      <button
        onClick={handleSummarize}
        className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {summary.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Summary</h2>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md space-y-2">
            {summary.map((point, i) => (
              <li key={i} className="text-gray-800">{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default TextSummarizer;