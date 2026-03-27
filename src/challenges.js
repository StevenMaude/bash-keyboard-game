const STAGE_DEFINITIONS = [
  {
    id: 'cursor-basics',
    title: 'Stage 1 · Cursor basics',
    objective: 'Practice Ctrl+A / Ctrl+E and short cursor hops.',
    exercises: [
      { start: 'echo learning bash shortcuts', target: 'echo learning bash keyboard shortcuts', hint: 'Jump to end with Ctrl+E to append words.' },
      { start: 'git status --short', target: 'git status --short --branch', hint: 'Use Ctrl+E to append a new option.' },
      { start: 'ls -lah /var/log', target: 'ls -lah /var/log/nginx', hint: 'Move to end quickly, then add path segment.' },
      { start: 'cat README.md', target: 'cat ./README.md', hint: 'Jump to command start with Ctrl+A for quick prefix insert.' },
      { start: 'pwd && whoami', target: 'pwd && id -un', hint: 'Use Ctrl+A/Ctrl+E to bounce between start and end edits.' },
      { start: 'head -n 10 server.log', target: 'head -n 25 server.log', hint: 'Small in-line numeric replacement.' },
      { start: 'tail -n 20 app.log', target: 'tail -n 50 app.log', hint: 'Navigate and replace efficiently.' },
      { start: 'mkdir backups', target: 'mkdir -p backups', hint: 'Insert option after command name.' },
      { start: 'touch notes.txt', target: 'touch notes.md', hint: 'Move and replace extension.' },
      { start: 'python -V', target: 'python3 -V', hint: 'Prefix insert before version flag.' },
      { start: 'cp config.yml config.bak', target: 'cp config.yaml config.bak', hint: 'Fix extension in first argument.' },
      { start: 'man grep', target: 'man sed', hint: 'Short command-word replacement.' },
      { start: 'which node', target: 'which npm', hint: 'Word swap at command tail.' },
      { start: 'echo $PATH', target: 'echo $HOME', hint: 'Variable replacement practice.' }
    ]
  },
  {
    id: 'word-jumps',
    title: 'Stage 2 · Word jumps',
    objective: 'Use Alt+B / Alt+F to jump by words.',
    exercises: [
      { start: 'git commit -m "fix typo in docs"', target: 'git commit -m "fix typo in README"', hint: 'Word-jump to typo target quickly.' },
      { start: 'docker run --rm -it alpine sh', target: 'docker run --rm -it ubuntu bash', hint: 'Swap image and shell names by word.' },
      { start: 'find src -name "*.js"', target: 'find src -name "*.ts"', hint: 'Jump to extension and replace.' },
      { start: 'npm run test -- --watch', target: 'npm run test -- --runInBand', hint: 'Move word-wise through grouped args.' },
      { start: 'kubectl get pods -n default', target: 'kubectl get pods -n staging', hint: 'Jump to namespace value.' },
      { start: 'rsync -av ./dist user@host:/srv/site', target: 'rsync -av ./build user@host:/srv/site', hint: 'Word-jump to source directory.' },
      { start: 'ssh deploy@staging.example.com', target: 'ssh deploy@prod.example.com', hint: 'Replace host segment.' },
      { start: 'curl -X GET https://api.example.com/v1/users', target: 'curl -X GET https://api.example.com/v1/projects', hint: 'Jump to trailing resource path.' },
      { start: 'tar -czf backup.tar.gz ./src', target: 'tar -czf backup.tar.gz ./dist', hint: 'Word jump into final arg.' },
      { start: 'grep -R "TODO" src tests', target: 'grep -R "FIXME" src tests', hint: 'Replace first quoted word.' },
      { start: 'node scripts/build.js --env dev', target: 'node scripts/build.js --env prod', hint: 'Jump to env value.' },
      { start: 'python -m http.server 8000', target: 'python -m http.server 9000', hint: 'Word-jump to port number.' },
      { start: 'jq ".items[]" data.json', target: 'jq ".data[]" data.json', hint: 'Swap object key.' },
      { start: 'mysql -u root -p', target: 'mysql -u admin -p', hint: 'Change login user quickly.' }
    ]
  },
  {
    id: 'line-control',
    title: 'Stage 3 · Line control',
    objective: 'Practice Ctrl+U and Ctrl+K for fast line slicing.',
    exercises: [
      { start: 'sudo systemctl restart nginx', target: 'sudo systemctl restart redis', hint: 'Kill tail with Ctrl+K from service name.' },
      { start: 'sudo apt install ripgrep', target: 'sudo apt install fd-find', hint: 'Cut and replace trailing package.' },
      { start: 'git checkout feature/old-name', target: 'git checkout feature/new-name', hint: 'Kill end part and rewrite branch suffix.' },
      { start: 'aws s3 cp report.csv s3://team/daily/', target: 'aws s3 cp report.csv s3://team/weekly/', hint: 'Trim and rewrite final path component.' },
      { start: 'chmod -R 755 scripts', target: 'chmod -R 755 bin', hint: 'Tail replacement with minimal moves.' },
      { start: 'sed -n "1,120p" /etc/nginx/nginx.conf', target: 'sed -n "1,200p" /etc/nginx/nginx.conf', hint: 'Replace numeric range quickly.' },
      { start: 'ffmpeg -i in.mov -vf "scale=1280:720" out.mp4', target: 'ffmpeg -i in.mov -vf "scale=1920:1080" out.mp4', hint: 'Use kill and retype for full value swap.' },
      { start: 'git log --oneline --decorate', target: 'git log --oneline --decorate --graph', hint: 'Append flag at line end efficiently.' },
      { start: 'echo "temporary debug output"', target: 'echo "production startup output"', hint: 'Kill/rewrite quoted text.' },
      { start: 'pnpm add eslint', target: 'pnpm add prettier', hint: 'Swap package name with a tail kill.' },
      { start: 'cargo build --release', target: 'cargo test --release', hint: 'Change action word quickly.' },
      { start: 'go test ./...', target: 'go test ./... -race', hint: 'Append trailing option cleanly.' },
      { start: 'terraform plan -var-file=dev.tfvars', target: 'terraform plan -var-file=prod.tfvars', hint: 'Replace env value in arg.' },
      { start: 'helm upgrade api ./chart -n dev', target: 'helm upgrade api ./chart -n prod', hint: 'Namespace tail replacement.' }
    ]
  },
  {
    id: 'word-kill',
    title: 'Stage 4 · Word killing',
    objective: 'Use Ctrl+W repeatedly to remove prior words.',
    exercises: [
      { start: 'npm run lint -- --cache', target: 'npm run test -- --cache', hint: 'Delete backward one word then type replacement.' },
      { start: 'git push origin feature/login-form', target: 'git push origin feature/auth-form', hint: 'Ctrl+W near branch tail can help.' },
      { start: 'scp build.tar.gz user@staging:/tmp/', target: 'scp build.tar.gz user@prod:/tmp/', hint: 'Delete backward host segment quickly.' },
      { start: 'rsync -av --delete ./build/ user@host:/var/www/', target: 'rsync -av --delete ./dist/ user@host:/var/www/', hint: 'Remove one word and replace source path.' },
      { start: 'docker compose up api db', target: 'docker compose up api redis', hint: 'Swap final service with backward kill.' },
      { start: 'kubectl logs deployment/api -n staging', target: 'kubectl logs deployment/api -n production', hint: 'Change namespace by trimming last word.' },
      { start: 'npx vitest run src', target: 'npx vitest run tests', hint: 'Tail word swap.' },
      { start: 'poetry add requests', target: 'poetry add httpx', hint: 'Replace dependency word.' },
      { start: 'brew install postgresql', target: 'brew install mysql', hint: 'Delete previous word and type new package.' },
      { start: 'ansible-playbook site.yml -i hosts.dev', target: 'ansible-playbook site.yml -i hosts.prod', hint: 'Backward delete env suffix.' },
      { start: 'php artisan migrate --seed', target: 'php artisan migrate --force', hint: 'Swap final option.' },
      { start: 'gradle test --info', target: 'gradle build --info', hint: 'Replace action word near command start.' },
      { start: 'make deploy ENV=dev', target: 'make deploy ENV=prod', hint: 'Replace env assignment value.' },
      { start: 'pytest tests/unit -q', target: 'pytest tests/integration -q', hint: 'Change middle path word quickly.' }
    ]
  },
  {
    id: 'mixed-navigation',
    title: 'Stage 5 · Mixed navigation',
    objective: 'Combine character and word movement with edits.',
    exercises: [
      { start: 'git rebase origin/main', target: 'git rebase origin/develop', hint: 'Mix word jump and tail editing.' },
      { start: 'docker build -t app:dev .', target: 'docker build -t app:prod .', hint: 'Replace tag value in middle.' },
      { start: 'pnpm run build --filter web', target: 'pnpm run build --filter api', hint: 'Jump to filter value and replace.' },
      { start: 'curl -H "Accept: application/json" /health', target: 'curl -H "Accept: text/plain" /health', hint: 'Edit quoted MIME type.' },
      { start: 'openssl genrsa -out key.pem 2048', target: 'openssl genrsa -out key.pem 4096', hint: 'Change final numeric arg.' },
      { start: 'terraform workspace select dev', target: 'terraform workspace select prod', hint: 'Navigate to trailing env word.' },
      { start: 'npm config set registry https://registry.npmjs.org/', target: 'npm config set registry https://registry.npmjs.org', hint: 'Remove trailing slash efficiently.' },
      { start: 'git grep "console.log" src', target: 'git grep "console.error" src', hint: 'Tight replacement inside quotes.' },
      { start: 'python manage.py runserver 0.0.0.0:8000', target: 'python manage.py runserver 127.0.0.1:8000', hint: 'Swap host portion only.' },
      { start: 'node --inspect server.js', target: 'node --inspect-brk server.js', hint: 'Insert modifier into flag.' },
      { start: 'uvicorn app.main:app --reload --port 8000', target: 'uvicorn app.main:app --reload --port 9000', hint: 'Navigate by words to final number.' },
      { start: 'bundle exec rspec spec/models', target: 'bundle exec rspec spec/requests', hint: 'Replace final path token.' },
      { start: 'deno test --allow-read', target: 'deno test --allow-all', hint: 'Flag replacement practice.' },
      { start: 'az group create -n rg-dev -l westeurope', target: 'az group create -n rg-prod -l westeurope', hint: 'Change name token in middle.' }
    ]
  },
  {
    id: 'expert-drills',
    title: 'Stage 6 · Expert drills',
    objective: 'Long realistic commands for full shortcut fluency.',
    exercises: [
      { start: 'kubectl get pods -n production --sort-by=.metadata.creationTimestamp', target: 'kubectl get pods -n staging --sort-by=.metadata.creationTimestamp', hint: 'Long command namespace replacement.' },
      { start: 'docker run --rm -it -p 3000:3000 -e NODE_ENV=development node:20 bash', target: 'docker run --rm -it -p 8080:3000 -e NODE_ENV=production node:20 bash', hint: 'Edit multiple values with jumps and kills.' },
      { start: 'find . -type f -name "*.log" -mtime +7 -print0 | xargs -0 rm -f', target: 'find . -type f -name "*.tmp" -mtime +14 -print0 | xargs -0 rm -f', hint: 'Two independent edits in long pipeline.' },
      { start: 'git log --oneline --decorate --graph --all --since="2 weeks ago"', target: 'git log --oneline --decorate --graph --all --since="1 week ago"', hint: 'Precise quote text replacement.' },
      { start: 'aws s3 sync ./dist s3://my-bucket/site --delete --cache-control "max-age=300"', target: 'aws s3 sync ./dist s3://my-bucket/site --delete --cache-control "max-age=600"', hint: 'Deep tail edit inside quoted flag value.' },
      { start: 'ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=no deploy@prod.example.com', target: 'ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no deploy@prod.example.com', hint: 'Swap key file in long argument list.' },
      { start: 'ffmpeg -i input.mov -vf "scale=1280:720,fps=30" -c:v libx264 output.mp4', target: 'ffmpeg -i input.mov -vf "scale=1920:1080,fps=60" -c:v libx264 output.mp4', hint: 'Complex quoted filter argument replacement.' },
      { start: 'rsync -avz --delete --exclude=node_modules --exclude=.git ./ user@host:/var/www/app', target: 'rsync -avz --delete --exclude=node_modules --exclude=.git ./ user@host:/srv/www/app', hint: 'Single deep path segment update.' },
      { start: 'curl -H "Authorization: Bearer TOKEN" -H "Accept: application/json" https://api.example.com/v1/users?limit=50', target: 'curl -H "Authorization: Bearer TOKEN" -H "Accept: application/json" https://api.example.com/v1/projects?limit=100', hint: 'Resource and query edits in one line.' },
      { start: 'sed -n "1,120p" /etc/nginx/sites-enabled/default | grep -n "server_name"', target: 'sed -n "1,220p" /etc/nginx/sites-enabled/default | grep -n "server_name"', hint: 'Range value update in piped command.' },
      { start: 'openssl req -new -newkey rsa:2048 -nodes -keyout key.pem -out csr.pem -subj "/CN=dev.local"', target: 'openssl req -new -newkey rsa:4096 -nodes -keyout key.pem -out csr.pem -subj "/CN=prod.local"', hint: 'Two edits in long cryptography command.' },
      { start: 'python -m http.server 8000 --bind 127.0.0.1 --directory ./public', target: 'python -m http.server 8080 --bind 0.0.0.0 --directory ./dist', hint: 'Three-value update with careful navigation.' },
      { start: 'jq ".items[] | {name, id, status}" response.json > filtered.json', target: 'jq ".data[] | {name, id, status}" response.json > filtered.json', hint: 'Replace JSON root key in quoted filter.' },
      { start: 'npm run test -- --reporter verbose --coverage --runInBand', target: 'npm run test -- --reporter dot --coverage --runInBand', hint: 'Targeted reporter value swap in long args.' }
    ]
  }
]

function shuffle(items, random) {
  const list = [...items]
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export const LEARNING_PATH = STAGE_DEFINITIONS.map((stage, stageIndex) => ({
  ...stage,
  stageIndex,
  challenges: stage.exercises.map((exercise, exerciseIndex) => ({
    ...exercise,
    stageId: stage.id,
    stageTitle: stage.title,
    objective: stage.objective,
    stageIndex,
    step: exerciseIndex + 1
  }))
}))

export const CHALLENGES = LEARNING_PATH.flatMap((stage) => stage.challenges)

export function pickChallenges(count = 12, random = Math.random) {
  const perStagePools = LEARNING_PATH.map((stage) => ({
    stageIndex: stage.stageIndex,
    pool: shuffle(stage.challenges, random)
  }))

  const selected = []
  for (const stage of perStagePools) {
    if (selected.length >= count) {
      break
    }
    if (stage.pool.length > 0) {
      selected.push(stage.pool.pop())
    }
  }

  const fillerPool = shuffle(
    perStagePools.flatMap((stage) => stage.pool),
    random
  )

  while (selected.length < count && fillerPool.length > 0) {
    selected.push(fillerPool.pop())
  }

  return selected.sort((a, b) => a.stageIndex - b.stageIndex || a.step - b.step)
}
