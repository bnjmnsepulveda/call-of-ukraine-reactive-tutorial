

start-server:
	nvm use 17
	npm run start

create-service:
	ng generate service --skip-tests=true $(p)

create-component:
	ng generate component --skip-tests=true $(p)
