import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import Card from "./Card";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  cardData: any;
}

export default function DetailModal({ isOpen, onClose, title, children, cardData }: DetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)"
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "800px",
              backgroundColor: "#1a1a1a",
              border: "2px solid #444",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              fontFamily: "monospace"
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid #333",
              backgroundColor: "#111"
            }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#eee", fontWeight: "bold" }}>{title}</h2>
              <button 
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#888"}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              overflow: "auto",
              padding: "1.5rem",
              gap: "2rem"
            }}>
              <div style={{ flexShrink: 0, width: "300px", display: "flex", justifyContent: "center" }}>
                {cardData && (
                   <div style={{ pointerEvents: "auto", transform: "scale(0.9)", transformOrigin: "top center" }}>
                     <Card card={cardData} />
                   </div>
                )}
              </div>
              <div style={{ color: "#bbb", lineHeight: 1.6, fontSize: "0.95rem" }}>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
