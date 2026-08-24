import React, { useState } from 'react'

export default function SinglePageDashboard() {
  const [topic, setTopic] = useState('')
  const [targetUrl, setTargetUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleRunResearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://YOUR-RENDER-APP-NAME.onrender.com/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, url: targetUrl || undefined }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.detail || 'Failed to generate research report.');
      }

      setResponse(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] font-mono p-4 sm:p-8 md:p-12 text-black flex flex-col justify-between">
      {/* Expanded Max-Width Wrapper */}
      <div className="w-full max-w-6xl mx-auto space-y-8 flex-1">
        
        {/* Expanded Header Box */}
        <header className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            ⚡ Agentic Research Workspace
          </h1>
          <p className="text-sm sm:text-base font-bold text-zinc-700 mt-2 uppercase tracking-wide">
            Multi-Agent System connected to FastAPI backend
          </p>
        </header>

        {/* Expanded Form Section */}
        <section className="border-4 border-black bg-[#f9f8f3] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000]">
          <form onSubmit={handleRunResearch} className="space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-extrabold uppercase mb-2 tracking-wide">
                RESEARCH TOPIC / THESIS PROMPT
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g., Quantum Computing hardware benchmarks 2026..."
                className="w-full p-4 bg-white border-3 border-black font-bold text-base focus:outline-none focus:bg-[#ccff00]/20 shadow-[4px_4px_0px_0px_#000]"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-extrabold uppercase mb-2 tracking-wide">
                TARGET URL TO SCRAPE (OPTIONAL)
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://arxiv.org/abs/..."
                className="w-full p-4 bg-white border-3 border-black text-base focus:outline-none focus:bg-[#ccff00]/20 shadow-[4px_4px_0px_0px_#000]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#ccff00] text-black text-lg font-black uppercase border-3 border-black shadow-[5px_5px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] transition-all disabled:opacity-50"
            >
              {loading ? '🤖 Agents Executing...' : 'EXECUTE AGENTS'}
            </button>
          </form>
        </section>

        {/* Error Output */}
        {error && (
          <div className="p-5 bg-red-100 border-4 border-black text-red-700 font-bold text-base shadow-[6px_6px_0px_0px_#000]">
            ⚠️ Error: {error}
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="space-y-6">
            {/* Final Written Report */}
            {response.report && (
              <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000]">
                <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-3 mb-6">
                  Generated Research Report
                </h2>
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {response.report}
                </div>
              </div>
            )}

            {/* Critic Feedback Card */}
            {response.feedback && (
              <div className="border-4 border-black bg-[#ccff00] p-8 shadow-[8px_8px_0px_0px_#000]">
                <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-3 mb-4">
                  Critic Evaluation
                </h2>
                <div className="whitespace-pre-wrap text-base leading-relaxed font-bold">
                  {response.feedback}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}