# TODO

- [x] run all servers in docker (too see logs in a single place)
- [x] add rabbitmq to the project
- [x] add supertest and configure it to test express
- [x] add db
- [ ] create a procedure supporting fallback scenario with transactions (cover it with tests)
- [ ] [LOW PRIORITY] add comamnd to start all the services in compose from scratch, with database reset and migrations run
- [ ] [LOW PRIORITY] run tests in CI

# Questions

- should consumer create queue too or just publisher?
- what if consumer and publisher create queue with same name but different options?
- how to test fallback scenario in real application? integration test is not possible but how to prove to the business it is really working?
