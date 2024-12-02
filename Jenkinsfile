pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    environment {
        FRONTEND_IMAGE = 'technologia-cyborga-frontend:latest'
        BACKEND_IMAGE = 'technologia-cyborga-backend:latest'
    }

    stages{
        stage('Download main') {
            steps {
                git url: 'https://github.com/wiktormalyska/technologia-cyborga',
                    branch: 'master'
            }
        }


        stage('Verify Workspace') {
            steps {
                sh 'tree'
            }
        }


        stage('Build backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
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

    post {
        always {
            script {
                sh 'docker-compose logs'
            }
        }
    }
}