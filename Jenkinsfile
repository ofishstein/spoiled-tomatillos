node {
	stage('Checkout') {
		checkout scm
	}

	def nodeImage
	def pgImage
	def id

	stage('Build') {
		env.NODE_ENV = "jenkins"

		print "Node environment is: ${env.NODE_ENV}"

		pgImage = docker.image('postgres:alpine')
		pgImage.withRun('-e "POSTGRES_PASSWORD=cs4500team22"') { c ->
			id = c.id
			docker.image('postgres:alpine').inside("--link ${id}:db") {
				// Wait until postgres service is up (could be more graceful)
				sh 'sleep 15'
			}
			nodeImage = docker.build("node-image")
			nodeImage.inside("--link ${id}:db") {
                sh 'java -version'
                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source && npm run setup-dev-db'
                sh 'cd spoiled-tomatillos-client/ && npm install'
			}
		}
	}

	stage('Test') {
		nodeImage.inside("--link ${id}:db") {
			sh './jenkins-scripts/test.sh'
		}
	}

	stage('Test Cleanup') {
		nodeImage.inside("--link ${id}:db") {
			sh 'cd spoiled-tomatillos-server/ && npm run cleanup-dev-db'
		}
	}

    stage('SonarQube analysis') {
        steps{
			nodeImage.inside("--link ${id}:db") {
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