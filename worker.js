// Serve o AURA Tone em tone.ledixplugins.com.br (raiz do subdomínio = /auratone/app/).
// Todo o resto do site continua sendo servido como arquivos estáticos.
const TONE_HOST = "tone.ledixplugins.com.br";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
