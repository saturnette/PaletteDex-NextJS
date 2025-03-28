"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const ShareButton = ({ userId }: { userId: string }) => {
  const handleCopyOrShare = () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`;

    // Evento de Google Analytics
    gtag('event', 'share_button_click', {
      'event_category': 'User Interaction',
      'event_label': 'Profile Share/Copy',
      'value': 1
    });

    if (navigator.share) {
      navigator
        .share({
          title: "Compartir perfil",
          text: "Mira este perfil",
          url: profileUrl,
        })
        .then(() => {
          // Evento adicional para compartir exitoso
          gtag('event', 'share_success', {
            'event_category': 'User Interaction',
            'event_label': 'Native Share',
          });

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
          // Evento adicional para copia exitosa
          gtag('event', 'share_success', {
            'event_category': 'User Interaction',
            'event_label': 'Clipboard Copy',
          });

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

      // Evento para método de copia alternativo
      gtag('event', 'share_success', {
        'event_category': 'User Interaction',
        'event_label': 'Fallback Copy Method',
      });

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
        className="cursor-pointer font-black text-base hover:bg-white hover:text-neutral-800 transition-colors duration-300 w-60"
      >
        <Share2 /> Copiar URL del perfil
      </Button>
    </div>
  );
};
