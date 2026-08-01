import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // 1. Grab the "size" parameter from the URL (e.g., ?size=142KB)
  const searchParams = request.nextUrl.searchParams;
  const size = searchParams.get('size') || 'Unknown';

  // 2. Generate a clean, simple SVG without text stretching
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20" style="border-radius: 4px;">
      <rect width="75" height="20" fill="#555"/>
      <rect x="75" width="75" height="20" fill="#4c1"/>
      <g fill="#fff" text-anchor="middle" font-family="Verdana, sans-serif" font-size="11" font-weight="bold">
        <text x="37.5" y="14">BundleDiff</text>
        <text x="112.5" y="14">${size}</text>
      </g>
    </svg>
  `.trim();

  // 3. Return the SVG with the correct image headers
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}