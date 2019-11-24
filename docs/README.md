# Microservices

The problems of microservice architecture:

1. Communication
2. Authorization
3. Continous delivery
4. How to setup it fast in development (I guess package everything in docker containers)
5. Microservice detection

## Make an order flow:

1. Create an order
2. Kitchen cook for an order
3. When kitchen finished cooking - send order to delivery
4. When delivery is finished - mark order as RESOLVED
