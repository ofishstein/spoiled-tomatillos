
// init jenkinsfile
pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'apk --no-cache add --virtual builds-deps build-base python'
            	sh 'ls'
                sh 'cd spoiled-tomatillos-server/ && npm install && npm rebuild bcrypt --build-from-source'
            }
        }
        stage('Test') { 
            steps {
                sh './jenkins-scripts/test.sh' 
            }
        }
        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }
}
