pipeline {
    agent any
    environment {
        FRONTEND_IMAGE = 'technologia-cyborga-frontend:latest'
        BACKEND_IMAGE = 'technologia-cyborga-backend:latest'
    }

    stages {
        stage('Input .env to backend') {
            steps {
                withCredentials([file(credentialsId: 'technologia-cyborga-backend-.env', variable: 'BACKEND_ENV_FILE')]) {
                    sh 'chmod -R u+rwX backend'
                    sh 'cp "$BACKEND_ENV_FILE" backend/src/main/resources/.env'
                    sh 'chmod 644 backend/src/main/resources/.env'
                }
            }
        }

        stage('Verify Workspace') {
            steps {
                sh 'tree -a'
            }
        }

        stage('Build backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t "$BACKEND_IMAGE" .'
                }
            }
        }

        stage('Build frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t "$FRONTEND_IMAGE" .'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
