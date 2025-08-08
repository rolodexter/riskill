/**
 * TransitionEffects.ts
 * 
 * GSAP-powered transition and animation utilities for the Riskill UI
 * These effects create cinematic, fluid transitions between UI states and scenes
 */

import { gsap } from 'gsap';

/**
 * Creates a reveal timeline animation for dashboard components
 * @param targets Element or elements to animate
 * @param stagger Stagger time between elements if multiple targets
 * @returns GSAP timeline that can be played, reversed, or controlled
 */
export const createRevealTimeline = (
  targets: string | object | Element | Element[], 
  stagger = 0.1
): gsap.core.Timeline => {
  const tl = gsap.timeline({ paused: true });
  
  tl.from(targets, {
    duration: 0.8,
    y: 20,
    opacity: 0,
    scale: 0.96,
    ease: "power3.out",
    stagger: stagger,
    clearProps: "all"
  });
  
  return tl;
};

/**
 * Creates a focus timeline that highlights a component while dimming others
 * @param targetElement Element to focus on
 * @param otherElements Elements to dim
 * @returns GSAP timeline that can be played, reversed, or controlled
 */
export const createFocusTimeline = (
  targetElement: string | Element,
  otherElements: string | Element | Element[]
): gsap.core.Timeline => {
  const tl = gsap.timeline({ paused: true });
  
  // Highlight target
  tl.to(targetElement, {
    duration: 0.5,
    scale: 1.03,
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(80, 160, 255, 0.6)",
    ease: "power2.out"
  }, 0);
  
  // Dim other elements
  tl.to(otherElements, {
    duration: 0.5,
    opacity: 0.3,
    scale: 0.98,
    filter: "blur(2px)",
    ease: "power2.out"
  }, 0);
  
  return tl;
};

/**
 * Creates a scene transition timeline for moving between major UI scenes
 * @param currentScene Current scene element to transition out
 * @param nextScene Next scene element to transition in
 * @param container Parent container for both scenes
 * @returns GSAP timeline that can be played
 */
export const createSceneTransition = (
  currentScene: Element | string,
  nextScene: Element | string,
  container: Element | string
): gsap.core.Timeline => {
  const tl = gsap.timeline();
  
  // Add an overlay to the container for a cinematic transition effect
  const overlay = document.createElement('div');
  overlay.className = 'scene-transition-overlay';
  Object.assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 100,
    pointerEvents: 'none',
  });
  
  const containerEl = typeof container === 'string' 
    ? document.querySelector(container) 
    : container;
    
  if (containerEl) {
    containerEl.appendChild(overlay);
  }
  
  // Fade out current scene
  tl.to(currentScene, {
    duration: 0.5,
    opacity: 0,
    y: -20,
    ease: "power2.inOut"
  }, 0);
  
  // Fade in overlay
  tl.to(overlay, {
    duration: 0.4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    ease: "power2.inOut"
  }, 0.2);
  
  // Prepare next scene
  tl.set(nextScene, {
    opacity: 0,
    y: 30,
  }, 0.5);
  
  // Fade out overlay
  tl.to(overlay, {
    duration: 0.4,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    ease: "power2.inOut",
    onComplete: () => {
      if (containerEl && containerEl.contains(overlay)) {
        containerEl.removeChild(overlay);
      }
    }
  }, 0.7);
  
  // Fade in next scene
  tl.to(nextScene, {
    duration: 0.6,
    opacity: 1,
    y: 0,
    ease: "power3.out"
  }, 0.6);
  
  return tl;
};

/**
 * Creates a parallax effect timeline for multiple layers
 * @param layers Array of elements to parallax with different intensities
 * @param intensities Array of parallax intensities (higher = more movement)
 * @returns GSAP timeline that reacts to mouse movement
 */
export const createParallaxEffect = (
  layers: (string | Element)[],
  intensities: number[]
): () => void => {
  // Handle mouse movement with parallax effect
  const handleMouseMove = (e: MouseEvent): void => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    layers.forEach((layer, index) => {
      const intensity = intensities[index] || 1;
      
      gsap.to(layer, {
        duration: 1,
        x: mouseX * 10 * intensity,
        y: mouseY * 10 * intensity,
        rotationY: mouseX * 2 * intensity,
        rotationX: -mouseY * 2 * intensity,
        ease: "power1.out"
      });
    });
  };
  
  // Add event listener
  window.addEventListener('mousemove', handleMouseMove);
  
  // Return function to remove event listener when needed
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};
