(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{start:`git commit -m "fix typo in readme"`,target:`git commit -m "fix typo in README"`},{start:`docker run --rm -it -p 3000:3000 node:20 bash`,target:`docker run --rm -it -p 8080:3000 node:20 bash`},{start:`tar -czf backup.tar.gz ./project --exclude=node_modules`,target:`tar -czf backup-project.tar.gz ./project --exclude=node_modules`},{start:`grep -R --line-number "TODO" src tests docs`,target:`grep -R --line-number "FIXME" src tests docs`},{start:`rsync -av --delete ./build/ user@host:/var/www/site`,target:`rsync -av --delete ./dist/ user@host:/var/www/site`},{start:`find . -type f -name "*.log" -mtime +7 -delete`,target:`find . -type f -name "*.tmp" -mtime +7 -delete`},{start:`python -m http.server 8000 --bind 127.0.0.1`,target:`python -m http.server 8080 --bind 127.0.0.1`},{start:`ssh -i ~/.ssh/id_ed25519 deploy@prod.example.com`,target:`ssh -i ~/.ssh/id_rsa deploy@prod.example.com`},{start:`curl -H "Authorization: Bearer TOKEN" https://api.example.com/v1/users`,target:`curl -H "Authorization: Bearer TOKEN" https://api.example.com/v1/projects`},{start:`npm run test -- --reporter verbose`,target:`npm run test -- --reporter dot`},{start:`kubectl get pods -n production --sort-by=.metadata.creationTimestamp`,target:`kubectl get pods -n staging --sort-by=.metadata.creationTimestamp`},{start:`ffmpeg -i input.mov -vf "scale=1280:720" output.mp4`,target:`ffmpeg -i input.mov -vf "scale=1920:1080" output.mp4`},{start:`git log --oneline --decorate --graph --all`,target:`git log --oneline --decorate --graph --max-count=20`},{start:`sed -n '1,120p' /etc/nginx/nginx.conf`,target:`sed -n '1,160p' /etc/nginx/nginx.conf`},{start:`chmod -R 755 ./scripts && ./scripts/deploy.sh`,target:`chmod -R 755 ./bin && ./bin/deploy.sh`},{start:`jq '.items[] | {name, id}' response.json`,target:`jq '.data[] | {name, id}' response.json`},{start:`openssl req -new -newkey rsa:2048 -nodes -keyout key.pem -out csr.pem`,target:`openssl req -new -newkey rsa:4096 -nodes -keyout key.pem -out csr.pem`},{start:`mysql -u root -p -e "SHOW DATABASES;"`,target:`mysql -u admin -p -e "SHOW DATABASES;"`},{start:`scp ./artifact.tar.gz user@staging:/tmp/`,target:`scp ./artifact.tar.gz user@production:/tmp/`},{start:`aws s3 cp ./report.csv s3://team-reports/daily/`,target:`aws s3 cp ./report.csv s3://team-reports/weekly/`}];function t(t=5,n=Math.random){let r=[...e],i=[];for(;i.length<t&&r.length>0;){let e=Math.floor(n()*r.length);i.push(r.splice(e,1)[0])}return i}function n(e=Math.random){return{rounds:t(5,e).map(e=>({...e,baseline:e.start.length})),currentRound:0,keypresses:0,finished:!1,bestTotal:null}}function r(e){e.finished||(e.keypresses+=1)}function i(e,t){if(e.finished)return{matched:!1,finished:!0};let n=e.rounds[e.currentRound];return n?t===n.target?(e.currentRound+=1,e.currentRound>=e.rounds.length?(e.finished=!0,(e.bestTotal===null||e.keypresses<e.bestTotal)&&(e.bestTotal=e.keypresses),{matched:!0,finished:!0}):{matched:!0,finished:!1}):{matched:!1,finished:!1}:(e.finished=!0,{matched:!1,finished:!0})}function a(e){return Math.round(e.currentRound/e.rounds.length*100)}function o(e){return e.rounds.reduce((e,t)=>e+t.baseline,0)}function s(e){return e!==` `&&e!==`	`&&e!==`
`}function c(e,t){let n=t;for(;n>0&&!s(e[n-1]);)--n;for(;n>0&&s(e[n-1]);)--n;return n}function l(e,t){let n=t;for(;n<e.length&&!s(e[n]);)n+=1;for(;n<e.length&&s(e[n]);)n+=1;return n}function u({value:e,selectionStart:t,selectionEnd:n,key:r,ctrlKey:i,altKey:a,metaKey:o}){if(o)return null;let s=t,u=n,d=e;if(i&&!a){switch(r.toLowerCase()){case`a`:s=0,u=0;break;case`e`:s=e.length,u=e.length;break;case`b`:s=Math.max(0,t-1),u=s;break;case`f`:s=Math.min(e.length,n+1),u=s;break;case`u`:d=e.slice(n),s=0,u=0;break;case`k`:d=e.slice(0,t),s=t,u=t;break;case`w`:{let r=c(e,t),i=e.slice(0,r),a=e.slice(n);/\s$/.test(i)&&/^\s/.test(a)&&(a=a.replace(/^\s+/,``)),d=i+a,s=r,u=r;break}default:return null}return{value:d,selectionStart:s,selectionEnd:u}}if(a&&!i){switch(r.toLowerCase()){case`b`:s=c(e,t),u=s;break;case`f`:s=l(e,n),u=s;break;default:return null}return{value:d,selectionStart:s,selectionEnd:u}}return null}var d=document.querySelector(`#app`);d.innerHTML=`
  <main class="game-shell">
    <header class="top">
      <h1>Bash Keyboard Edit Trainer</h1>
      <p>Edit each command from <strong>Start</strong> to <strong>Target</strong> using bash shortcuts.</p>
      <small class="hint">Readline-like keys: Ctrl+A/E/B/F/U/K/W and Alt+B/F</small>
    </header>

    <section class="status-grid">
      <article><span>Round</span><strong id="round">1 / 5</strong></article>
      <article><span>Keypresses</span><strong id="keypresses">0</strong></article>
      <article><span>Target Max</span><strong id="target-budget">0</strong></article>
      <article><span>Best Score</span><strong id="best">—</strong></article>
    </section>

    <section class="progress-wrap">
      <label for="progress">Progress</label>
      <progress id="progress" max="100" value="0">0%</progress>
    </section>

    <section class="card">
      <h2>Start</h2>
      <pre id="start"></pre>
    </section>

    <section class="card">
      <h2>Target</h2>
      <pre id="target"></pre>
    </section>

    <section class="card">
      <h2>Your edit</h2>
      <textarea id="editor" rows="3" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
      <div class="button-row">
        <button id="check" type="button">Check</button>
        <button id="restart" type="button">Try again from start</button>
      </div>
      <p id="message" aria-live="polite"></p>
    </section>
  </main>
`;var f=document.querySelector(`#round`),p=document.querySelector(`#keypresses`),m=document.querySelector(`#target-budget`),h=document.querySelector(`#best`),g=document.querySelector(`#progress`),_=document.querySelector(`#start`),v=document.querySelector(`#target`),y=document.querySelector(`#editor`),b=document.querySelector(`#check`),x=document.querySelector(`#restart`),S=document.querySelector(`#message`),C=n();function w(){let e=C.rounds[C.currentRound];if(p.textContent=String(C.keypresses),m.textContent=String(o(C)),h.textContent=C.bestTotal===null?`—`:String(C.bestTotal),g.value=a(C),!e){f.textContent=`${C.rounds.length} / ${C.rounds.length}`,_.textContent=`Finished!`,v.textContent=`Finished!`,y.disabled=!0,b.disabled=!0;return}f.textContent=`${C.currentRound+1} / ${C.rounds.length}`,_.textContent=e.start,v.textContent=e.target,y.value=e.start,y.disabled=!1,b.disabled=!1,y.focus()}y.addEventListener(`keydown`,e=>{let t=u({value:y.value,selectionStart:y.selectionStart??0,selectionEnd:y.selectionEnd??0,key:e.key,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey});if(t){e.preventDefault(),r(C),y.value=t.value,y.setSelectionRange(t.selectionStart,t.selectionEnd),p.textContent=String(C.keypresses);return}[`Shift`,`Control`,`Alt`,`Meta`,`CapsLock`,`Tab`].includes(e.key)||(r(C),p.textContent=String(C.keypresses))}),b.addEventListener(`click`,()=>{let e=i(C,y.value);if(!e.matched){S.textContent=`Not yet. Keep editing until it exactly matches the target.`;return}e.finished?S.textContent=`Great run! Total keypresses: ${C.keypresses}.`:S.textContent=`Nice! Next round loaded.`,w()}),x.addEventListener(`click`,()=>{let e=C.bestTotal;C=n(),C.bestTotal=e,S.textContent=`Restarted from round 1 with a fresh challenge set.`,w()}),w();