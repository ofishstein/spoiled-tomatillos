node {
	stage('Checkout') {
		checkout scm
	}

	def nodeImage
	def pgImage
	def id

	try {
		env.NODE_ENV = "jenkins"

		print "Node environment is: ${env.NODE_ENV}"

		pgImage = docker.image('postgres:alpine')
		pgImage.run('-e "POSTGRES_PASSWORD=cs4500team22"') { c ->
			id = c.id
			// Wait until postgres service is up (could be more graceful)
			sh 'sleep 15'
			nodeImage = docker.build("node-image")
			nodeImage.inside("--link ${id}:db") {
				stage('Build') {
	                sh 'java -version'
	                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source && npm run setup-dev-db'
	                sh 'cd spoiled-tomatillos-client/ && npm install'
				}

				stage('Test') {
					sh './jenkins-scripts/test.sh'
				}

				stage('Test Cleanup') {
					sh 'cd spoiled-tomatillos-server/ && npm run cleanup-dev-db'
				}

			    stage('SonarQube analysis') {
			        withSonarQubeEnv('SonarQube') {
		            	sh "cd spoiled-tomatillos-server/ && npm run sonar-scanner"
		            	sh "cd spoiled-tomatillos-client/ && npm run sonar-scanner"
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
			}
		}
	}
	finally {
    stage('Cleanup') {
        steps {
        	nodeContainer.stop
        	pgContainer.stop
            deleteDir()
        }
    }
	}
}