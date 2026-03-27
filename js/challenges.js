/**
 * challenges.js — bash editing challenges organised into a structured learning track.
 *
 * Each challenge:
 *   id           — unique number
 *   collectionId — which collection this belongs to
 *   title        — short name shown in the UI
 *   description  — one-sentence explanation
 *   initial      — the command the player starts with
 *   target       — the command the player must produce
 *   hint         — which shortcut(s) to use
 *   optimalKeys  — keystrokes needed with the optimal shortcut approach
 *   category     — shortcut family (same as collectionId for consistency)
 *
 * ⚠️  Browser notes:
 *   Ctrl+W closes the browser tab and CANNOT be intercepted — challenges use
 *   Alt+Backspace instead (identical readline behaviour).
 *   Ctrl+T may open a new tab; challenges note this where relevant.
 */

// ── Collection 1: Line Navigation ─────────────────────────────────────────────
const lineNavChallenges = [
  {
    id: 15,
    collectionId: 'line-nav',
    title: 'Add sudo at the front',
    description: "Prepend 'sudo ' to the apt command.",
    initial: 'apt install -y build-essential',
    target:  'sudo apt install -y build-essential',
    hint: 'Ctrl+A jumps to start of line; type "sudo " (6 chars).',
    optimalKeys: 6,
    category: 'line-nav',
  },
  {
    id: 16,
    collectionId: 'line-nav',
    title: 'Append a redirect',
    description: "Add ' > output.txt' at the end.",
    initial: 'grep -rn TODO /home/user/projects',
    target:  'grep -rn TODO /home/user/projects > output.txt',
    hint: 'Ctrl+E jumps to end of line; type " > output.txt".',
    optimalKeys: 13,
    category: 'line-nav',
  },
  {
    id: 27,
    collectionId: 'line-nav',
    title: 'Add verbose output',
    description: "Add '-v' flag right after 'make'.",
    initial: 'make install PREFIX=/usr/local',
    target:  'make -v install PREFIX=/usr/local',
    hint: 'Ctrl+A then Alt+F moves past "make"; type " -v" to insert the flag.',
    optimalKeys: 5,
    category: 'line-nav',
  },
  {
    id: 101,
    collectionId: 'line-nav',
    title: 'Add nohup',
    description: "Prepend 'nohup ' so the process survives logout.",
    initial: 'python3 -m http.server 8080 &',
    target:  'nohup python3 -m http.server 8080 &',
    hint: 'Ctrl+A to jump to start, then type "nohup " (6 chars).',
    optimalKeys: 7,
    category: 'line-nav',
  },
  {
    id: 102,
    collectionId: 'line-nav',
    title: 'Capture stderr',
    description: "Add ' 2>&1' at the end to redirect stderr to stdout.",
    initial: 'make build',
    target:  'make build 2>&1',
    hint: 'Ctrl+E jumps to end of line; type " 2>&1".',
    optimalKeys: 6,
    category: 'line-nav',
  },
];

// ── Collection 2: Word Navigation ─────────────────────────────────────────────
const wordNavChallenges = [
  {
    id: 12,
    collectionId: 'word-nav',
    title: 'Add a flag in the middle',
    description: "Add '-a' to make 'ls -l' into 'ls -la'.",
    initial: 'ls -l /home/user/documents',
    target:  'ls -la /home/user/documents',
    hint: 'Ctrl+A then Alt+F×2 puts the cursor right after "-l"; type "a".',
    optimalKeys: 4,
    category: 'word-nav',
  },
  {
    id: 13,
    collectionId: 'word-nav',
    title: 'Upgrade the image tag',
    description: "Change 'ubuntu:20.04' to 'ubuntu:22.04'.",
    initial: 'docker pull ubuntu:20.04',
    target:  'docker pull ubuntu:22.04',
    hint: 'Alt+B jumps back one word at a time; land on "20", delete and retype.',
    optimalKeys: 5,
    category: 'word-nav',
  },
  {
    id: 18,
    collectionId: 'word-nav',
    title: 'Fix the filename extension',
    description: "Change 'config.yml' to 'config.yaml'.",
    initial: 'ansible-playbook -i hosts config.yml --check',
    target:  'ansible-playbook -i hosts config.yaml --check',
    hint: 'Alt+B×2 from end navigates back to the extension; insert "a" before "--check".',
    optimalKeys: 5,
    category: 'word-nav',
  },
  {
    id: 19,
    collectionId: 'word-nav',
    title: 'Correct the Python version',
    description: "Change 'python2' to 'python3'.",
    initial: 'python2 manage.py runserver 0.0.0.0:8000',
    target:  'python3 manage.py runserver 0.0.0.0:8000',
    hint: 'Ctrl+A, Alt+F jumps to end of "python2"; Backspace, type "3".',
    optimalKeys: 4,
    category: 'word-nav',
  },
  {
    id: 103,
    collectionId: 'word-nav',
    title: 'Change the environment',
    description: "Change 'staging' to 'production' in the namespace flag.",
    initial: 'helm upgrade --namespace staging my-app ./chart',
    target:  'helm upgrade --namespace production my-app ./chart',
    hint: 'Alt+B×3 from end (or Ctrl+A + Alt+F×3) lands on "staging"; Backspace×7, type "production".',
    optimalKeys: 14,
    category: 'word-nav',
  },
];

