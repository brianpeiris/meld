echo running tsc
npx tsc src/*.ts -m ESNext -w &

echo running rollup
npx rollup src/index.js --format iife --file bundle.js -c -w &

echo running bs
browser-sync -c .browser-sync.config.js &

trap 'trap - SIGTERM && kill 0' SIGTERM EXIT
wait
