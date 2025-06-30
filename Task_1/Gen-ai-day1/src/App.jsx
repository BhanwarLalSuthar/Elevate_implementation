import TextSummarizer from './TextSummrize'
import PostGenerator from './components/PostGenerator'
import './App.css'

function App() {

  return (
    <div className="App enhanced-bg">
      <header className="app-header">
        <h1>AI Social Post Generator</h1>
        <p className="subtitle">Create engaging posts for LinkedIn, Twitter, or Instagram with AI ✨</p>
      </header>
      <main className="main-content">
        <TextSummarizer />
        <PostGenerator />
      </main>
      <footer className="app-footer">
        <span>Powered by Gemini API &copy; 2025</span>
      </footer>
    </div>
  )
}

export default App