// ── Collection 3: Character Navigation ────────────────────────────────────────
const charNavChallenges = [
  {
    id: 25,
    collectionId: 'char-nav',
    title: 'Quieter curl',
    description: "Add the -s (silent) flag to curl.",
    initial: 'curl -o report.html https://example.com/report',
    target:  'curl -so report.html https://example.com/report',
    hint: 'Ctrl+A, Alt+F, Ctrl+F×2 puts cursor right after "-"; type "s".',
    optimalKeys: 5,
    category: 'char-nav',
  },
  {
    id: 104,
    collectionId: 'char-nav',
    title: 'Switch compression',
    description: "Change the 'z' (gzip) flag to 'j' (bzip2) in the tar command.",
    initial: 'tar -xzvf archive.tar.gz',
    target:  'tar -xjvf archive.tar.gz',
    hint: 'Ctrl+A, then Ctrl+F×5 lands on "z"; Ctrl+D deletes it, type "j".',
    optimalKeys: 7,
    category: 'char-nav',
  },
  {
    id: 105,
    collectionId: 'char-nav',
    title: 'Fix an off-by-one uid',
    description: "Change uid 1001 to 1000 in the useradd command.",
    initial: 'useradd -u 1001 -g 1000 appuser',
    target:  'useradd -u 1000 -g 1000 appuser',
    hint: 'Alt+B×2 from end navigates to "1001"; move to the last digit; Backspace + type "0".',
    optimalKeys: 5,
    category: 'char-nav',
  },
  {
    id: 106,
    collectionId: 'char-nav',
    title: 'Toggle the flag letter',
    description: "Change '-n' to '-m' in the head command.",
    initial: 'head -n 20 /var/log/syslog',
    target:  'head -m 20 /var/log/syslog',
    hint: 'Ctrl+A + Ctrl+F×6 puts cursor on "n"; Ctrl+D, then type "m".',
    optimalKeys: 8,
    category: 'char-nav',
  },
];

// ── Collection 4: Character Deletion ──────────────────────────────────────────
const charDelChallenges = [
  {
    id: 8,
    collectionId: 'char-del',
    title: 'Remove a repeated flag',
    description: 'Remove the extra "v" flag in the tar command.',
    initial: 'tar -xzvvf archive.tar.gz -C /tmp',
    target:  'tar -xzvf archive.tar.gz -C /tmp',
    hint: 'Navigate just before the extra "v"; Ctrl+D deletes the character at the cursor.',
    optimalKeys: 5,
    category: 'char-del',
  },
  {
    id: 17,
    collectionId: 'char-del',
    title: 'Fix the command name',
    description: "Fix typo 'grpe' → 'grep'.",
    initial: "grpe -r 'function main' /src",
    target:  "grep -r 'function main' /src",
    hint: 'Ctrl+A, Ctrl+F×2 to land between "gr" and "pe"; Ctrl+D×2 + type "ep".',
    optimalKeys: 6,
    category: 'char-del',
  },
  {
    id: 23,
    collectionId: 'char-del',
    title: 'Extend the find depth',
    description: "Change '-maxdepth 2' to '-maxdepth 4'.",
    initial: 'find /etc -maxdepth 2 -name "*.conf" -type f',
    target:  'find /etc -maxdepth 4 -name "*.conf" -type f',
    hint: 'Alt+B×3 from end puts cursor after "2"; Backspace, type "4".',
    optimalKeys: 5,
    category: 'char-del',
  },
  {
    id: 107,
    collectionId: 'char-del',
    title: 'Remove duplicate slash',
    description: "Fix the double slash '//etc' in the path.",
    initial: 'cat //etc/hosts',
    target:  'cat /etc/hosts',
    hint: 'Ctrl+A, Ctrl+F×5 puts cursor on the second "/"; Ctrl+D removes it.',
    optimalKeys: 6,
    category: 'char-del',
  },
];

