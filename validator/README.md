# VALIDATOR SERVICE

Spring Boot Application for Validating Token

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
The App will run on `port:8002`

## Create a Token validation request:
```shell
curl --location 'http://localhost:8002/validator?token=5425-2334-3010-9903'
```

## Run Tests:
```shell
mvn test
```