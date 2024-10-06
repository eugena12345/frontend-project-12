lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npm start

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf my-frontend/build
	npm run build