// ── Collection 5: Kill to End ──────────────────────────────────────────────────
const killEndChallenges = [
  {
    id: 1,
    collectionId: 'kill-end',
    title: 'Kill the tail',
    description: 'Remove everything from --delete onwards.',
    initial: "find /var/log -name '*.log' -type f -mtime +30 -delete",
    target:  "find /var/log -name '*.log' -type f",
    hint: 'Navigate just after "-type f" then Ctrl+K kills everything to the end.',
    optimalKeys: 5,
    category: 'kill-end',
  },
  {
    id: 108,
    collectionId: 'kill-end',
    title: 'Strip the pipeline',
    description: "Remove '| grep error | wc -l' from the end.",
    initial: 'journalctl -u nginx -f | grep error | wc -l',
    target:  'journalctl -u nginx -f',
    hint: 'Navigate to just before "| grep"; Ctrl+K kills to end.',
    optimalKeys: 4,
    category: 'kill-end',
  },
  {
    id: 109,
    collectionId: 'kill-end',
    title: 'Remove trailing options',
    description: "Remove '--no-pager --output=short-precise' from the end.",
    initial: 'systemctl status nginx --no-pager --output=short-precise',
    target:  'systemctl status nginx',
    hint: 'Navigate to just after "nginx "; Ctrl+K kills everything to end.',
    optimalKeys: 4,
    category: 'kill-end',
  },
  {
    id: 110,
    collectionId: 'kill-end',
    title: 'Drop the debug suffix',
    description: "Remove '--log-level=debug --verbose' from the end.",
    initial: 'helm install my-app ./chart --log-level=debug --verbose',
    target:  'helm install my-app ./chart',
    hint: 'Alt+B×2 or navigate to just before "--log-level"; Ctrl+K kills to end.',
    optimalKeys: 4,
    category: 'kill-end',
  },
];

// ── Collection 6: Kill to Start ────────────────────────────────────────────────
const killStartChallenges = [
  {
    id: 3,
    collectionId: 'kill-start',
    title: 'Strip the env prefix',
    description: 'Remove the environment-variable prefix before the command.',
    initial: 'PYTHONPATH=/opt/lib DEBUG=1 python3 -m pytest tests/',
    target:  'python3 -m pytest tests/',
    hint: 'Navigate to just before "python3" then Ctrl+U kills back to start.',
    optimalKeys: 4,
    category: 'kill-start',
  },
  {
    id: 4,
    collectionId: 'kill-start',
    title: 'Drop sudo',
    description: 'Remove "sudo " from the beginning of the command.',
    initial: 'sudo systemctl restart nginx',
    target:  'systemctl restart nginx',
    hint: 'Alt+F jumps past "sudo"; Ctrl+U kills everything before the cursor.',
    optimalKeys: 3,
    category: 'kill-start',
  },
  {
    id: 111,
    collectionId: 'kill-start',
    title: 'Remove the env vars',
    description: "Remove 'NODE_ENV=production PORT=3000 ' from the start.",
    initial: 'NODE_ENV=production PORT=3000 node dist/server.js',
    target:  'node dist/server.js',
    hint: 'Alt+F×2 jumps past both env vars; Ctrl+U kills them.',
    optimalKeys: 4,
    category: 'kill-start',
  },
  {
    id: 112,
    collectionId: 'kill-start',
    title: 'Drop the path prefix',
    description: "Remove '/usr/local/bin/' from in front of the command.",
    initial: '/usr/local/bin/python3 -m venv .venv',
    target:  'python3 -m venv .venv',
    hint: 'Alt+F jumps past the path token; Ctrl+U kills it.',
    optimalKeys: 3,
    category: 'kill-start',
  },
];

