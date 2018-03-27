
// init jenkinsfile
pipeline {
    agent {
        dockerfile {
            args '-p 3000:3000 -e POSTGRES_PASSWORD=cs4500team22' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh """pg_ctl -D "$PGDATA" -o "-c listen_addresses='localhost'" -w start"""
                sh 'java -version'
                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source && npm run setup-dev-db && npm start'
                sh 'cd spoiled-tomatillos-client/ && npm install && npm start'
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
                timeout(time: 10, unit: 'SECONDS') {
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
        }
        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }
    }
}
