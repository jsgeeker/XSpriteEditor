install:
	@npm install
server: install
	@./node_modules/startserver/bin/startserver
