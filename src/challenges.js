export const CHALLENGES = [
  {
    start: "git commit -m \"fix typo in readme\"",
    target: "git commit -m \"fix typo in README\""
  },
  {
    start: "docker run --rm -it -p 3000:3000 node:20 bash",
    target: "docker run --rm -it -p 8080:3000 node:20 bash"
  },
  {
    start: "tar -czf backup.tar.gz ./project --exclude=node_modules",
    target: "tar -czf backup-project.tar.gz ./project --exclude=node_modules"
  },
  {
    start: "grep -R --line-number \"TODO\" src tests docs",
    target: "grep -R --line-number \"FIXME\" src tests docs"
  },
  {
    start: "rsync -av --delete ./build/ user@host:/var/www/site",
    target: "rsync -av --delete ./dist/ user@host:/var/www/site"
  },
  {
    start: "find . -type f -name \"*.log\" -mtime +7 -delete",
    target: "find . -type f -name \"*.tmp\" -mtime +7 -delete"
  },
  {
    start: "python -m http.server 8000 --bind 127.0.0.1",
    target: "python -m http.server 8080 --bind 127.0.0.1"
  },
  {
    start: "ssh -i ~/.ssh/id_ed25519 deploy@prod.example.com",
    target: "ssh -i ~/.ssh/id_rsa deploy@prod.example.com"
  },
  {
    start: "curl -H \"Authorization: Bearer TOKEN\" https://api.example.com/v1/users",
    target: "curl -H \"Authorization: Bearer TOKEN\" https://api.example.com/v1/projects"
  },
  {
    start: "npm run test -- --reporter verbose",
    target: "npm run test -- --reporter dot"
  },
  {
    start: "kubectl get pods -n production --sort-by=.metadata.creationTimestamp",
    target: "kubectl get pods -n staging --sort-by=.metadata.creationTimestamp"
  },
  {
    start: "ffmpeg -i input.mov -vf \"scale=1280:720\" output.mp4",
    target: "ffmpeg -i input.mov -vf \"scale=1920:1080\" output.mp4"
  },
  {
    start: "git log --oneline --decorate --graph --all",
    target: "git log --oneline --decorate --graph --max-count=20"
  },
  {
    start: "sed -n '1,120p' /etc/nginx/nginx.conf",
    target: "sed -n '1,160p' /etc/nginx/nginx.conf"
  },
  {
    start: "chmod -R 755 ./scripts && ./scripts/deploy.sh",
    target: "chmod -R 755 ./bin && ./bin/deploy.sh"
  },
  {
    start: "jq '.items[] | {name, id}' response.json",
    target: "jq '.data[] | {name, id}' response.json"
  },
  {
    start: "openssl req -new -newkey rsa:2048 -nodes -keyout key.pem -out csr.pem",
    target: "openssl req -new -newkey rsa:4096 -nodes -keyout key.pem -out csr.pem"
  },
  {
    start: "mysql -u root -p -e \"SHOW DATABASES;\"",
    target: "mysql -u admin -p -e \"SHOW DATABASES;\""
  },
  {
    start: "scp ./artifact.tar.gz user@staging:/tmp/",
    target: "scp ./artifact.tar.gz user@production:/tmp/"
  },
  {
    start: "aws s3 cp ./report.csv s3://team-reports/daily/",
    target: "aws s3 cp ./report.csv s3://team-reports/weekly/"
  }
]

export function pickChallenges(count = 5, random = Math.random) {
  const pool = [...CHALLENGES]
  const output = []
  while (output.length < count && pool.length > 0) {
    const index = Math.floor(random() * pool.length)
    output.push(pool.splice(index, 1)[0])
  }
  return output
}
