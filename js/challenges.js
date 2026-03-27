/**
 * Challenge data for the Bash Keyboard Game.
 *
 * Each challenge has:
 * - id: unique identifier
 * - track: learning track name (e.g. "navigation", "killing", "yanking", "transpose", "combined")
 * - stage: stage within the track (1 = intro, 2 = practice, 3 = advanced, 4 = graduation)
 * - description: what the player needs to do
 * - hint: the bash shortcut to use
 * - startText: the initial text in the input
 * - targetText: what the text should become
 * - parKeypresses: target number of keypresses (ideal solution)
 * - cursorStart: optional starting cursor position (defaults to end of text)
 *
 * Tracks:
 *   "navigation"  – Ctrl+A, Ctrl+E, Ctrl+B, Ctrl+F, Alt+B, Alt+F
 *   "killing"     – Ctrl+K, Ctrl+U, Ctrl+W, Alt+D, Ctrl+D, Ctrl+H
 *   "yanking"     – Ctrl+Y combined with kill commands
 *   "transpose"   – Ctrl+T character transposition
 *   "combined"    – Multi-shortcut challenges mixing techniques
 *   "graduation"  – Final challenges combining all skills
 */
var CHALLENGES = [
  // ============================================================
  // TRACK: navigation
  // ============================================================

  // --- Stage 1: Introduction ---
  {
    id: 1,
    track: "navigation",
    stage: 1,
    description: "Move the cursor to the beginning of the line and type 'sudo '",
    hint: "Ctrl+A moves to the beginning of the line",
    startText: "apt-get install vim",
    targetText: "sudo apt-get install vim",
    parKeypresses: 6,
    cursorStart: 19
  },
  {
    id: 2,
    track: "navigation",
    stage: 1,
    description: "Move the cursor to the end of the line and add ' --verbose'",
    hint: "Ctrl+E moves to the end of the line",
    startText: "curl https://example.com",
    targetText: "curl https://example.com --verbose",
    parKeypresses: 11,
    cursorStart: 0
  },
  {
    id: 3,
    track: "navigation",
    stage: 1,
    description: "Move back one character and insert a missing 'l'",
    hint: "Ctrl+B moves back one character",
    startText: "helo world",
    targetText: "hello world",
    parKeypresses: 2,
    cursorStart: 4
  },
  {
    id: 4,
    track: "navigation",
    stage: 1,
    description: "Move forward one character and insert a space",
    hint: "Ctrl+F moves forward one character",
    startText: "helloworld",
    targetText: "hello world",
    parKeypresses: 2,
    cursorStart: 4
  },

  // --- Stage 2: Word navigation ---
  {
    id: 5,
    track: "navigation",
    stage: 2,
    description: "Move back one word and fix the typo: change 'gti' to 'git'",
    hint: "Alt+B moves back one word",
    startText: "gti status",
    targetText: "git status",
    parKeypresses: 6,
    cursorStart: 10
  },
  {
    id: 6,
    track: "navigation",
    stage: 2,
    description: "Move forward one word and add ' -la' after 'ls'",
    hint: "Alt+F moves forward one word",
    startText: "ls /home/user/documents",
    targetText: "ls -la /home/user/documents",
    parKeypresses: 6,
    cursorStart: 0
  },
  {
    id: 7,
    track: "navigation",
    stage: 2,
    description: "Move back two words and change 'old' to 'new'",
    hint: "Alt+B twice to move back two words",
    startText: "cp old file.txt",
    targetText: "cp new file.txt",
    parKeypresses: 9,
    cursorStart: 16
  },
  {
    id: 8,
    track: "navigation",
    stage: 2,
    description: "Move forward two words and add '-rf ' after 'rm'",
    hint: "Alt+F moves forward one word at a time",
    startText: "rm /tmp/old_files",
    targetText: "rm -rf /tmp/old_files",
    parKeypresses: 7,
    cursorStart: 0
  },
  {
    id: 76,
    track: "navigation",
    stage: 2,
    description: "Go to end and type ' --dry-run'",
    hint: "Ctrl+E moves to end of line",
    startText: "rsync -avz /src /dest",
    targetText: "rsync -avz /src /dest --dry-run",
    parKeypresses: 11,
    cursorStart: 0
  },

  // --- Stage 3: Advanced navigation ---
  {
    id: 9,
    track: "navigation",
    stage: 3,
    description: "Go to start, skip to end of first word, and type ' -v'",
    hint: "Ctrl+A then Alt+F to move past a word",
    startText: "tar -czf archive.tar.gz .",
    targetText: "tar -v -czf archive.tar.gz .",
    parKeypresses: 6,
    cursorStart: 25
  },
  {
    id: 10,
    track: "navigation",
    stage: 3,
    description: "Navigate to the middle of the line: go to start, skip 3 words, type '--force '",
    hint: "Ctrl+A followed by multiple Alt+F",
    startText: "git push origin main",
    targetText: "git push origin --force main",
    parKeypresses: 12,
    cursorStart: 20
  },
  {
    id: 11,
    track: "navigation",
    stage: 3,
    description: "Go to end, back one word, and insert '--no-cache ' before it",
    hint: "Ctrl+E then Alt+B to position, then type",
    startText: "docker build .",
    targetText: "docker build --no-cache .",
    parKeypresses: 14,
    cursorStart: 0
  },
  {
    id: 77,
    track: "navigation",
    stage: 3,
    description: "Move to the beginning and type 'ENV=production '",
    hint: "Ctrl+A then type the prefix",
    startText: "node server.js",
    targetText: "ENV=production node server.js",
    parKeypresses: 16,
    cursorStart: 14
  },

  // --- Stage 4: Graduation ---
  {
    id: 12,
    track: "navigation",
    stage: 4,
    description: "Navigate to insert 'sudo ' at start and ' -y' at the end",
    hint: "Ctrl+A to start, type, Ctrl+E to end, type",
    startText: "apt-get upgrade",
    targetText: "sudo apt-get upgrade -y",
    parKeypresses: 10,
    cursorStart: 15
  },
  {
    id: 13,
    track: "navigation",
    stage: 4,
    description: "Add 'EDITOR=vim ' at the beginning of the line",
    hint: "Ctrl+A then type the prefix",
    startText: "crontab -e",
    targetText: "EDITOR=vim crontab -e",
    parKeypresses: 12,
    cursorStart: 10
  },

  // ============================================================
  // TRACK: killing
  // ============================================================

  // --- Stage 1: Kill to end / start ---
  {
    id: 14,
    track: "killing",
    stage: 1,
    description: "Delete from the cursor to the end of the line",
    hint: "Ctrl+K kills from cursor to end of line",
    startText: "echo 'hello world' && rm -rf /",
    targetText: "echo 'hello world'",
    parKeypresses: 2,
    cursorStart: 19
  },
  {
    id: 15,
    track: "killing",
    stage: 1,
    description: "Delete from the cursor to the beginning of the line, then type 'ls'",
    hint: "Ctrl+U kills from cursor to beginning of line",
    startText: "cat /var/log/syslog",
    targetText: "ls",
    parKeypresses: 4,
    cursorStart: 19
  },
  {
    id: 16,
    track: "killing",
    stage: 1,
    description: "Delete everything and type 'pwd'",
    hint: "Ctrl+U kills from cursor to beginning of line",
    startText: "find / -name '*.conf' -type f",
    targetText: "pwd",
    parKeypresses: 5,
    cursorStart: 29
  },
  {
    id: 17,
    track: "killing",
    stage: 1,
    description: "Delete from cursor to end and type ' --help'",
    hint: "Ctrl+K kills to end of line",
    startText: "docker run -it ubuntu bash",
    targetText: "docker run --help",
    parKeypresses: 8,
    cursorStart: 11
  },

  // --- Stage 2: Word killing ---
  {
    id: 18,
    track: "killing",
    stage: 2,
    description: "Delete the word behind the cursor and type 'projects'",
    hint: "Ctrl+W deletes the word before the cursor",
    startText: "cd /home/user/documents",
    targetText: "cd /home/user/projects",
    parKeypresses: 10,
    cursorStart: 23
  },
  {
    id: 19,
    track: "killing",
    stage: 2,
    description: "Delete the word after the cursor",
    hint: "Alt+D deletes the word after the cursor",
    startText: "git commit --amend --no-edit",
    targetText: "git commit --no-edit",
    parKeypresses: 4,
    cursorStart: 11
  },
  {
    id: 20,
    track: "killing",
    stage: 2,
    description: "Delete the last two words",
    hint: "Ctrl+W twice to delete two words",
    startText: "ls -la /tmp old_stuff",
    targetText: "ls -la",
    parKeypresses: 2,
    cursorStart: 21
  },
  {
    id: 21,
    track: "killing",
    stage: 2,
    description: "Delete the word forward and type 'test'",
    hint: "Alt+D to delete forward word, then type",
    startText: "npm run build:production",
    targetText: "npm run test",
    parKeypresses: 6,
    cursorStart: 8
  },
  {
    id: 79,
    track: "killing",
    stage: 2,
    description: "Delete the last word to simplify the command",
    hint: "Ctrl+W deletes the word before the cursor",
    startText: "git commit -m 'fix typo' --amend",
    targetText: "git commit -m 'fix typo'",
    parKeypresses: 1,
    cursorStart: 32
  },

  // --- Stage 3: Character deletion ---
  {
    id: 22,
    track: "killing",
    stage: 3,
    description: "Delete the character under the cursor to fix the doubled letter",
    hint: "Ctrl+D deletes the character at the cursor",
    startText: "helllo world",
    targetText: "hello world",
    parKeypresses: 1,
    cursorStart: 3
  },
  {
    id: 23,
    track: "killing",
    stage: 3,
    description: "Delete the character before the cursor to fix the typo",
    hint: "Ctrl+H deletes the character before the cursor (like Backspace)",
    startText: "gitr status",
    targetText: "git status",
    parKeypresses: 1,
    cursorStart: 4
  },
  {
    id: 24,
    track: "killing",
    stage: 3,
    description: "Delete two characters forward to remove '--'",
    hint: "Ctrl+D twice to delete two characters",
    startText: "ls -- /tmp",
    targetText: "ls /tmp",
    parKeypresses: 3,
    cursorStart: 3
  },
  {
    id: 78,
    track: "killing",
    stage: 3,
    description: "Delete from cursor to end, replacing the rest of the path",
    hint: "Ctrl+K to kill, then type the new path",
    startText: "cd /var/log/old/stuff",
    targetText: "cd /var/www/html",
    parKeypresses: 10,
    cursorStart: 7
  },

  // --- Stage 4: Graduation ---
  {
    id: 25,
    track: "killing",
    stage: 4,
    description: "Delete the last argument and add '/etc/nginx'",
    hint: "Ctrl+W deletes the last word, then type the new one",
    startText: "cp nginx.conf /usr/local/etc",
    targetText: "cp nginx.conf /etc/nginx",
    parKeypresses: 11,
    cursorStart: 28
  },
  {
    id: 26,
    track: "killing",
    stage: 4,
    description: "Delete from cursor to end and type ' -9 nginx'",
    hint: "Ctrl+K kills to end of line",
    startText: "kill -TERM 12345",
    targetText: "kill -9 nginx",
    parKeypresses: 11,
    cursorStart: 5
  },
  {
    id: 27,
    track: "killing",
    stage: 4,
    description: "Delete the last two words and type '*.txt'",
    hint: "Ctrl+W twice then type",
    startText: "find . -name important file",
    targetText: "find . -name *.txt",
    parKeypresses: 7,
    cursorStart: 27
  },
  {
    id: 28,
    track: "killing",
    stage: 4,
    description: "Delete everything and type 'exit'",
    hint: "Ctrl+U clears the line",
    startText: "ssh user@remote-server.example.com -p 2222",
    targetText: "exit",
    parKeypresses: 6,
    cursorStart: 43
  },

  // ============================================================
  // TRACK: yanking
  // ============================================================

  // --- Stage 1: Basic yank ---
  {
    id: 29,
    track: "yanking",
    stage: 1,
    description: "Kill to end of line, move to start, and paste",
    hint: "Ctrl+K kills text, Ctrl+A goes to start, Ctrl+Y pastes",
    startText: "world hello",
    targetText: "worldhello ",
    parKeypresses: 4,
    cursorStart: 5
  },
  {
    id: 30,
    track: "yanking",
    stage: 1,
    description: "Kill the last word with Ctrl+W, go to start, and yank it there",
    hint: "Ctrl+W kills word, Ctrl+A goes to start, Ctrl+Y pastes",
    startText: "hello world",
    targetText: "worldhello ",
    parKeypresses: 3,
    cursorStart: 11
  },

  // --- Stage 2: Cut and rearrange ---
  {
    id: 31,
    track: "yanking",
    stage: 2,
    description: "Cut the last word and paste it at the start after going to beginning",
    hint: "Ctrl+W cuts word, Ctrl+A goes to start, Ctrl+Y pastes",
    startText: "install sudo",
    targetText: "sudo install",
    parKeypresses: 4,
    cursorStart: 12
  },
  {
    id: 32,
    track: "yanking",
    stage: 2,
    description: "Cut everything before cursor and paste it at the end",
    hint: "Ctrl+U cuts to start, Ctrl+E goes to end, Ctrl+Y pastes",
    startText: "world hello",
    targetText: "hello world",
    parKeypresses: 5,
    cursorStart: 6
  },
  {
    id: 33,
    track: "yanking",
    stage: 2,
    description: "Cut the last word and paste it at the end after a space",
    hint: "Ctrl+W cuts the word, Ctrl+E goes to end, Ctrl+Y pastes",
    startText: "grep -r pattern /var/log",
    targetText: "grep -r /var/log pattern",
    parKeypresses: 7,
    cursorStart: 18
  },

  // --- Stage 3: Advanced rearrange ---
  {
    id: 34,
    track: "yanking",
    stage: 3,
    description: "Move the first word to the end: kill first word, go to end, paste",
    hint: "Ctrl+A to start, Alt+D to kill word, Ctrl+E to end, Ctrl+Y to paste",
    startText: "fast run npm",
    targetText: " run npm fast",
    parKeypresses: 5,
    cursorStart: 0
  },
  {
    id: 35,
    track: "yanking",
    stage: 3,
    description: "Kill to end, go to start, type 'echo ', go to end, paste",
    hint: "Ctrl+K, Ctrl+A, type, Ctrl+E, Ctrl+Y",
    startText: "hello world",
    targetText: "echo hello world",
    parKeypresses: 9,
    cursorStart: 0
  },

  // --- Stage 4: Graduation ---
  {
    id: 36,
    track: "yanking",
    stage: 4,
    description: "Rearrange: swap the two arguments by cutting and pasting",
    hint: "Use Ctrl+W to cut, navigate with Ctrl+A/E, Ctrl+Y to paste",
    startText: "cp destination source",
    targetText: "cp source destination",
    parKeypresses: 8,
    cursorStart: 21
  },
  {
    id: 37,
    track: "yanking",
    stage: 4,
    description: "Kill the middle section and paste it at the end",
    hint: "Navigate, Ctrl+K to kill, Ctrl+E to end, Ctrl+Y to paste",
    startText: "grep -i -r pattern .",
    targetText: "grep -r pattern . -i",
    parKeypresses: 9,
    cursorStart: 5
  },

  // ============================================================
  // TRACK: transpose
  // ============================================================

  // --- Stage 1: Basic transpose ---
  {
    id: 38,
    track: "transpose",
    stage: 1,
    description: "Fix the transposed characters: 'sl' should be 'ls'",
    hint: "Ctrl+T transposes the two characters before the cursor",
    startText: "sl -la /tmp",
    targetText: "ls -la /tmp",
    parKeypresses: 3,
    cursorStart: 0
  },
  {
    id: 39,
    track: "transpose",
    stage: 1,
    description: "Fix the typo: 'cta' should be 'cat'",
    hint: "Navigate and use Ctrl+T to transpose",
    startText: "cta /etc/passwd",
    targetText: "cat /etc/passwd",
    parKeypresses: 3,
    cursorStart: 0
  },
  {
    id: 40,
    track: "transpose",
    stage: 1,
    description: "Fix 'tset' to 'test' by transposing",
    hint: "Position cursor after the swapped chars, then Ctrl+T",
    startText: "npm run tset",
    targetText: "npm run test",
    parKeypresses: 3,
    cursorStart: 12
  },

  // --- Stage 2: Navigating to transpose ---
  {
    id: 41,
    track: "transpose",
    stage: 2,
    description: "Fix 'grpe' at the start to 'grep'",
    hint: "Navigate to position, then Ctrl+T",
    startText: "grpe -r pattern .",
    targetText: "grep -r pattern .",
    parKeypresses: 3,
    cursorStart: 17
  },
  {
    id: 42,
    track: "transpose",
    stage: 2,
    description: "Fix 'dockre' to 'docker' in the middle of the command",
    hint: "Navigate to after 'kr' and transpose",
    startText: "sudo dockre ps",
    targetText: "sudo docker ps",
    parKeypresses: 5,
    cursorStart: 14
  },
  {
    id: 43,
    track: "transpose",
    stage: 2,
    description: "Fix the swapped 'ti' to 'it' in 'git'",
    hint: "Navigate to after the swapped pair and Ctrl+T",
    startText: "gti pull origin main",
    targetText: "git pull origin main",
    parKeypresses: 4,
    cursorStart: 20
  },

  // --- Stage 3: Multiple transpose ---
  {
    id: 44,
    track: "transpose",
    stage: 3,
    description: "Fix two typos: 'sl -al' should be 'ls -la'",
    hint: "Ctrl+T at each position to fix both swaps",
    startText: "sl -al /home",
    targetText: "ls -la /home",
    parKeypresses: 7,
    cursorStart: 0
  },

  // --- Stage 4: Graduation ---
  {
    id: 45,
    track: "transpose",
    stage: 4,
    description: "Fix 'ehco' to 'echo' using transpose",
    hint: "Navigate to the right position, then Ctrl+T",
    startText: "ehco 'Hello, World!'",
    targetText: "echo 'Hello, World!'",
    parKeypresses: 3,
    cursorStart: 20
  },
  {
    id: 46,
    track: "transpose",
    stage: 4,
    description: "Fix 'mkdri' to 'mkdir' in a longer command",
    hint: "Navigate and transpose the swapped characters",
    startText: "mkdri -p /var/www/html/assets",
    targetText: "mkdir -p /var/www/html/assets",
    parKeypresses: 5,
    cursorStart: 28
  },

  // ============================================================
  // TRACK: combined
  // ============================================================

  // --- Stage 1: Navigate + type ---
  {
    id: 47,
    track: "combined",
    stage: 1,
    description: "Go to the start and add 'sudo ' before the command",
    hint: "Ctrl+A then type 'sudo '",
    startText: "systemctl restart nginx",
    targetText: "sudo systemctl restart nginx",
    parKeypresses: 6,
    cursorStart: 23
  },
  {
    id: 48,
    track: "combined",
    stage: 1,
    description: "Move to beginning and add 'time ' before the command",
    hint: "Ctrl+A then type 'time '",
    startText: "npm run build",
    targetText: "time npm run build",
    parKeypresses: 6,
    cursorStart: 13
  },
  {
    id: 49,
    track: "combined",
    stage: 1,
    description: "Move to the end and add ' | grep error'",
    hint: "Ctrl+E moves to end of line",
    startText: "cat /var/log/syslog",
    targetText: "cat /var/log/syslog | grep error",
    parKeypresses: 15,
    cursorStart: 0
  },

  // --- Stage 2: Navigate + kill ---
  {
    id: 50,
    track: "combined",
    stage: 2,
    description: "Move to start, delete the first word, and type 'vim'",
    hint: "Ctrl+A, Alt+D, type 'vim'",
    startText: "nano /etc/hosts",
    targetText: "vim /etc/hosts",
    parKeypresses: 5,
    cursorStart: 15
  },
  {
    id: 51,
    track: "combined",
    stage: 2,
    description: "Move to beginning, move forward one word, and delete the rest",
    hint: "Ctrl+A, Alt+F, Ctrl+K",
    startText: "python3 very_old_script.py --debug --verbose",
    targetText: "python3",
    parKeypresses: 3,
    cursorStart: 45
  },
  {
    id: 52,
    track: "combined",
    stage: 2,
    description: "Delete the word before cursor and type 'development'",
    hint: "Ctrl+W deletes the previous word",
    startText: "git checkout production",
    targetText: "git checkout development",
    parKeypresses: 12,
    cursorStart: 23
  },
  {
    id: 53,
    track: "combined",
    stage: 2,
    description: "Move to beginning and change 'mv' to 'cp'",
    hint: "Ctrl+A, Alt+D, type 'cp'",
    startText: "mv file.txt /backup/",
    targetText: "cp file.txt /backup/",
    parKeypresses: 4,
    cursorStart: 20
  },
  {
    id: 81,
    track: "combined",
    stage: 2,
    description: "Kill to start of line and type a new command keeping the arguments",
    hint: "Ctrl+A, Alt+F, Ctrl+U to kill command, type new one",
    startText: "cat README.md",
    targetText: "less README.md",
    parKeypresses: 6,
    cursorStart: 13
  },

  // --- Stage 3: Navigate + kill + type ---
  {
    id: 54,
    track: "combined",
    stage: 3,
    description: "Go to the beginning and change 'http' to 'https'",
    hint: "Ctrl+A then Alt+F to end of first word, navigate, type 's'",
    startText: "curl http://example.com/api",
    targetText: "curl https://example.com/api",
    parKeypresses: 8,
    cursorStart: 27
  },
  {
    id: 55,
    track: "combined",
    stage: 3,
    description: "Delete everything after 'git' and type ' stash pop'",
    hint: "Navigate with Alt+F, then Ctrl+K",
    startText: "git rebase --interactive HEAD~3",
    targetText: "git stash pop",
    parKeypresses: 13,
    cursorStart: 0
  },
  {
    id: 56,
    track: "combined",
    stage: 3,
    description: "Move to end and append ' 2>&1'",
    hint: "Ctrl+E to go to end of line",
    startText: "make build",
    targetText: "make build 2>&1",
    parKeypresses: 7,
    cursorStart: 0
  },
  {
    id: 57,
    track: "combined",
    stage: 3,
    description: "Delete the current word forward and type 'HEAD'",
    hint: "Alt+D deletes word forward",
    startText: "git reset --soft origin/main",
    targetText: "git reset --soft HEAD",
    parKeypresses: 6,
    cursorStart: 17
  },
  {
    id: 58,
    track: "combined",
    stage: 3,
    description: "Add '-r ' after 'cp' by navigating to the right position",
    hint: "Ctrl+A, Alt+F to skip a word, then type",
    startText: "cp /source/dir /dest/dir",
    targetText: "cp -r /source/dir /dest/dir",
    parKeypresses: 6,
    cursorStart: 24
  },
  {
    id: 80,
    track: "combined",
    stage: 3,
    description: "Navigate to the middle, delete a word, and insert a new one",
    hint: "Ctrl+A, Alt+F, Alt+D, then type",
    startText: "git merge feature-old-branch",
    targetText: "git merge develop",
    parKeypresses: 11,
    cursorStart: 28
  },

  // --- Stage 4: Graduation ---
  {
    id: 59,
    track: "combined",
    stage: 4,
    description: "Go to end and pipe through 'wc -l'",
    hint: "Ctrl+E to move to end",
    startText: "find . -name '*.js'",
    targetText: "find . -name '*.js' | wc -l",
    parKeypresses: 10,
    cursorStart: 0
  },
  {
    id: 60,
    track: "combined",
    stage: 4,
    description: "Delete last word and type 'HEAD~1'",
    hint: "Ctrl+W deletes word before cursor",
    startText: "git diff main",
    targetText: "git diff HEAD~1",
    parKeypresses: 7,
    cursorStart: 13
  },
  {
    id: 61,
    track: "combined",
    stage: 4,
    description: "Delete everything after 'tar' and type ' -xzf archive.tar.gz'",
    hint: "Alt+F, Ctrl+K to delete rest of line, then type",
    startText: "tar -cvf backup.tar /home/user",
    targetText: "tar -xzf archive.tar.gz",
    parKeypresses: 23,
    cursorStart: 0
  },
  {
    id: 62,
    track: "combined",
    stage: 4,
    description: "Move to start and replace 'echo' with 'printf'",
    hint: "Ctrl+A, Alt+D, type 'printf'",
    startText: "echo 'Hello, World!'",
    targetText: "printf 'Hello, World!'",
    parKeypresses: 9,
    cursorStart: 21
  },
  {
    id: 63,
    track: "combined",
    stage: 4,
    description: "Replace the file path: delete the last word and type '/tmp/output.log'",
    hint: "Ctrl+W to delete word, then type new path",
    startText: "tail -f /var/log/messages",
    targetText: "tail -f /tmp/output.log",
    parKeypresses: 16,
    cursorStart: 25
  },
  {
    id: 82,
    track: "combined",
    stage: 4,
    description: "Completely restructure: add env var, change command, add pipe",
    hint: "Combine Ctrl+A, Alt+D, Ctrl+E, and typing",
    startText: "python app.py",
    targetText: "DEBUG=1 python3 app.py | tee log.txt",
    parKeypresses: 31,
    cursorStart: 0
  },

  // ============================================================
  // TRACK: graduation
  // ============================================================

  // --- Stage 1: Multi-technique warmup ---
  {
    id: 64,
    track: "graduation",
    stage: 1,
    description: "Delete everything and type 'history'",
    hint: "Ctrl+U deletes to start of line, then type the new command",
    startText: "find / -name '*.conf' -type f",
    targetText: "history",
    parKeypresses: 9,
    cursorStart: 29
  },
  {
    id: 65,
    track: "graduation",
    stage: 1,
    description: "Go to beginning, skip first word, delete rest, and type ' clone https://github.com/user/repo'",
    hint: "Ctrl+A, Alt+F, Ctrl+K, then type",
    startText: "git pull origin main --rebase",
    targetText: "git clone https://github.com/user/repo",
    parKeypresses: 38,
    cursorStart: 29
  },
  {
    id: 66,
    track: "graduation",
    stage: 1,
    description: "Go to beginning, skip two words, and delete the third word",
    hint: "Ctrl+A, Alt+F twice, Alt+D",
    startText: "git log --oneline --graph --all",
    targetText: "git log --graph --all",
    parKeypresses: 5,
    cursorStart: 31
  },
  {
    id: 67,
    track: "graduation",
    stage: 1,
    description: "Move back one word and insert '--no-cache ' before it",
    hint: "Alt+B moves back one word, then type",
    startText: "docker build .",
    targetText: "docker build --no-cache .",
    parKeypresses: 13,
    cursorStart: 14
  },
  {
    id: 85,
    track: "graduation",
    stage: 1,
    description: "Simplify: delete the verbose flags keeping only the command and path",
    hint: "Navigate with Alt+F, use Ctrl+K to kill",
    startText: "find /home -type f -name '*.log' -mtime +30",
    targetText: "find /home",
    parKeypresses: 3,
    cursorStart: 0
  },

  // --- Stage 2: Mix everything ---
  {
    id: 68,
    track: "graduation",
    stage: 2,
    description: "Swap two arguments and add a flag using cut, paste, and navigation",
    hint: "Use Ctrl+W, Ctrl+A, Ctrl+Y, navigate, type",
    startText: "cp /dest /src",
    targetText: "cp -r /src /dest",
    parKeypresses: 11,
    cursorStart: 13
  },
  {
    id: 69,
    track: "graduation",
    stage: 2,
    description: "Fix the typo, add sudo at start, and pipe to less",
    hint: "Ctrl+T to fix, Ctrl+A + type, Ctrl+E + type",
    startText: "cta /var/log/syslog",
    targetText: "sudo cat /var/log/syslog | less",
    parKeypresses: 17,
    cursorStart: 0
  },
  {
    id: 70,
    track: "graduation",
    stage: 2,
    description: "Rearrange: move 'sudo' from end to start",
    hint: "Ctrl+W to cut 'sudo', Ctrl+A to go to start, Ctrl+Y to paste, type ' '",
    startText: "apt-get install vim sudo",
    targetText: "sudo apt-get install vim",
    parKeypresses: 6,
    cursorStart: 24
  },
  {
    id: 71,
    track: "graduation",
    stage: 2,
    description: "Kill the middle flags, navigate to end, and add '--all'",
    hint: "Navigate, Ctrl+K to kill flags, Ctrl+E to go to end, type",
    startText: "git log --oneline --graph",
    targetText: "git log --all",
    parKeypresses: 10,
    cursorStart: 8
  },
  {
    id: 84,
    track: "graduation",
    stage: 2,
    description: "Fix typo in command name and add a missing flag",
    hint: "Ctrl+T to fix typo, then navigate and type the flag",
    startText: "dcoker images",
    targetText: "docker images -a",
    parKeypresses: 7,
    cursorStart: 13
  },

  // --- Stage 3: Expert challenges ---
  {
    id: 72,
    track: "graduation",
    stage: 3,
    description: "Complete rewrite: replace everything after 'docker' with ' compose up -d'",
    hint: "Ctrl+A, Alt+F, Ctrl+K, then type",
    startText: "docker run -it --rm ubuntu:latest bash",
    targetText: "docker compose up -d",
    parKeypresses: 17,
    cursorStart: 38
  },
  {
    id: 73,
    track: "graduation",
    stage: 3,
    description: "Fix the typo, delete extra args, and add a pipe",
    hint: "Fix with Ctrl+T, kill with Ctrl+K, go to end, type pipe",
    startText: "grpe -r error /var/log/syslog --color",
    targetText: "grep -r error /var/log/syslog | head",
    parKeypresses: 14,
    cursorStart: 0
  },
  {
    id: 74,
    track: "graduation",
    stage: 3,
    description: "Transform: change command, fix path, add flags",
    hint: "Navigate, kill, and type to transform the command",
    startText: "mv old_file.txt /tmp/archive",
    targetText: "cp -r new_dir /home/archive",
    parKeypresses: 27,
    cursorStart: 0
  },
  {
    id: 75,
    track: "graduation",
    stage: 3,
    description: "Cut first argument, replace second, paste first at end",
    hint: "Use multiple kill and yank operations",
    startText: "diff old.txt new.txt",
    targetText: "diff new.txt old.txt",
    parKeypresses: 10,
    cursorStart: 12
  },
  {
    id: 83,
    track: "graduation",
    stage: 3,
    description: "Rewrite the command keeping only 'ssh': kill all arguments, type new ones",
    hint: "Ctrl+A, Alt+F, Ctrl+K, then type the new arguments",
    startText: "ssh user@old-server.com -p 22 -i ~/.ssh/id_rsa",
    targetText: "ssh deploy@prod.example.com",
    parKeypresses: 30,
    cursorStart: 47
  }
];