// ── Collection 7: Kill Word Backward ──────────────────────────────────────────
// ⚠️  Ctrl+W closes the browser tab. Alt+Backspace is used instead —
//     it is the identical readline binding (Meta+Backspace).
const killWordBackChallenges = [
  {
    id: 5,
    collectionId: 'kill-word-back',
    title: 'Remove --force',
    description: 'Remove the dangerous --force flag from the git push.',
    initial: 'git push origin main --force',
    target:  'git push origin main',
    hint: 'Alt+Backspace at end of line kills "--force" in one stroke. (Ctrl+W does the same in a real terminal, but closes browser tabs.)',
    optimalKeys: 1,
    category: 'kill-word-back',
  },
  {
    id: 6,
    collectionId: 'kill-word-back',
    title: 'Wrong branch',
    description: 'Remove the last argument (wrong branch name).',
    initial: 'git checkout -b feature/login wrong-base',
    target:  'git checkout -b feature/login',
    hint: 'Alt+Backspace×2: first kills "wrong-base", second kills the preceding space.',
    optimalKeys: 2,
    category: 'kill-word-back',
  },
  {
    id: 24,
    collectionId: 'kill-word-back',
    title: 'Remove the temp directory flag',
    description: "Remove ' -C /tmp' at the end of the tar command.",
    initial: 'tar -xzvf release.tar.gz -C /tmp',
    target:  'tar -xzvf release.tar.gz',
    hint: 'Alt+Backspace×3 removes "/tmp", "-C", and the trailing space.',
    optimalKeys: 3,
    category: 'kill-word-back',
  },
  {
    id: 28,
    collectionId: 'kill-word-back',
    title: 'Remove pipe to less',
    description: "Remove '| less' from the end of the command.",
    initial: 'journalctl -u nginx --since today | less',
    target:  'journalctl -u nginx --since today',
    hint: 'Alt+Backspace×2 removes "less" and then "|" together.',
    optimalKeys: 2,
    category: 'kill-word-back',
  },
  {
    id: 2,
    collectionId: 'kill-word-back',
    title: 'Drop the dry-run flag',
    description: 'Remove " --dry-run" at the end.',
    initial: 'rsync -avz --progress /src/ user@host:/dst/ --dry-run',
    target:  'rsync -avz --progress /src/ user@host:/dst/',
    hint: 'Alt+Backspace×2 removes "--dry-run" and the preceding space.',
    optimalKeys: 2,
    category: 'kill-word-back',
  },
];

// ── Collection 8: Kill Word Forward ───────────────────────────────────────────
const killWordFwdChallenges = [
  {
    id: 7,
    collectionId: 'kill-word-fwd',
    title: 'Delete a middle argument',
    description: 'Remove "ubuntu:latest" from the docker command.',
    initial: 'docker run -it --rm ubuntu:latest bash',
    target:  'docker run -it --rm bash',
    hint: 'Navigate before "ubuntu:latest" then Alt+D kills the word forward.',
    optimalKeys: 5,
    category: 'kill-word-fwd',
  },
  {
    id: 113,
    collectionId: 'kill-word-fwd',
    title: 'Remove the --all flag',
    description: "Remove '--all' from the git fetch command.",
    initial: 'git fetch --all --prune',
    target:  'git fetch --prune',
    hint: 'Navigate just before "--all"; Alt+D kills it including the non-word "--" prefix.',
    optimalKeys: 5,
    category: 'kill-word-fwd',
  },
  {
    id: 114,
    collectionId: 'kill-word-fwd',
    title: 'Drop the debug flag',
    description: "Remove '--debug' from the webpack build.",
    initial: 'webpack --config webpack.config.js --debug --progress',
    target:  'webpack --config webpack.config.js --progress',
    hint: 'Navigate just before "--debug"; Alt+D kills it.',
    optimalKeys: 5,
    category: 'kill-word-fwd',
  },
  {
    id: 115,
    collectionId: 'kill-word-fwd',
    title: 'Remove the output file',
    description: "Remove 'output.txt' from the middle of the tee command.",
    initial: "tee output.txt | awk '{print $1}'",
    target:  "tee | awk '{print $1}'",
    hint: 'Ctrl+A + Alt+F puts cursor after "tee"; Alt+D kills "output.txt".',
    optimalKeys: 4,
    category: 'kill-word-fwd',
  },
];

