# Hexadella Space - Interactive Landing Page

An experimental, highly interactive landing page built with React, Framer Motion, and Three.js. This project features a "juicy", game-like feel heavily inspired by the physics and aesthetics of *Balatro*.

## Features

*   **Framer Motion Physics:** Cards utilize spring-physics for natural drag-to-reorder, overshoot, and snap-back behaviors.
*   **3D Interactive Tilt:** Hovering over cards calculates mouse proximity to apply dynamic 3D rotation and perspective to the elements.
*   **Holographic Foil Shine:** Custom motion-value tracking generates a realistic, dynamic foil/shine overlay that sweeps across the cards as the cursor moves.
*   **Dynamic WebGL Background:** A `@react-three/fiber` canvas powers a cyclic, hypnotic shader background that smoothly transitions through psychedelic neon color palettes.
*   **CRT Overlay:** Global CSS/SVG-based CRT post-processing for an authentic retro monitor feel (scanlines, vignette, and slight flicker).

## Tech Stack

*   **Framework:** Vite + React (TypeScript)
*   **Animations:** Framer Motion
*   **3D & Shaders:** Three.js + React Three Fiber
*   **Icons:** Lucide React

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Build for production:
    ```bash
    npm run build
    ```

## Project Structure

*   `src/components/Card.tsx`: The core interactive card component handling 3D tilt, spring animations, and the foil shine effect.
*   `src/components/CardDeck.tsx`: Manages the deck layout and the `Reorder.Group` for drag-to-swap logic.
*   `src/components/BalatroBackground.tsx`: The Three.js canvas and custom shader.
*   `src/components/CrtOverlay.tsx`: The static visual CRT wrapper.
*   `src/components/DetailModal.tsx`: The expanded view when a card is clicked.
