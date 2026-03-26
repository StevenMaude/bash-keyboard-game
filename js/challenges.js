/**
 * Challenge data for the Bash Keyboard Game.
 *
 * Each challenge has:
 * - id: unique identifier
 * - description: what the player needs to do
 * - hint: the bash shortcut to use
 * - startText: the initial text in the input
 * - targetText: what the text should become
 * - parKeypresses: target number of keypresses (ideal solution)
 * - cursorStart: optional starting cursor position (defaults to end of text)
 */
const CHALLENGES = [
  // --- Navigation shortcuts ---
  {
    id: 1,
    description: "Move the cursor to the beginning of the line and type 'sudo '",
    hint: "Ctrl+A moves to the beginning of the line",
    startText: "apt-get install vim",
    targetText: "sudo apt-get install vim",
    parKeypresses: 6,
    cursorStart: 19
  },
  {
    id: 2,
    description: "Move the cursor to the end of the line and add ' --verbose'",
    hint: "Ctrl+E moves to the end of the line",
    startText: "curl https://example.com",
    targetText: "curl https://example.com --verbose",
    parKeypresses: 11,
    cursorStart: 0
  },
  {
    id: 3,
    description: "Move back one word and fix the typo: change 'gti' to 'git'",
    hint: "Alt+B moves back one word",
    startText: "gti status",
    targetText: "git status",
    parKeypresses: 6,
    cursorStart: 10
  },
  {
    id: 4,
    description: "Move forward one word and add ' -la' after 'ls'",
    hint: "Alt+F moves forward one word",
    startText: "ls /home/user/documents",
    targetText: "ls -la /home/user/documents",
    parKeypresses: 6,
    cursorStart: 0
  },

  // --- Deletion shortcuts ---
  {
    id: 5,
    description: "Delete from the cursor to the end of the line",
    hint: "Ctrl+K kills from cursor to end of line",
    startText: "echo 'hello world' && rm -rf /",
    targetText: "echo 'hello world'",
    parKeypresses: 2,
    cursorStart: 19
  },
  {
    id: 6,
    description: "Delete from the cursor to the beginning of the line, then type 'ls'",
    hint: "Ctrl+U kills from cursor to beginning of line",
    startText: "cat /var/log/syslog",
    targetText: "ls",
    parKeypresses: 4,
    cursorStart: 19
  },
  {
    id: 7,
    description: "Delete the word behind the cursor and type 'projects'",
    hint: "Ctrl+W deletes the word before the cursor",
    startText: "cd /home/user/documents",
    targetText: "cd /home/user/projects",
    parKeypresses: 10,
    cursorStart: 23
  },
  {
    id: 8,
    description: "Delete the word after the cursor",
    hint: "Alt+D deletes the word after the cursor",
    startText: "git commit --amend --no-edit",
    targetText: "git commit --no-edit",
    parKeypresses: 4,
    cursorStart: 11
  },

  // --- Yank (paste) shortcut ---
  {
    id: 9,
    description: "Cut the last word and paste it at the end after a space",
    hint: "Ctrl+W cuts the word, Ctrl+E goes to end, Ctrl+Y pastes",
    startText: "grep -r pattern /var/log",
    targetText: "grep -r /var/log pattern",
    parKeypresses: 7,
    cursorStart: 18
  },

  // --- Transpose ---
  {
    id: 10,
    description: "Fix the transposed characters: 'sl' should be 'ls'",
    hint: "Ctrl+T transposes the two characters before the cursor",
    startText: "sl -la /tmp",
    targetText: "ls -la /tmp",
    parKeypresses: 3,
    cursorStart: 0
  },

  // --- Combined shortcuts ---
  {
    id: 11,
    description: "Go to the start and add 'sudo ' before the command",
    hint: "Ctrl+A then type 'sudo '",
    startText: "systemctl restart nginx",
    targetText: "sudo systemctl restart nginx",
    parKeypresses: 6,
    cursorStart: 23
  },
  {
    id: 12,
    description: "Delete everything and type 'history'",
    hint: "Ctrl+U deletes to start of line, then type the new command",
    startText: "find / -name '*.conf' -type f",
    targetText: "history",
    parKeypresses: 9,
    cursorStart: 29
  },
  {
    id: 13,
    description: "Delete the last argument and add '/etc/nginx'",
    hint: "Ctrl+W deletes the last word",
    startText: "cp nginx.conf /usr/local/etc",
    targetText: "cp nginx.conf /etc/nginx",
    parKeypresses: 11,
    cursorStart: 28
  },
  {
    id: 14,
    description: "Move to beginning, move forward one word, and delete the rest",
    hint: "Ctrl+A, Alt+F, Ctrl+K",
    startText: "python3 very_old_script.py --debug --verbose",
    targetText: "python3",
    parKeypresses: 3,
    cursorStart: 45
  },
  {
    id: 15,
    description: "Move to the end and add ' | grep error'",
    hint: "Ctrl+E moves to end of line",
    startText: "cat /var/log/syslog",
    targetText: "cat /var/log/syslog | grep error",
    parKeypresses: 15,
    cursorStart: 0
  },
  {
    id: 16,
    description: "Delete the word before cursor and type 'development'",
    hint: "Ctrl+W deletes the previous word",
    startText: "git checkout production",
    targetText: "git checkout development",
    parKeypresses: 12,
    cursorStart: 23
  },
  {
    id: 17,
    description: "Move to start, delete the first word, and type 'vim'",
    hint: "Ctrl+A, Alt+D, type 'vim'",
    startText: "nano /etc/hosts",
    targetText: "vim /etc/hosts",
    parKeypresses: 5,
    cursorStart: 15
  },
  {
    id: 18,
    description: "Fix the command by transposing characters at position 3",
    hint: "Navigate and use Ctrl+T to transpose",
    startText: "cta /etc/passwd",
    targetText: "cat /etc/passwd",
    parKeypresses: 3,
    cursorStart: 0
  },
  {
    id: 19,
    description: "Delete from cursor to end of line and type ' --help'",
    hint: "Ctrl+K then type ' --help'",
    startText: "docker run -it ubuntu bash",
    targetText: "docker run --help",
    parKeypresses: 8,
    cursorStart: 11
  },
  {
    id: 20,
    description: "Go to the beginning and change 'http' to 'https'",
    hint: "Ctrl+A then Alt+F to end of first word, then type 's'",
    startText: "curl http://example.com/api",
    targetText: "curl https://example.com/api",
    parKeypresses: 8,
    cursorStart: 27
  },
  {
    id: 21,
    description: "Delete everything after 'git' and type ' stash pop'",
    hint: "Navigate with Alt+F, then Ctrl+K",
    startText: "git rebase --interactive HEAD~3",
    targetText: "git stash pop",
    parKeypresses: 13,
    cursorStart: 0
  },
  {
    id: 22,
    description: "Move to end and append ' 2>&1'",
    hint: "Ctrl+E to go to end of line",
    startText: "make build",
    targetText: "make build 2>&1",
    parKeypresses: 7,
    cursorStart: 0
  },
  {
    id: 23,
    description: "Delete the last two words and type '*.txt'",
    hint: "Ctrl+W twice then type",
    startText: "find . -name important file",
    targetText: "find . -name *.txt",
    parKeypresses: 7,
    cursorStart: 27
  },
  {
    id: 24,
    description: "Move to beginning and add 'time ' before the command",
    hint: "Ctrl+A then type 'time '",
    startText: "npm run build",
    targetText: "time npm run build",
    parKeypresses: 6,
    cursorStart: 13
  },
  {
    id: 25,
    description: "Delete the current word forward and type 'HEAD'",
    hint: "Alt+D deletes word forward",
    startText: "git reset --soft origin/main",
    targetText: "git reset --soft HEAD",
    parKeypresses: 6,
    cursorStart: 17
  },
  {
    id: 26,
    description: "Cut everything before cursor and paste it at the end",
    hint: "Ctrl+U cuts to start, Ctrl+E goes to end, Ctrl+Y pastes",
    startText: "world hello",
    targetText: "hello world",
    parKeypresses: 5,
    cursorStart: 6
  },
  {
    id: 27,
    description: "Go to beginning, skip first word, delete rest, and type ' clone https://github.com/user/repo'",
    hint: "Ctrl+A, Alt+F, Ctrl+K, then type",
    startText: "git pull origin main --rebase",
    targetText: "git clone https://github.com/user/repo",
    parKeypresses: 38,
    cursorStart: 29
  },
  {
    id: 28,
    description: "Replace the file path: delete the last word and type '/tmp/output.log'",
    hint: "Ctrl+W to delete word, then type new path",
    startText: "tail -f /var/log/messages",
    targetText: "tail -f /tmp/output.log",
    parKeypresses: 16,
    cursorStart: 25
  },
  {
    id: 29,
    description: "Move to start and replace 'echo' with 'printf'",
    hint: "Ctrl+A, Alt+D, type 'printf'",
    startText: "echo 'Hello, World!'",
    targetText: "printf 'Hello, World!'",
    parKeypresses: 9,
    cursorStart: 21
  },
  {
    id: 30,
    description: "Delete everything and type 'exit'",
    hint: "Ctrl+U clears the line",
    startText: "ssh user@remote-server.example.com -p 2222",
    targetText: "exit",
    parKeypresses: 6,
    cursorStart: 43
  },
  {
    id: 31,
    description: "Add '-r ' after 'cp' by navigating to the right position",
    hint: "Ctrl+A, Alt+F to skip a word, then type",
    startText: "cp /source/dir /dest/dir",
    targetText: "cp -r /source/dir /dest/dir",
    parKeypresses: 6,
    cursorStart: 24
  },
  {
    id: 32,
    description: "Delete from cursor to end and type ' -9 nginx'",
    hint: "Ctrl+K kills to end of line",
    startText: "kill -TERM 12345",
    targetText: "kill -9 nginx",
    parKeypresses: 11,
    cursorStart: 5
  },
  {
    id: 33,
    description: "Go to end and pipe through 'wc -l'",
    hint: "Ctrl+E to move to end",
    startText: "find . -name '*.js'",
    targetText: "find . -name '*.js' | wc -l",
    parKeypresses: 10,
    cursorStart: 0
  },
  {
    id: 34,
    description: "Move to beginning and change 'mv' to 'cp'",
    hint: "Ctrl+A, Alt+D, type 'cp'",
    startText: "mv file.txt /backup/",
    targetText: "cp file.txt /backup/",
    parKeypresses: 4,
    cursorStart: 20
  },
  {
    id: 35,
    description: "Delete last word and type 'HEAD~1'",
    hint: "Ctrl+W deletes word before cursor",
    startText: "git diff main",
    targetText: "git diff HEAD~1",
    parKeypresses: 7,
    cursorStart: 13
  },
  {
    id: 36,
    description: "Delete everything after 'tar' and type ' -xzf archive.tar.gz'",
    hint: "Alt+F, Ctrl+K to delete rest of line",
    startText: "tar -cvf backup.tar /home/user",
    targetText: "tar -xzf archive.tar.gz",
    parKeypresses: 23,
    cursorStart: 0
  },
  {
    id: 37,
    description: "Add 'EDITOR=vim ' at the beginning of the line",
    hint: "Ctrl+A then type the prefix",
    startText: "crontab -e",
    targetText: "EDITOR=vim crontab -e",
    parKeypresses: 12,
    cursorStart: 10
  },
  {
    id: 38,
    description: "Delete the word forward and type 'test'",
    hint: "Alt+D to delete forward word, then type",
    startText: "npm run build:production",
    targetText: "npm run test",
    parKeypresses: 6,
    cursorStart: 8
  },
  {
    id: 39,
    description: "Move back one word and insert '--no-cache ' before it",
    hint: "Alt+B moves back one word",
    startText: "docker build .",
    targetText: "docker build --no-cache .",
    parKeypresses: 13,
    cursorStart: 14
  },
  {
    id: 40,
    description: "Go to beginning, skip two words, and delete the third word",
    hint: "Ctrl+A, Alt+F twice, Alt+D",
    startText: "git log --oneline --graph --all",
    targetText: "git log --graph --all",
    parKeypresses: 5,
    cursorStart: 31
  }
];

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHALLENGES };
}
