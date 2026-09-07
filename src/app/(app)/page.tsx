"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * "/" ya no es una página de login: no hay credenciales que pedir (ver
 * GUEST_USER en userStorage.ts). Esta ruta solo existe para que abrir el
 * sitio entre directo al shell de la app (TopNav/Sidebar ya montados desde
 * el layout de (app)) y aterrice en My Journey, que es la primera vista.
 */
export default function AppHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/journey");
  }, [router]);

  return null;
}
