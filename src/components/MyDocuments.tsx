"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Download,
  FileText,
  Loader2,
  LockKeyhole,
  AlertCircle,
  FolderClock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DOCUMENTS_BUCKET, supabase, supabaseEnabled } from "@/lib/supabase";
import { useAuthUser } from "@/lib/userStorage";

interface DocumentRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(value < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function MyDocuments() {
  const authUser = useAuthUser();
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (!supabaseEnabled || !supabase || !authUser) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", authUser.userId)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDocs((data ?? []) as DocumentRow[]);
  }, [authUser]);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(file: File) {
    if (!supabase || !authUser) return;
    if (file.size > 25 * 1024 * 1024) {
      setError("El archivo supera el límite de 25 MB.");
      return;
    }
    setUploading(true);
    setError(null);

    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${authUser.userId}/${Date.now()}-${safeName}`;

    const { error: uploadErr } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
    if (uploadErr) {
      setUploading(false);
      setError(uploadErr.message);
      return;
    }

    const { error: dbErr } = await supabase.from("documents").insert({
      user_id: authUser.userId,
      title: file.name,
      storage_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
    });
    setUploading(false);
    if (dbErr) {
      // Best-effort cleanup of the orphan blob.
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([path]);
      setError(dbErr.message);
      return;
    }
    await load();
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    for (const f of Array.from(files)) {
      await upload(f);
    }
  }

  async function download(doc: DocumentRow) {
    if (!supabase) return;
    const { data, error: err } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .createSignedUrl(doc.storage_path, 3600);
    if (err || !data?.signedUrl) {
      setError(err?.message ?? "No se pudo generar el enlace");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function remove(doc: DocumentRow) {
    if (!supabase) return;
    const ok = window.confirm(`¿Borrar "${doc.title}"? Esta acción no se puede deshacer.`);
    if (!ok) return;
    setError(null);
    const { error: storageErr } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .remove([doc.storage_path]);
    if (storageErr) {
      setError(storageErr.message);
      return;
    }
    const { error: dbErr } = await supabase.from("documents").delete().eq("id", doc.id);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  }

  // ----- Renderers para cada modo -------------------------------------------

  // Modo demo (sin credenciales Supabase)
  if (!supabaseEnabled) {
    return (
      <section className="glass-panel rounded-3xl p-6 border border-surface-container">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-container/70 flex items-center justify-center shrink-0">
            <FolderClock className="w-6 h-6 text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-on-surface mb-1">Mis Documentos</h3>
            <p className="text-sm text-on-surface-variant mb-3">
              Esta sección permite subir tu CV, evidencias de retos y entregables. Está
              desactivada porque la app corre en{" "}
              <span className="font-bold text-on-surface">modo demo</span> (sin backend).
            </p>
            <p className="text-xs text-on-surface-variant">
              Para activarla, configura Supabase siguiendo{" "}
              <code className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface">
                supabase/README.md
              </code>{" "}
              y añade las variables{" "}
              <code className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              y{" "}
              <code className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              como GitHub secrets.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Supabase configurado pero sin sesión
  if (!authUser) {
    return (
      <section className="glass-panel rounded-3xl p-6 border border-surface-container">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-mbc-electric/10 border border-mbc-electric/30 flex items-center justify-center shrink-0">
            <LockKeyhole className="w-6 h-6 text-mbc-blue" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-on-surface mb-1">Mis Documentos</h3>
            <p className="text-sm text-on-surface-variant">
              Inicia sesión para subir y consultar tus documentos personales. Cada archivo
              queda guardado en tu espacio privado y nadie más puede verlo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Modo Supabase + sesión activa
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="text-mbc-blue w-5 h-5" />
          <h2 className="text-lg font-bold text-on-surface">Mis Documentos</h2>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
            Privado
          </span>
        </div>
        <span className="text-xs text-on-surface-variant">
          {docs.length} {docs.length === 1 ? "documento" : "documentos"}
        </span>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`glass-panel rounded-3xl p-8 border-2 border-dashed transition-colors cursor-pointer text-center ${
          dragActive
            ? "border-mbc-electric bg-mbc-electric/5"
            : "border-surface-container hover:border-mbc-electric/40"
        }`}
        role="button"
        aria-label="Subir archivo"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          multiple
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-mbc-blue">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-sm font-bold">Subiendo...</p>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-mbc-blue mx-auto mb-3" />
            <p className="text-sm font-bold text-on-surface mb-1">
              Arrastra archivos aquí o haz click para subir
            </p>
            <p className="text-xs text-on-surface-variant">
              Hasta 25 MB · PDF, Word, Excel, PowerPoint, imágenes
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-xs text-mbc-blue bg-mbc-electric/10 border border-mbc-electric/30 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* List */}
      <div className="mt-6">
        {loading && docs.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-on-surface-variant gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Cargando documentos...</span>
          </div>
        ) : docs.length === 0 ? (
          <p className="text-center py-12 text-sm text-on-surface-variant">
            Aún no has subido ningún documento.
          </p>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {docs.map((doc) => (
                <motion.li
                  key={doc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-surface-container hover:border-mbc-electric/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container/70 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-mbc-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{doc.title}</p>
                    <p className="text-xs text-on-surface-variant">
                      {formatSize(doc.size_bytes)} · {formatDate(doc.created_at)}
                      {doc.mime_type ? ` · ${doc.mime_type}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => download(doc)}
                    className="w-9 h-9 rounded-lg bg-surface-container/50 hover:bg-mbc-electric/10 text-on-surface-variant hover:text-mbc-blue transition-colors flex items-center justify-center"
                    aria-label="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(doc)}
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
      </div>
    </section>
  );
}
