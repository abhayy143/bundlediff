import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  let sizeText = 'Unknown';

  if (owner && repo) {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

  
    const { data, error } = await supabase
      .from('repositories')
      .select('main_bundle_size')
      .eq('repo_owner', owner)
      .eq('repo_name', repo)
      .single();

    if (data && !error) {
     
      const bytes = data.main_bundle_size;
      if (bytes < 1024) {
        sizeText = `${bytes} B`;
      } else if (bytes < 1024 * 1024) {
        sizeText = `${(bytes / 1024).toFixed(1)} KB`;
      } else {
        sizeText = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
      }
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20" style="border-radius: 4px;">
      <rect width="75" height="20" fill="#555"/>
      <rect x="75" width="75" height="20" fill="#4c1"/>
      <g fill="#fff" text-anchor="middle" font-family="Verdana, sans-serif" font-size="11" font-weight="bold">
        <text x="37.5" y="14">BundleDiff</text>
        <text x="112.5" y="14">${sizeText}</text>
      </g>
    </svg>
  `.trim();

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, s-maxage=60', // Cache for 60 seconds
    },
  });
}