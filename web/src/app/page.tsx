export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 flex flex-col items-center justify-center p-6 z-0">
      {/* Modern subtle background glow */}
      <div className="absolute top-0 z-[-1] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>

      <div className="max-w-4xl text-center space-y-10 z-10">
        <div className="space-y-4">
          {/* Live Status Badge */}
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
            v1.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 pb-2">
            Bundle<span className="text-emerald-500">Diff</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop merging bloated Pull Requests. Automatically calculate gzipped build sizes, detect heavy dependencies, and post the delta directly to your GitHub PRs.
          </p>
        </div>

        {/* Premium Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl text-left space-y-6 max-w-3xl mx-auto ring-1 ring-white/5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-xl font-semibold text-slate-200">Dynamic Repo Badges</h2>
            {/* Fake Mac Window Dots for aesthetic */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>
          </div>
          
          <p className="text-slate-400 leading-relaxed">
            Show off your lightweight repository. Add this markdown to your <code className="bg-slate-800 px-1.5 py-0.5 rounded-md text-slate-300 font-mono text-sm border border-slate-700 shadow-sm">README.md</code> to generate a live, auto-updating SVG badge.
          </p>
          
          {/* Glowing Code Block */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#0d1117] p-5 rounded-lg overflow-x-auto border border-slate-700 font-mono text-sm shadow-inner break-all">
              <span className="text-slate-500">[![BundleDiff]</span>
              <span className="text-emerald-400">(https://bundlediff.vercel.app/api/badge?owner=YOUR_ORG&repo=YOUR_REPO)</span>
              <span className="text-slate-500">]</span>
              <span className="text-blue-400 hover:underline cursor-pointer">(https://github.com/YOUR_ORG/YOUR_REPO)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
            <span className="text-slate-400 text-sm font-medium">Live Preview:</span>
            <img 
              src="/api/badge?owner=abhayy143&repo=bundlediff" 
              alt="BundleDiff Badge Preview" 
              width="150" 
              height="20" 
              className="rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    </main>
  );
}