// ── Collection 9: Yank (Paste) ────────────────────────────────────────────────
const yankChallenges = [
  {
    id: 9,
    collectionId: 'yank',
    title: 'Move the output file',
    description: 'Move "output.log" from after "tee" to the end.',
    initial: 'tee output.log | grep ERROR | sort',
    target:  'tee | grep ERROR | sort output.log',
    hint: 'Ctrl+A + Alt+F×3 + Ctrl+F navigates to after "output.log"; Alt+Backspace kills it; Ctrl+E; type " "; Ctrl+Y.',
    optimalKeys: 9,
    category: 'yank',
  },
  {
    id: 116,
    collectionId: 'yank',
    title: 'Reorder a flag',
    description: "Move '--debug' from the end to right after 'python3'.",
    initial: 'python3 app.py --debug',
    target:  'python3 --debug app.py',
    hint: 'Ctrl+A + Alt+F×3 to reach " --debug"; Ctrl+K kills it; Ctrl+A + Alt+F; Ctrl+Y pastes it back.',
    optimalKeys: 8,
    category: 'yank',
  },
  {
    id: 117,
    collectionId: 'yank',
    title: 'Swap file arguments',
    description: "Swap '/etc/hosts' and '/etc/resolv.conf' in the cat command.",
    initial: 'cat /etc/hosts /etc/resolv.conf',
    target:  'cat /etc/resolv.conf /etc/hosts',
    hint: 'Ctrl+A + Alt+F×3 navigates to after "/etc/hosts"; Ctrl+K kills " /etc/resolv.conf"; Ctrl+A + Alt+F; Ctrl+Y.',
    optimalKeys: 8,
    category: 'yank',
  },
  {
    id: 118,
    collectionId: 'yank',
    title: 'Duplicate a symlink target',
    description: "Add 'python3' as the link name after the target path.",
    initial: 'ln -s /usr/local/bin/python3',
    target:  'ln -s /usr/local/bin/python3 python3',
    hint: 'Alt+B from end moves before "python3"; Ctrl+K kills it; Ctrl+Y pastes; type " "; Ctrl+Y again.',
    optimalKeys: 5,
    category: 'yank',
  },
];

// ── Collection 10: Transpose Characters ───────────────────────────────────────
// ⚠️  Ctrl+T may open a new browser tab. The game will attempt to handle it,
//     but you may need to return to this tab after pressing Ctrl+T.
const transposeChallenges = [
  {
    id: 10,
    collectionId: 'transpose',
    title: 'Transposed letters',
    description: "Fix the typo 'sattus' → 'status'.",
    initial: 'git sattus',
    target:  'git status',
    hint: "⚠️ Ctrl+T may open a new tab — return here if it does. Position cursor between the swapped pair (after 'a', before 't') and press Ctrl+T.",
    optimalKeys: 4,
    category: 'transpose',
  },
  {
    id: 11,
    collectionId: 'transpose',
    title: 'Swapped characters',
    description: "Fix 'mkdri' → 'mkdir'.",
    initial: 'mkdri -p /opt/app/logs',
    target:  'mkdir -p /opt/app/logs',
    hint: '⚠️ Ctrl+T may open a new tab. Ctrl+T swaps the character before the cursor with the one at the cursor.',
    optimalKeys: 3,
    category: 'transpose',
  },
  {
    id: 20,
    collectionId: 'transpose',
    title: 'Bump the npm script',
    description: "Change 'buidl' to 'build'.",
    initial: 'npm run buidl --prefix packages/frontend',
    target:  'npm run build --prefix packages/frontend',
    hint: '⚠️ Ctrl+T may open a new tab. Navigate to after "bui"; Ctrl+T swaps "id" → "di" giving "build".',
    optimalKeys: 4,
    category: 'transpose',
  },
  {
    id: 119,
    collectionId: 'transpose',
    title: 'Fix a two-character swap',
    description: "Fix 'pytohn' → 'python'.",
    initial: 'pytohn3 script.py',
    target:  'python3 script.py',
    hint: '⚠️ Ctrl+T may open a new tab. Navigate so the cursor sits after "to"; Ctrl+T swaps to give "ot".',
    optimalKeys: 3,
    category: 'transpose',
  },
];

