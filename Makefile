build:
	cd editor && npm install
	cd utils/t2dutils/integrated/t2dutils/	&&	npm install
	sudo chown root:root utils/t2dutils/integrated/t2dutils/node_modules/electron/dist/chrome-sandbox
	sudo chmod 4755 utils/t2dutils/integrated/t2dutils/node_modules/electron/dist/chrome-sandbox
start:
	cd editor && npm run start &
	cd utils/t2dutils/integrated/t2dutils/	&&	npm run start
clean:
	kill -9 $(shell lsof -t -i :7153)