/**
 * Track metadata for the learning track system.
 */
var TRACKS = [
  {
    id: "navigation",
    name: "Navigation",
    icon: "🧭",
    description: "Learn to move the cursor quickly with Ctrl+A/E/B/F and Alt+B/F",
    shortcuts: ["Ctrl+A", "Ctrl+E", "Ctrl+B", "Ctrl+F", "Alt+B", "Alt+F"]
  },
  {
    id: "killing",
    name: "Killing & Deleting",
    icon: "✂️",
    description: "Master deleting text with Ctrl+K/U/W/D/H and Alt+D",
    shortcuts: ["Ctrl+K", "Ctrl+U", "Ctrl+W", "Alt+D", "Ctrl+D", "Ctrl+H"]
  },
  {
    id: "yanking",
    name: "Kill & Yank",
    icon: "📋",
    description: "Cut and paste text using the kill ring with Ctrl+W/K/U and Ctrl+Y",
    shortcuts: ["Ctrl+W", "Ctrl+K", "Ctrl+U", "Ctrl+Y"]
  },
  {
    id: "transpose",
    name: "Transpose",
    icon: "🔀",
    description: "Fix typos quickly by swapping characters with Ctrl+T",
    shortcuts: ["Ctrl+T"]
  },
  {
    id: "combined",
    name: "Combined Skills",
    icon: "🔗",
    description: "Put multiple shortcuts together for efficient editing",
    shortcuts: ["Ctrl+A", "Ctrl+E", "Alt+F", "Ctrl+K", "Ctrl+W", "Alt+D"]
  },
  {
    id: "graduation",
    name: "Graduation",
    icon: "🎓",
    description: "Prove your mastery with complex multi-step challenges",
    shortcuts: ["All shortcuts"]
  }
];

/**
 * Get challenges for a specific track, sorted by stage.
 */
function getChallengesForTrack(trackId) {
  return CHALLENGES
    .filter(function (c) { return c.track === trackId; })
    .sort(function (a, b) { return a.stage - b.stage || a.id - b.id; });
}

/**
 * Get all available track IDs.
 */
function getTrackIds() {
  return TRACKS.map(function (t) { return t.id; });
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHALLENGES, TRACKS, getChallengesForTrack, getTrackIds };
}
