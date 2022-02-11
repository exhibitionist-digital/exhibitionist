config = --allow-net --allow-read --allow-run --allow-env --allow-write --no-check --import-map importmap.json --unstable

dev:
	make cache && mode=dev deno run $(config) server.js

start:
	deno run $(config) server.js

cache:
	deno cache --import-map=importmap.json --reload --no-check server.js

build-cache:
	deno cache --import-map=importmap.json --reload --no-check build.js

build:
	deno run $(config) build.js