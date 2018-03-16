
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
                sh 'java -version'
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
        stage('SonarQube analysis') {
            steps{
                withSonarQubeEnv('SonarQube') {
                  sh "cd spoiled-tomatillos-server/ && npm run sonar-scanner"
                  sh "cd spoiled-tomatillos-client/ && npm run sonar-scanner"
                }
            }
        }
        stage('Quality') {
            steps {
                sh 'sleep 30'
                timeout(time: 10, unit: 'SECONDS')
                retry(5) {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate error ${qg.status}"
                        }
                    }

                }
            }
        }
        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }
}
