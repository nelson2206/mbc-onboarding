"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FileText,
  Download,
  Upload,
  Trash2,
  Loader2,
  LockKeyhole,
  AlertCircle,
  FolderClock,
  Plus,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { useAuthUser } from "@/lib/userStorage";

const CV_BUCKET = "cv";
const CATEGORIES: Array<{ id: string; label: string; accent: string }> = [
  { id: "general", label: "General", accent: "from-mbc-electric to-mbc-sky" },
  { id: "eficiencia", label: "Eficiencia", accent: "from-success to-mbc-sky" },
  { id: "medios-pago", label: "Medios de Pago", accent: "from-mbc-sky to-mbc-electric" },
  { id: "data", label: "Data", accent: "from-mbc-electric to-success" },
  { id: "banca-corporativa", label: "Banca Corporativa", accent: "from-success to-mbc-electric" },
  { id: "banca-inversion", label: "Banca de Inversión", accent: "from-mbc-sky to-success" },
];

interface CvVersion {
  id: string;
  user_id: string;
  title: string;
  category: string;
  notes: string | null;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
function categoryAccent(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.accent ?? "from-mbc-electric to-mbc-sky";
}

function formatSize(b: number | null): string {
  if (!b) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let v = b, i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return iso; }
}

export default function CvPage() {
  const user = useAuthUser();
  const [versions, setVersions] = useState<CvVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [uploadCategory, setUploadCategory] = useState<string>("general");
  const [filter, setFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (!supabaseEnabled || !supabase || !user) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("cv_versions")
      .select("*")
      .eq("user_id", user.userId)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setVersions((data ?? []) as CvVersion[]);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  async function upload(file: File, category: string) {
    if (!supabase || !user) return;
    if (file.size > 25 * 1024 * 1024) { setError("El archivo supera 25 MB"); return; }
    setUploading(true);
    setError(null);

    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${user.userId}/${category}/${Date.now()}-${safeName}`;

    const { error: upErr } = await supabase.storage.from(CV_BUCKET).upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (upErr) { setUploading(false); setError(upErr.message); return; }

    const { error: dbErr } = await supabase.from("cv_versions").insert({
      user_id: user.userId,
      title: file.name,
      category,
      storage_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
    });
    setUploading(false);
    if (dbErr) {
      await supabase.storage.from(CV_BUCKET).remove([path]);
      setError(dbErr.message);
      return;
    }
    await load();
  }

  async function download(v: CvVersion) {
    if (!supabase) return;
    const { data, error: err } = await supabase.storage.from(CV_BUCKET).createSignedUrl(v.storage_path, 3600);
    if (err || !data?.signedUrl) { setError(err?.message ?? "Sin URL"); return; }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function remove(v: CvVersion) {
    if (!supabase) return;
    if (!window.confirm(`¿Borrar "${v.title}" (${categoryLabel(v.category)})?`)) return;
    await supabase.storage.from(CV_BUCKET).remove([v.storage_path]);
    await supabase.from("cv_versions").delete().eq("id", v.id);
    setVersions((p) => p.filter((x) => x.id !== v.id));
  }

  // Filter view
  const visibleVersions = versions.filter((v) => filter === "all" || v.category === filter);
  const countByCategory = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, versions.filter((v) => v.category === c.id).length])
  );

  // ---- Render: estados especiales --------------------------------------------

  if (!supabaseEnabled) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <Header />
        <div className="glass-panel rounded-3xl p-6 border border-surface-container mt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container/70 flex items-center justify-center shrink-0">
              <FolderClock className="w-6 h-6 text-on-surface-variant" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Modo demo</h3>
              <p className="text-sm text-on-surface-variant">
                Para gestionar tus versiones de CV configura Supabase (ver{" "}
                <code className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface">supabase/README.md</code>).
                Mientras, puedes descargar la plantilla oficial.
              </p>
              <TemplateRow className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <Header />
        <div className="glass-panel rounded-3xl p-6 border border-surface-container mt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-mbc-electric/10 border border-mbc-electric/30 flex items-center justify-center shrink-0">
              <LockKeyhole className="w-6 h-6 text-mbc-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Inicia sesión</h3>
              <p className="text-sm text-on-surface-variant">
                Para subir y gestionar versiones de tu CV. Mientras, descarga la plantilla oficial:
              </p>
              <TemplateRow className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500 space-y-8">
      <Header />

      {/* Plantilla base */}
      <section className="glass-panel rounded-3xl p-6 border border-surface-container relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-mbc-electric to-mbc-sky opacity-15 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mbc-electric to-mbc-sky flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Paso 1</p>
            <h2 className="text-lg font-bold text-on-surface mb-1">Plantilla oficial MBC</h2>
            <p className="text-sm text-on-surface-variant">
              Empieza aquí: descarga la plantilla, completa tus datos, experiencia y skills, y luego sube tu versión en este mismo gestor.
            </p>
          </div>
          <a
            href="/kit/cv-template-minsait.pptx"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-mbc-electric-strong hover:bg-mbc-sky text-white text-sm font-bold rounded-full transition-colors"
          >
            <Download className="w-4 h-4" /> Descargar plantilla
          </a>
        </div>
      </section>

      {/* Upload */}
      <section className="glass-panel rounded-3xl p-6 border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Paso 2</p>
            <h2 className="text-lg font-bold text-on-surface mb-1">Sube tu nueva versión</h2>
            <p className="text-sm text-on-surface-variant mb-3">
              Tu CV puede tener distintos matices según el cliente o sector. Etiqueta cada versión.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setUploadCategory(c.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    uploadCategory === c.id
                      ? "bg-mbc-electric-strong text-white border-mbc-electric"
                      : "bg-surface-container/30 text-on-surface-variant border-surface-container hover:border-mbc-electric/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-on-surface hover:bg-mbc-electric-strong text-background hover:text-white text-sm font-bold rounded-full transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Subiendo..." : `Subir como ${categoryLabel(uploadCategory)}`}
          </button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pptx,.pdf,.docx,.ppt,.doc"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f, uploadCategory);
              e.target.value = "";
            }}
          />
        </div>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-xs text-mbc-blue bg-mbc-electric/10 border border-mbc-electric/30 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
      </section>

      {/* Versiones */}
      <section>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-mbc-blue" />
            <h2 className="text-lg font-bold text-on-surface">Mis versiones</h2>
            <span className="text-xs text-on-surface-variant">· {versions.length} en total</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                filter === "all" ? "bg-on-surface text-background border-on-surface" : "border-surface-container text-on-surface-variant"
              }`}
            >
              Todas ({versions.length})
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  filter === c.id
                    ? "bg-mbc-electric-strong text-white border-mbc-electric"
                    : "border-surface-container text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {c.label} ({countByCategory[c.id]})
              </button>
            ))}
          </div>
        </div>

        {loading && versions.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 border border-surface-container flex items-center justify-center gap-2 text-on-surface-variant">
            <Loader2 className="w-4 h-4 animate-spin" /> Cargando versiones...
          </div>
        ) : visibleVersions.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 border border-surface-container text-center">
            <p className="text-sm text-on-surface-variant">
              {versions.length === 0
                ? "Aún no has subido ninguna versión. Descarga la plantilla y sube tu primer CV."
                : `No tienes versiones en "${categoryLabel(filter)}".`}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {visibleVersions.map((v) => (
                <motion.li
                  key={v.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-panel rounded-2xl p-4 border border-surface-container flex items-center gap-4 hover:border-mbc-electric/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryAccent(v.category)} flex items-center justify-center shrink-0`}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{v.title}</p>
                    <p className="text-xs text-on-surface-variant truncate">
                      <span className="font-bold text-mbc-blue">{categoryLabel(v.category)}</span>
                      {" · "}{formatSize(v.size_bytes)} · {formatDate(v.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => download(v)}
                    className="w-9 h-9 rounded-lg bg-surface-container/50 hover:bg-mbc-electric/10 text-on-surface-variant hover:text-mbc-blue transition-colors flex items-center justify-center"
                    aria-label="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(v)}
                    className="w-9 h-9 rounded-lg bg-surface-container/50 hover:bg-mbc-electric/10 text-on-surface-variant hover:text-mbc-blue transition-colors flex items-center justify-center"
                    aria-label="Borrar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4">
        <FileText className="w-4 h-4 text-mbc-blue" />
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface">CV Corporativo</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
        Tu <span className="text-mbc-blue">CV</span> en versiones por sector
      </h1>
      <p className="text-base text-on-surface-variant max-w-2xl">
        Empieza desde la plantilla oficial Minsait y mantén variantes según el cliente: Eficiencia, Medios de Pago, Data, Banca Corporativa o de Inversión.
      </p>
    </header>
  );
}

function TemplateRow({ className = "" }: { className?: string }) {
  return (
    <a
      href="/kit/cv-template-minsait.pptx"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mbc-electric-strong hover:bg-mbc-sky text-white text-sm font-bold transition-colors ${className}`}
    >
      <Download className="w-4 h-4" /> Descargar plantilla CV
    </a>
  );
}