// ── Collection 11: Graduate ────────────────────────────────────────────────────
const graduateChallenges = [
  {
    id: 21,
    collectionId: 'graduate',
    title: 'Switch git remote',
    description: "Change 'upstream' to 'origin' in the push command.",
    initial: 'git push upstream feature/dark-mode',
    target:  'git push origin feature/dark-mode',
    hint: 'Alt+B×2 to navigate before "upstream"; Alt+Backspace to kill it; type "origin".',
    optimalKeys: 9,
    category: 'graduate',
  },
  {
    id: 22,
    collectionId: 'graduate',
    title: 'Replace the AWS profile',
    description: "Change 'staging' to 'production' in the AWS profile.",
    initial: 'aws --profile staging s3 ls s3://my-company-data',
    target:  'aws --profile production s3 ls s3://my-company-data',
    hint: 'Alt+B×3 navigates to "staging"; Alt+Backspace kills it; type "production".',
    optimalKeys: 12,
    category: 'graduate',
  },
  {
    id: 14,
    collectionId: 'graduate',
    title: 'Fix the port',
    description: "Change port 8080 to 9090 in the ssh tunnel.",
    initial: 'ssh -L 8080:localhost:8080 user@192.168.1.10',
    target:  'ssh -L 9090:localhost:9090 user@192.168.1.10',
    hint: 'Alt+B navigates to each number block; Backspace + retype.',
    optimalKeys: 10,
    category: 'graduate',
  },
  {
    id: 26,
    collectionId: 'graduate',
    title: 'Change the user',
    description: "Replace 'alice' with 'bob' everywhere in the scp path.",
    initial: 'scp -r alice@server:/home/alice/data /local/backup',
    target:  'scp -r bob@server:/home/bob/data /local/backup',
    hint: 'Alt+F/B to navigate to each "alice"; Alt+Backspace + retype "bob".',
    optimalKeys: 14,
    category: 'graduate',
  },
  {
    id: 120,
    collectionId: 'graduate',
    title: 'Clean up the rsync',
    description: "Remove '--delete' and rename user 'alice' to 'bob'.",
    initial: 'rsync -avz --delete /home/alice/src/ server:/backup/',
    target:  'rsync -avz /home/bob/src/ server:/backup/',
    hint: 'Ctrl+A + Alt+F×2 + Alt+D removes "--delete"; Alt+F×2 navigates to after "alice"; Backspace×5 + type "bob".',
    optimalKeys: 14,
    category: 'graduate',
  },
];

/**
 * COLLECTIONS — the ordered learning track.
 * Each collection focuses on one shortcut family.
 * Play them in order to build skills systematically.
 */
export const COLLECTIONS = [
  {
    id: 'line-nav',
    name: 'Line Navigation',
    shortcut: 'Ctrl+A / Ctrl+E',
    description: 'Jump instantly to the start or end of the line.',
    challenges: lineNavChallenges,
  },
  {
    id: 'word-nav',
    name: 'Word Navigation',
    shortcut: 'Alt+F / Alt+B',
    description: 'Leap forward or backward one whole word at a time.',
    challenges: wordNavChallenges,
  },
  {
    id: 'char-nav',
    name: 'Character Navigation',
    shortcut: 'Ctrl+F / Ctrl+B',
    description: 'Step precisely one character at a time.',
    challenges: charNavChallenges,
  },
  {
    id: 'char-del',
    name: 'Character Deletion',
    shortcut: 'Ctrl+D / Backspace',
    description: 'Delete a single character, forward or backward.',
    challenges: charDelChallenges,
  },
  {
    id: 'kill-end',
    name: 'Kill to End',
    shortcut: 'Ctrl+K',
    description: 'Slice everything from the cursor to the end of the line.',
    challenges: killEndChallenges,
  },
  {
    id: 'kill-start',
    name: 'Kill to Start',
    shortcut: 'Ctrl+U',
    description: 'Erase everything from the cursor back to the beginning.',
    challenges: killStartChallenges,
  },
  {
    id: 'kill-word-back',
    name: 'Kill Word Backward',
    shortcut: 'Alt+Backspace',
    description: 'Delete the whole word immediately before the cursor. (Ctrl+W in a real terminal, but that closes browser tabs.)',
    challenges: killWordBackChallenges,
  },
  {
    id: 'kill-word-fwd',
    name: 'Kill Word Forward',
    shortcut: 'Alt+D',
    description: 'Delete the whole word immediately after the cursor.',
    challenges: killWordFwdChallenges,
  },
  {
    id: 'yank',
    name: 'Yank (Paste)',
    shortcut: 'Ctrl+Y',
    description: 'Paste back text that was previously killed.',
    challenges: yankChallenges,
  },
  {
    id: 'transpose',
    name: 'Transpose Characters',
    shortcut: 'Ctrl+T',
    description: 'Swap the two characters around the cursor to fix transposition typos.',
    challenges: transposeChallenges,
  },
  {
    id: 'graduate',
    name: 'Graduate',
    shortcut: 'All shortcuts',
    description: "Complex challenges that combine everything you've learnt. You've got this!",
    challenges: graduateChallenges,
  },
];

/**
 * All challenges as a flat list, in collection order.
 * Used for practice mode (random selection) and structural tests.
 */
export const CHALLENGES = COLLECTIONS.flatMap(c => c.challenges);

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
