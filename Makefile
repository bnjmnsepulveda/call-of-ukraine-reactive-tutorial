

start-server:
	nvm use 17
	npm run start

create-service:
	ng generate service --skip-tests=true $(p)

create-component:
	ng generate component --skip-tests=true $(p)

create-entity-state:
	ng generate entity-store core/store/$(n)/$(n)
	ng generate entity-query core/store/$(n)/$(n)
	ng generate service --skip-tests=true core/store/service/$(n)-state
