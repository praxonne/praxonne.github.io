import type { APIRoute } from "astro";

const paths = ["/", "/architecture/", "/security/", "/developers/"];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://praxonne.github.io");
  const entries = paths
    .map((path) => `<url><loc>${new URL(path, origin).href}</loc></url>`)
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
