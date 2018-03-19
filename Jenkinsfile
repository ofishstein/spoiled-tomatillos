
// init jenkinsfile
pipeline {
    agent {
        docker {
            image 'node:8.10-alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'apk --no-cache add --virtual builds-deps build-base python make gcc g++'
            	sh 'ls'
                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source'
                sh 'cd spoiled-tomatillos-client/ && npm install'
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
