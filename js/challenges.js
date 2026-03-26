/**
 * challenges.js — a collection of bash editing challenges.
 *
 * Each challenge contains:
 *   id            — unique number
 *   title         — short name shown in the UI
 *   description   — one-sentence explanation
 *   initial       — the command the player starts with
 *   target        — the command the player must produce
 *   hint          — which shortcut(s) to use
 *   optimalKeys   — keystrokes needed with the optimal shortcut approach
 *   category      — shortcut family this challenge highlights
 */
export const CHALLENGES = [
  // ── Ctrl+K (kill to end) ─────────────────────────────────────────────────
  {
    id: 1,
    title: 'Kill the tail',
    description: 'Remove everything from --delete onwards.',
    initial: "find /var/log -name '*.log' -type f -mtime +30 -delete",
    target:  "find /var/log -name '*.log' -type f",
    hint: 'Navigate to just after "-type f" then press Ctrl+K to kill to end.',
    optimalKeys: 5,
    category: 'kill',
  },
  {
    id: 2,
    title: 'Drop the dry-run flag',
    description: 'Remove " --dry-run" at the end.',
    initial: 'rsync -avz --progress /src/ user@host:/dst/ --dry-run',
    target:  'rsync -avz --progress /src/ user@host:/dst/',
    hint: 'Ctrl+W twice removes the last two whitespace-delimited tokens.',
    optimalKeys: 2,
    category: 'kill',
  },

  // ── Ctrl+U (kill to start) ────────────────────────────────────────────────
  {
    id: 3,
    title: 'Strip the env prefix',
    description: 'Remove the environment-variable prefix before the command.',
    initial: 'PYTHONPATH=/opt/lib DEBUG=1 python3 -m pytest tests/',
    target:  'python3 -m pytest tests/',
    hint: 'Navigate to "python3" then press Ctrl+U to kill back to start.',
    optimalKeys: 4,
    category: 'kill',
  },
  {
    id: 4,
    title: 'Drop sudo',
    description: 'Remove "sudo " at the beginning of the command.',
    initial: 'sudo systemctl restart nginx',
    target:  'systemctl restart nginx',
    hint: 'Ctrl+A goes to start, then Ctrl+D×5 deletes "sudo " — or try Alt+D.',
    optimalKeys: 5,
    category: 'kill',
  },

  // ── Ctrl+W (kill word backward) ───────────────────────────────────────────
  {
    id: 5,
    title: 'Remove --force',
    description: 'Remove the dangerous --force flag from the git push.',
    initial: 'git push origin main --force',
    target:  'git push origin main',
    hint: 'Ctrl+W kills the word before the cursor — use it at end of line.',
    optimalKeys: 1,
    category: 'kill',
  },
  {
    id: 6,
    title: 'Wrong branch',
    description: 'Remove the last argument (wrong branch name).',
    initial: 'git checkout -b feature/login wrong-base',
    target:  'git checkout -b feature/login',
    hint: 'Ctrl+W once kills "wrong-base", then Ctrl+W again kills the space.',
    optimalKeys: 2,
    category: 'kill',
  },

  // ── Alt+D (kill word forward) ─────────────────────────────────────────────
  {
    id: 7,
    title: 'Delete a middle argument',
    description: 'Remove "ubuntu:latest" from the docker command.',
    initial: 'docker run -it --rm ubuntu:latest bash',
    target:  'docker run -it --rm bash',
    hint: 'Navigate before "ubuntu:latest" then Alt+D to kill the word forward.',
    optimalKeys: 5,
    category: 'kill',
  },
  {
    id: 8,
    title: 'Remove a repeated flag',
    description: 'Remove the repeated "-v" in the middle.',
    initial: 'tar -xzvvf archive.tar.gz -C /tmp',
    target:  'tar -xzvf archive.tar.gz -C /tmp',
    hint: 'Navigate to just before the extra "v", then Ctrl+D deletes it.',
    optimalKeys: 5,
    category: 'delete',
  },

  // ── Ctrl+Y (yank) ─────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Move the output file',
    description: 'Move "output.log" from the middle to the end.',
    initial: 'tee output.log | grep ERROR | sort',
    target:  'tee | grep ERROR | sort output.log',
    hint: 'Ctrl+W to kill "output.log", navigate to end, then Ctrl+Y to yank.',
    optimalKeys: 6,
    category: 'yank',
  },

  // ── Ctrl+T (transpose) ────────────────────────────────────────────────────
  {
    id: 10,
    title: 'Transposed letters',
    description: "Fix the typo 'sattus' → 'status'.",
    initial: 'git sattus',
    target:  'git status',
    hint: 'Position cursor after the transposed pair and press Ctrl+T.',
    optimalKeys: 4,
    category: 'transpose',
  },
  {
    id: 11,
    title: 'Swapped characters',
    description: "Fix 'mkdri' → 'mkdir'.",
    initial: 'mkdri -p /opt/app/logs',
    target:  'mkdir -p /opt/app/logs',
    hint: 'Ctrl+T swaps the character before the cursor with the one at it.',
    optimalKeys: 3,
    category: 'transpose',
  },

  // ── Alt+F / Alt+B (word navigation) ──────────────────────────────────────
  {
    id: 12,
    title: 'Add a flag in the middle',
    description: "Add '-a' to make 'ls -l' into 'ls -la'.",
    initial: 'ls -l /home/user/documents',
    target:  'ls -la /home/user/documents',
    hint: 'Ctrl+A then Alt+F×2 gets you right after "-l" to insert "a".',
    optimalKeys: 4,
    category: 'navigation',
  },
  {
    id: 13,
    title: 'Upgrade the image tag',
    description: "Change 'ubuntu:20.04' to 'ubuntu:22.04'.",
    initial: 'docker pull ubuntu:20.04',
    target:  'docker pull ubuntu:22.04',
    hint: 'Alt+B once goes back to "20", then delete and retype.',
    optimalKeys: 5,
    category: 'navigation',
  },
  {
    id: 14,
    title: 'Fix the port',
    description: "Change port 8080 to 9090 in the ssh tunnel.",
    initial: 'ssh -L 8080:localhost:8080 user@192.168.1.10',
    target:  'ssh -L 9090:localhost:9090 user@192.168.1.10',
    hint: 'Alt+B navigates to each number; replace digits.',
    optimalKeys: 10,
    category: 'navigation',
  },

  // ── Ctrl+A / Ctrl+E (line navigation) ────────────────────────────────────
  {
    id: 15,
    title: 'Add sudo at the front',
    description: "Prepend 'sudo ' to the apt command.",
    initial: 'apt install -y build-essential',
    target:  'sudo apt install -y build-essential',
    hint: 'Ctrl+A jumps to start; type "sudo " then done.',
    optimalKeys: 6,
    category: 'navigation',
  },
  {
    id: 16,
    title: 'Append a redirect',
    description: "Add ' > output.txt' at the end.",
    initial: 'grep -rn TODO /home/user/projects',
    target:  'grep -rn TODO /home/user/projects > output.txt',
    hint: 'Ctrl+E jumps to end; type the redirect.',
    optimalKeys: 13,
    category: 'navigation',
  },

  // ── editing in the middle ─────────────────────────────────────────────────
  {
    id: 17,
    title: 'Fix the command name',
    description: "Fix typo 'grpe' → 'grep'.",
    initial: "grpe -r 'function main' /src",
    target:  "grep -r 'function main' /src",
    hint: 'Ctrl+A, then Ctrl+D×2 and retype "ep".',
    optimalKeys: 6,
    category: 'delete',
  },
  {
    id: 18,
    title: 'Fix the filename extension',
    description: "Change 'config.yml' to 'config.yaml'.",
    initial: 'ansible-playbook -i hosts config.yml --check',
    target:  'ansible-playbook -i hosts config.yaml --check',
    hint: 'Alt+B navigates back to the file; move to the extension and edit.',
    optimalKeys: 6,
    category: 'editing',
  },
  {
    id: 19,
    title: "Correct the Python version",
    description: "Change 'python2' to 'python3'.",
    initial: 'python2 manage.py runserver 0.0.0.0:8000',
    target:  'python3 manage.py runserver 0.0.0.0:8000',
    hint: 'Ctrl+A, Alt+F to skip to end of "python2", Backspace, type "3".',
    optimalKeys: 4,
    category: 'editing',
  },
  {
    id: 20,
    title: 'Bump the npm script',
    description: "Change 'buidl' to 'build'.",
    initial: 'npm run buidl --prefix packages/frontend',
    target:  'npm run build --prefix packages/frontend',
    hint: 'Navigate to the typo; Ctrl+T may fix the transposed letters.',
    optimalKeys: 4,
    category: 'editing',
  },
  {
    id: 21,
    title: 'Switch git remote',
    description: "Change 'upstream' to 'origin' in the push command.",
    initial: 'git push upstream feature/dark-mode',
    target:  'git push origin feature/dark-mode',
    hint: 'Alt+B×2 to navigate; Ctrl+W to kill "upstream"; type "origin".',
    optimalKeys: 9,
    category: 'kill',
  },
  {
    id: 22,
    title: 'Replace the AWS profile',
    description: "Change 'staging' to 'production' in the AWS profile.",
    initial: 'aws --profile staging s3 ls s3://my-company-data',
    target:  'aws --profile production s3 ls s3://my-company-data',
    hint: 'Alt+B navigates to "staging"; Ctrl+W kills it; type "production".',
    optimalKeys: 12,
    category: 'navigation',
  },
  {
    id: 23,
    title: 'Extend the find depth',
    description: "Change '-maxdepth 2' to '-maxdepth 4'.",
    initial: 'find /etc -maxdepth 2 -name "*.conf" -type f',
    target:  'find /etc -maxdepth 4 -name "*.conf" -type f',
    hint: 'Navigate to "2"; Backspace; type "4".',
    optimalKeys: 5,
    category: 'editing',
  },
  {
    id: 24,
    title: 'Remove the temp directory flag',
    description: "Remove ' -C /tmp' at the end of the tar command.",
    initial: 'tar -xzvf release.tar.gz -C /tmp',
    target:  'tar -xzvf release.tar.gz',
    hint: 'Ctrl+W three times removes "-C", "/tmp", and the trailing space.',
    optimalKeys: 3,
    category: 'kill',
  },
  {
    id: 25,
    title: 'Quieter curl',
    description: "Add the -s (silent) flag to curl.",
    initial: 'curl -o report.html https://example.com/report',
    target:  'curl -so report.html https://example.com/report',
    hint: 'Ctrl+A, Alt+F, Ctrl+F×2 puts you after "-"; type "s".',
    optimalKeys: 5,
    category: 'navigation',
  },
  {
    id: 26,
    title: 'Change the user',
    description: "Replace 'alice' with 'bob' in the scp path.",
    initial: 'scp -r alice@server:/home/alice/data /local/backup',
    target:  'scp -r bob@server:/home/bob/data /local/backup',
    hint: 'Alt+F/B to navigate to each occurrence of "alice", Ctrl+W and retype.',
    optimalKeys: 14,
    category: 'navigation',
  },
  {
    id: 27,
    title: 'Add verbose output',
    description: "Add '-v' flag after 'make'.",
    initial: 'make install PREFIX=/usr/local',
    target:  'make -v install PREFIX=/usr/local',
    hint: 'Ctrl+A, Alt+F, type " -v" to insert the flag.',
    optimalKeys: 5,
    category: 'navigation',
  },
  {
    id: 28,
    title: 'Remove pipe to less',
    description: "Remove '| less' from the end of the command.",
    initial: 'journalctl -u nginx --since today | less',
    target:  'journalctl -u nginx --since today',
    hint: 'Ctrl+W×2 removes "less" and "|" together.',
    optimalKeys: 2,
    category: 'kill',
  },
];

/**
 * Return `count` challenges drawn randomly (without replacement) from CHALLENGES.
 *
 * @param {number} count
 * @param {function} [rng] Optional random function () => [0,1). Defaults to Math.random.
 * @returns {Array}
 */
export function selectChallenges(count, rng = Math.random) {
  const shuffled = [...CHALLENGES].sort(() => rng() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
