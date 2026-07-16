/** Markdown-lite → HTML para las respuestas de la Escuelita.
 *  Soporta: **negrita**, *cursiva*, `código`, viñetas (• - 1.) y tablas |…|.
 *  El contenido proviene de la base de conocimiento estática (confiable);
 *  aun así se escapa todo antes de aplicar el formato inline.
 *  Emite <table class="cmp"> para reutilizar los estilos de .dg-prose.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inl = (s: string) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-container text-[0.85em]">$1</code>');

export function md(src: string): string {
  const lines = src.split("\n");
  let out = "";
  let tbl: string[] = [];
  let ul: string[] = [];

  const flushT = () => {
    if (!tbl.length) return;
    const rows = tbl.filter((r) => !/^\s*\|[\s|:-]+\|\s*$/.test(r));
    let h = '<table class="cmp">';
    rows.forEach((r, i) => {
      const cells = r.split("|").slice(1, -1).map((c) => c.trim());
      h += "<tr>" + cells.map((c) => (i === 0 ? `<th>${inl(c)}</th>` : `<td>${inl(c)}</td>`)).join("") + "</tr>";
    });
    out += h + "</table>";
    tbl = [];
  };

  const flushU = () => {
    if (!ul.length) return;
    out += "<ul>" + ul.map((i) => `<li>${inl(i)}</li>`).join("") + "</ul>";
    ul = [];
  };

  for (const ln of lines) {
    const t = ln.trim();
    if (t.startsWith("|")) {
      flushU();
      tbl.push(t);
      continue;
    }
    flushT();
    if (/^[•\-]\s+/.test(t)) {
      ul.push(t.replace(/^[•\-]\s+/, ""));
      continue;
    }
    if (/^\d+\.\s+/.test(t)) {
      ul.push(t.replace(/^\d+\.\s+/, ""));
      continue;
    }
    flushU();
    if (t) out += `<p>${inl(t)}</p>`;
  }
  flushT();
  flushU();
  return out;
}
