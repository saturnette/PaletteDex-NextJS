"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const ShareButton = ({ userId }: { userId: string }) => {
  const handleCopyOrShare = () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Compartir perfil",
          text: "Mira este perfil",
          url: profileUrl,
        })
        .then(() => {
          toast.success("¡Perfil compartido!", {
            description: "El enlace se compartió correctamente.",
          });
        })
        .catch(() => {
          toast.error("Error al compartir", {
            description: "No se pudo compartir el enlace.",
          });
        });
    }
    else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(profileUrl)
        .then(() => {
          toast.success("¡URL copiada!", {
            description: "El enlace del perfil se copió al portapapeles.",
          });
        })
        .catch(() => {
          toast.error("Error al copiar", {
            description: "No se pudo copiar el enlace al portapapeles.",
          });
        });
    }
    else {
      fallbackCopyTextToClipboard(profileUrl);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      toast.success("¡URL copiada!", {
        description: "El enlace del perfil se copió al portapapeles.",
      });
    } catch {
      toast.error("Error al copiar", {
        description: "No se pudo copiar el enlace al portapapeles.",
      });
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex justify-center">
    <Button
      onClick={handleCopyOrShare}
      className="cursor-pointer font-black text-base hover:bg-white hover:text-neutral-800 transition-colors duration-300"
    >
      <Share2 /> Copiar URL del perfil
    </Button>
    </div>
  );
};