import { useState, useRef } from "react";
import { Reorder } from "framer-motion";
import Card from "./Card";
import DetailModal from "./DetailModal";

import aboutImg from "../assets/about-page.png";
import hexadellaImg from "../assets/hexadella-space.png";
import mainframeImg from "../assets/pretentious-mainframe.png";

const INITIAL_CARDS_DATA = [
  {
    id: "about",
    title: "About Me",
    shortDesc: "Who am I?",
    tag: "Profile",
    imageUrl: aboutImg,
    fullDesc: (
      <div>
        <p>Hello! This is a placeholder for the about page content.</p>
        <p>Imagine a fascinating biography here.</p>
      </div>
    )
  },
  {
    id: "hexadella",
    title: "Hexadella Space",
    shortDesc: "Zero-logs ecosystem",
    tag: "Project",
    imageUrl: hexadellaImg,
    fullDesc: (
      <div>
        <h3 style={{ marginTop: 0 }}>An ephemeral, zero-logs, in-memory anonymous ecosystem.</h3>
        <p>Hexadella Space is an experimental web platform designed with operational security (OpSec) and privacy as its core principles. Built on a modern Laravel stack utilizing real-time WebSockets, Hexadella serves as a stateless environment where conversations and interactions exist momentarily before vanishing.</p>
        
        <h4>Architecture & Security</h4>
        <ul style={{ paddingLeft: "20px" }}>
          <li><strong>Zero-Logs Policy:</strong> The system actively purges data. Sensitive communications are strictly prevented from being written to disk or persisted in long-term storage.</li>
          <li><strong>In-Memory WebSockets:</strong> Powered by Laravel Reverb, the real-time communication system operates entirely in memory, broadcasting encrypted payloads instantaneously without database persistence.</li>
          <li><strong>Infrastructure:</strong> Designed to be deployed behind Cloudflare Proxy (Strict SSL mode) and an Nginx reverse proxy, effectively shielding the origin server from IP tracking and direct DDoS attacks.</li>
        </ul>
      </div>
    )
  },
  {
    id: "mainframe",
    title: "Pretentious Mainframe",
    shortDesc: "Monument to digital vanity",
    tag: "Project",
    imageUrl: mainframeImg,
    fullDesc: (
      <div>
        <h3 style={{ marginTop: 0 }}>Because the internet didn't have enough useless monuments to digital vanity.</h3>
        <p>Welcome to the underlying architecture of absolutely nothing important. This repository contains the source code for a highly sophisticated, completely unnecessary simulation of a retro-terminal mainframe.</p>
        <p>It was built under the delusion that tracking CPU cycles and playing digital Russian Roulette makes a website "profound."</p>
        
        <h4>Core Modules</h4>
        <ul style={{ paddingLeft: "20px" }}>
          <li><strong>The Monitor:</strong> A dashboard that tracks server vitals in real-time. It exists primarily to make the server feel important.</li>
          <li><strong>The Terminal:</strong> A purely cosmetic, client-side shell environment. It logs your fake keystrokes and warns you about "unauthorized access."</li>
          <li><strong>The Gamble:</strong> A digital Russian Roulette. Six chambers. One fatal exception. You pull the trigger, and if you die, you get a retro Blue Screen of Death.</li>
        </ul>
      </div>
    )
  }
];

export default function CardDeck() {
  const [cards, setCards] = useState(INITIAL_CARDS_DATA);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const activeCardData = cards.find((c) => c.id === selectedCard);

  return (
    <>
      <div style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        pointerEvents: "none"
      }}>
        
        <Reorder.Group 
          axis="x" 
          values={cards} 
          onReorder={setCards} 
          style={{ 
            display: "flex", 
            gap: "3rem", 
            pointerEvents: "auto", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            listStyle: "none",
            padding: 0,
            margin: 0
          }}
        >
          {cards.map((card) => {
            return (
              <DraggableCardWrapper 
                key={card.id} 
                card={card} 
                onClick={() => setSelectedCard(card.id)} 
              />
            );
          })}
        </Reorder.Group>
      </div>

      <DetailModal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        title={activeCardData?.title || ""}
        cardData={activeCardData || null}
      >
        {activeCardData?.fullDesc}
      </DetailModal>
    </>
  );
}

function DraggableCardWrapper({ card, onClick }: { card: any, onClick: () => void }) {
  const isDragging = useRef(false);

  return (
    <Reorder.Item 
      value={card}
      drag // Override strict axis dragging to allow free 2D drag
      dragElastic={0.5}
      style={{ position: "relative", perspective: 1200, listStyle: "none" }}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDragging.current = false;
        }, 100);
      }}
    >
      <Card 
        card={card} 
        onClick={() => {
          if (!isDragging.current) {
            onClick();
          }
        }} 
        isDragging={isDragging.current}
      />
    </Reorder.Item>
  );
}
