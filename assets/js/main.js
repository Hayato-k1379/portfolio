/**
 * Haachan Studio '26 - Main JavaScript
 * ES6 Modules Entry Point
 */

import { initSmoothScroll } from './modules/smoothScroll.js';
import { initReveal } from './modules/reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initReveal();
});
