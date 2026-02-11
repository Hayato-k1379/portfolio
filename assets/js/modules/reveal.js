/**
 * Reveal Module
 * 共通フェードインアニメーション
 */

/**
 * @param {Object} options
 * @param {boolean} options.once - 1回だけ再生（default: true）
 * @param {number} options.staggerDelay - スタッガー遅延間隔（default: 0.12s）
 */
export function initReveal(options = {}) {
  const { once = true, staggerDelay = 0.12 } = options;

  // reduced motion チェック
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 共通リビール要素
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  // reduced motion の場合は即時表示
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // data-stagger属性を持つ親要素内の.reveal子要素にスタッガー遅延を設定
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((el, index) => {
      el.style.transitionDelay = `${index * staggerDelay}s`;
    });
  });

  // Intersection Observer コールバック
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        if (once) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        entry.target.classList.remove('is-visible');
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
