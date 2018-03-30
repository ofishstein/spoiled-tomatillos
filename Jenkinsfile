node {
	stage('Checkout') {
		checkout scm
	}

	try {
		env.NODE_ENV = "jenkins"

		print "Node environment is: ${env.NODE_ENV}"

		def pgImage = docker.image('postgres:alpine')
		pgImage.withRun('-e "POSTGRES_PASSWORD=cs4500team22"') { c ->
			def id = c.id
			// Wait until postgres service is up (could be more graceful)
			sh 'sleep 15'
			def nodeImage = docker.build("node-image")
			nodeImage.inside("--link ${id}:db") {
				stage('Build') {
	                sh 'java -version'
	                sh 'cd spoiled-tomatillos-server/ && npm install node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source'
	                sh 'cd spoiled-tomatillos-client/ && npm install'
				}

				stage('Test') {
					sh './jenkins-scripts/test.sh'
				}

			    stage('Server SonarQube analysis') {
			        withSonarQubeEnv('SonarQube') {
		            	sh "cd spoiled-tomatillos-server/ && npm run sonar-scanner"
		        	}
			    }
			}
		}
		stage('Server Quality') {
		    sh 'sleep 45'
		    retry(5) {
		        timeout(time: 15, unit: 'SECONDS') {
		            script {
		                def qg = waitForQualityGate()
		                if (qg.status != 'OK') {
		                    error "Pipeline aborted due to quality gate error ${qg.status}"
		                }
		            }
		        }
		    }
		}
		// TODO: Add client code quality check
	}
	finally {
	    stage('Cleanup') {
            deleteDir()
    	}
	}
}
