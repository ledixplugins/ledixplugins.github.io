// Serve o AURA Tone em tone.ledixplugins.com.br (raiz do subdomínio = /auratone/app/) e a versão online do
// AURA Synth em synth.ledixplugins.com.br (raiz do subdomínio = pasta /synth/).
// O synth.ledixplugins.com.br é um link secreto (para mostrar a amigos e parceiros): não aparece no site,
// não entra no sitemap e pede aos buscadores para não indexar nem rastrear.
// Todo o resto do site continua sendo servido como arquivos estáticos.
const TONE_HOST = "tone.ledixplugins.com.br";
const SYNTH_HOST = "synth.ledixplugins.com.br";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === SYNTH_HOST) {
      if (url.pathname === "/robots.txt") {
        return new Response("User-agent: *\nDisallow: /\n", { headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex, nofollow" } });
      }
      if (url.pathname.startsWith("/synth/")) {
        return Response.redirect("https://" + SYNTH_HOST + url.pathname.slice(6) + url.search, 301);
      }
      url.pathname = "/synth" + (url.pathname === "/index.html" ? "/" : url.pathname);
      const r = await env.ASSETS.fetch(new Request(url, request));
      const out = new Response(r.body, r);
      out.headers.set("x-robots-tag", "noindex, nofollow");
      return out;
    }
    if (url.hostname === TONE_HOST) {
      if (url.pathname === "/" || url.pathname === "/index.html") {
        url.pathname = "/auratone/app/";
        return env.ASSETS.fetch(new Request(url, request));
      }
      if (url.pathname.startsWith("/auratone/app")) {
        return Response.redirect("https://" + TONE_HOST + "/", 301);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
