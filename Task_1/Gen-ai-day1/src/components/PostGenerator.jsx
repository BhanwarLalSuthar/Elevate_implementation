import React, { useState } from 'react';
import generatePost from '../gemini';
import './PostGenerator.css';

const platforms = [
  { label: 'LinkedIn', value: 'LinkedIn' },
  { label: 'Twitter', value: 'Twitter' },
  { label: 'Instagram', value: 'Instagram' },
];

export default function PostGenerator() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    const prompt = `Write a professional ${platform} post for the topic: '${topic}'. Keep it concise and engaging.`;
    try {
      const post = await generatePost(prompt);
      setResult(post);
    } catch (err) {
      setResult('Error generating post.');
    }
    setLoading(false);
  };

  return (
    <div className="post-generator-container">
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
        />
        <select value={platform} onChange={e => setPlatform(e.target.value)}>
          {platforms.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        {/* button hover or click to change color or background */}
        <button type="submit" disabled={loading} className='hover:bg-blue-200 bg-blue-800 text-white px-4 py-2 rounded'>
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
      </form>
      {result && (
        <div className="output-card">
          <div><strong>Platform:</strong> {platform}</div>
          <div><strong>Generated Post:</strong> {result}</div>
        </div>
      )}
    </div>
  );
}
