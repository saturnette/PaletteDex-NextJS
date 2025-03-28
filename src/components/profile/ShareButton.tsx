"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { sendGTMEvent, sendGAEvent } from "@next/third-parties/google";


// ! testing sendGTMEvent and sendGAEvent

export const ShareButton = ({
  userId,
  userName,
}: {
  userId: string;
  userName?: string;
}) => {
  const handleCopyOrShare = () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`;
    const name = userName || "anonimo";

    // ! event for share button click
    sendGTMEvent({
      event: "share_button_click",
      event_category: "User Interaction",
      event_label: "Profile Share/Copy",
      value: 1,
      user_id: userId,
      user_name: name,
    });

    sendGAEvent("event", "share_button_click", {
      event_category: "User Interaction",
      event_label: "Profile Share/Copy",
      value: 1,
      user_id: userId,
      user_name: name,
    });

    if (navigator.share) {
      navigator
        .share({
          title: "Compartir perfil",
          text: "Mira este perfil",
          url: profileUrl,
        })
        .then(() => {

          // ! event for successful share

          sendGTMEvent({
            event: "share_success",
            event_category: "User Interaction",
            event_label: "Native Share",
            user_name: name,
          });

          sendGAEvent("event", "share_success", {
            event_category: "User Interaction",
            event_label: "Native Share",
            user_name: name,
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
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(profileUrl)
        .then(() => {

          // ! event for successful copy

          sendGTMEvent({
            event: "share_success",
            event_category: "User Interaction",
            event_label: "Clipboard Copy",
            user_name: name,
          });

          sendGAEvent("event", "share_success", {
            event_category: "User Interaction",
            event_label: "Clipboard Copy",
            user_name: name,
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
    } else {
      fallbackCopyTextToClipboard(profileUrl, name);
    }
  };

  const fallbackCopyTextToClipboard = (text: string, name: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");

      // ! event for successful copy
      sendGTMEvent({
        event: "share_success",
        event_category: "User Interaction",
        event_label: "Fallback Copy Method",
        user_name: name,
      });

      sendGAEvent("event", "share_success", {
        event_category: "User Interaction",
        event_label: "Fallback Copy Method",
        user_name: name,
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
