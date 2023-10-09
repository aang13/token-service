# GENERATOR SERVICE

Spring Boot Application for Creating Token

## Technologies
 - Spring Boot 3.1.4
 - JDK 17+
 - Maven 3+

## To Build the App:
```shell
mvn clean install
```

## To Run the App:
```shell
mvn spring-boot:run
```
The App will run on `port:8001`

## Create a Token generation request:
```shell
curl --location 'http://localhost:8001/generate' \
--header 'Content-Type: application/json' \
--data '{
    "numberList": [1,2,3,4,6,7,8,9]
}'
```