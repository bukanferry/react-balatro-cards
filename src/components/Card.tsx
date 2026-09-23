import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useState, useRef } from "react";

interface CardProps {
  card: {
    id: string;
    title: string;
    shortDesc: string;
    tag: string;
    imageUrl: string;
  };
  onClick?: () => void;
  isDragging?: boolean;
}

export default function Card({ card, onClick, isDragging = false }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const shineX = useTransform(mouseX, [-0.5, 0.5], [-100, 100]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], [-100, 100]);
  
  const shineGradient = useMotionTemplate`radial-gradient(
    circle at calc(50% + ${shineX}%) calc(50% + ${shineY}%), 
    rgba(255,255,255,0.4) 0%, 
    rgba(255,255,255,0.0) 60%
  )`;

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDragging) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ position: "relative", perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isDragging && setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -15 }}
        whileTap={{ cursor: onClick ? "grabbing" : "default", scale: 0.95 }}
        style={{
          width: "240px",
          height: "360px",
          borderRadius: "12px",
          cursor: onClick ? "pointer" : "default",
          background: "#222",
          border: "2px solid #555",
          backgroundImage: `url(${card.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "16px",
          position: "relative",
          overflow: "hidden",
          rotateX: isHovered && !isDragging ? rotateX : 0,
          rotateY: isHovered && !isDragging ? rotateY : 0,
          zIndex: isHovered ? 20 : 1,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: shineGradient,
            opacity: isHovered && !isDragging ? 1 : 0,
            pointerEvents: "none",
            mixBlendMode: "overlay",
            transition: "opacity 0.2s"
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ 
          opacity: isHovered && !isDragging ? 1 : 0, 
          y: isHovered && !isDragging ? 20 : -10,
          scale: isHovered && !isDragging ? 1 : 0.9
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          position: "absolute",
          bottom: "-140px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#333",
          width: "220px",
          padding: "12px",
          borderRadius: "12px",
          pointerEvents: "none",
          border: "2px solid #aaa",
          boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <div style={{
          color: "white",
          fontFamily: "monospace",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "2px 2px 0px rgba(0,0,0,0.5)"
        }}>
          {card.title}
        </div>

        <div style={{
          background: "white",
          color: "#ff0055",
          padding: "6px 12px",
          borderRadius: "20px",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "14px",
          width: "100%",
          textAlign: "center",
          boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.1)"
        }}>
          {card.shortDesc}
        </div>

        <div style={{
          background: "#0088ff",
          color: "white",
          padding: "6px 16px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.2)"
        }}>
          {card.tag}
        </div>
      </motion.div>
    </div>
  );
}
