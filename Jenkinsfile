node {
	stage('Checkout') {
		checkout scm
	}

	stage('Build') {
		env.NODE_ENV = "jenkins"

		print "Node environment is: ${env.NODE_ENV}"

		docker.image('postgres:alpine').withRun('-e "POSTGRES_PASSWORD=cs4500team22"') { c ->
			docker.image('postgres:alpine').inside("--link ${c.id}:db") {
				// Wait until postgres service is up (could be more graceful)
				sh 'sleep 15'
			}
			def nodeImage = docker.build("node-image")
			nodeImage.inside("--link ${c.id}:db") {
                sh 'java -version'
                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source && npm run setup-dev-db'
                sh 'cd spoiled-tomatillos-client/ && npm install'
			}
		}
	}

	stage('Test') {
		nodeImage.inside("--link ${c.id}:db") {
			sh './jenkins-scripts/test.sh'
		}
	}

	stage('Test Cleanup') {
		nodeImage.inside("--link ${c.id}:db") {
			sh 'cd spoiled-tomatillos-server/ && npm run cleanup-dev-db'
		}
	}

    stage('SonarQube analysis') {
        steps{
			nodeImage.inside("--link ${c.id}:db") {
	            withSonarQubeEnv('SonarQube') {
	              sh "cd spoiled-tomatillos-server/ && npm run sonar-scanner"
	              sh "cd spoiled-tomatillos-client/ && npm run sonar-scanner"
	            }
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