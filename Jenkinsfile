pipeline{
    agent {
        label 'Slave_Induccion'
    }
    
    options {
		buildDiscarder(logRotator(numToKeepStr: '5')) 
		disableConcurrentBuilds() 
	}

    stages{
        stage('Checkout') {
            steps{
                echo "------------>Checkout<------------"
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: '*/master']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [], 
                    gitTool: 'Default', 
                    submoduleCfg: [], 
                    userRemoteConfigs: [[
                        credentialsId: 'GitHub_wllamasr', 
                        url:'https://github.com/wllamasr/nest-rent-api'
                    ]]
                ])

            }
        }
            
        stage('Install'){
            steps{
                echo '========executing Installation========'
                sh 'npm install'
            }
        }

         stage('Tests'){
            steps{
                echo '==========executing tests========'
                sh 'npm run test'
                echo '==========executing e2e tests========'
                sh 'npm run test:e2e'
            }
        } 
    }

    post{
        success{
            echo '========pipeline executed successfully ========'
        }
        failure{
            mail (to: 'wilmer.llamas@ceiba.com.co',
			      subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
			      body: "Something is wrong with ${env.BUILD_URL}")
        }
    }
}