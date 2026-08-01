export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          BundleDiff
        </h1>
        
        <p className="text-xl text-gray-400 leading-relaxed">
          Stop merging bloated Pull Requests. BundleDiff automatically calculates your gzipped build sizes, 
          detects heavy dependencies, and posts the delta directly to your GitHub PRs.
        </p>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl text-left space-y-6">
          <h2 className="text-2xl font-semibold border-b border-gray-800 pb-2">Dynamic Repo Badges</h2>
          <p className="text-gray-400">
            Show off your lightweight repository. Add this markdown to your <code className="bg-gray-800 px-1 py-0.5 rounded text-gray-300">README.md</code> to generate a live, auto-updating SVG badge.
          </p>
          
          <div className="bg-black p-4 rounded-lg overflow-x-auto border border-gray-800 font-mono text-sm text-green-400">
            [![BundleDiff](https://your-domain.vercel.app/api/badge?owner=YOUR_ORG&repo=YOUR_REPO)](https://github.com/YOUR_ORG/YOUR_REPO)
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <span className="text-gray-500 text-sm">Live Preview:</span>
            {/* Using standard HTML img to bypass Next.js strict local query pattern rules */}
            <img 
              src="/api/badge?owner=abhayy143&repo=bundlediff" 
              alt="BundleDiff Badge Preview" 
              width="150" 
              height="20" 
              className="rounded"
            />
          </div>
        </div>
      </div>
    </main>
  );
}