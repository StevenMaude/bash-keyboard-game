/**
 * utils.js — pure utility functions shared between game.js and tests.
 */

/**
 * Compute the Levenshtein edit distance between two strings.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Calculate a 0–1 progress value between the initial and target strings.
 * 0 = no progress (current === initial), 1 = done (current === target).
 *
 * @param {string} current
 * @param {string} target
 * @param {string} initial
 * @returns {number}
 */
export function calcProgress(current, target, initial) {
  if (current === target) return 1;
  const initialDist = levenshtein(initial, target);
  if (initialDist === 0) return 1;
  const currentDist = levenshtein(current, target);
  return Math.max(0, (initialDist - currentDist) / initialDist);
}

/**
 * Return a star rating (0–3) and label for a given keypress count vs. optimal.
 * @param {number} keypresses
 * @param {number} optimal
 * @returns {{ stars: number, label: string }}
 */
export function getRating(keypresses, optimal) {
  if (keypresses <= optimal)                    return { stars: 3, label: 'Perfect!'            };
  if (keypresses <= Math.ceil(optimal * 1.5))   return { stars: 2, label: 'Good'                };
  if (keypresses <= optimal * 2.5)              return { stars: 1, label: 'Keep practising'     };
  return                                               { stars: 0, label: 'Try the hint next time' };
}

/**
 * Render a star string from a count 0–3.
 * @param {number} count
 * @returns {string}
 */
export function renderStars(count) {
  return '★'.repeat(count) + '☆'.repeat(3 - count);
}
