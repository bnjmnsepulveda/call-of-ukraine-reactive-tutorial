

start-server:
	nvm use 17
	npm run start

create-service:
	ng generate service --skip-tests=true $(p)

create-component:
	ng generate component --skip-tests=true $(p)

create-flat-component:
	 ng generate component --skip-tests --inline-template --inline-style $(p)

create-entity-state:
	ng generate entity-store core/store/$(n)/$(n)
	ng generate entity-query core/store/$(n)/$(n)
	ng generate service --skip-tests=true core/store/service/$(n)-state

test-screen:
	node_modules/.bin/jest src/app/presentation/pages/game/component/ghost-of-kiev/model/Square.spec.ts