npx tsc *.ts -m ESNext -w
npx rollup index.js --format iife --file bundle.js -c -w
browser-sync -c .browser-sync.config.js
