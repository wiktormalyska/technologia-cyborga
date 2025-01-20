# 1. Pobranie obrazu bazowego Gradle z JDK 21
FROM gradle:8.10.2-jdk21 AS build

# 2. Skopiowanie plików projektu
WORKDIR /app
COPY . /app

# 3. Budowanie aplikacji za pomocą Gradle
#RUN gradle build --no-daemon
RUN gradle build --no-daemon -x test #no tests

# 4. Tworzenie finalnego obrazu z JDK 21 i uruchomienie aplikacji
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/app.jar

# 5. Uruchamianie aplikacji
CMD ["java", "-jar", "/app/app.jar", "--debug"]