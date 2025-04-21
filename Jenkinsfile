pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  tools {
    nodejs 'Node_23' // Make sure this name matches Jenkins NodeJS config
  }

  options {
    skipStagesAfterUnstable()
  }

  stages {
    stage('Checkout Code') {
      steps {
        git credentialsId: 'github-token', // Update with your Jenkins GitHub credential ID
            url: 'https://github.com/pcsaini/provibe-monorepo.git', // Update with your actual repository URL
            branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install -g pnpm@latest'
        sh 'rm -rf node_modules && pnpm install' // clean install
      }
    }

    stage('Lint') {
      steps {
        sh 'pnpm lint'
      }
    }

    stage('Build Projects') {
      steps {
        sh 'pnpm build --filter=@provibe/admin'
        sh 'pnpm build --filter=@provibe/app'
        sh 'pnpm build --filter=@provibe/web'
      }
    }

    stage('Build Docker Images') {
     steps {
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed!'
    }
    always {
      script {
        echo "🧹 Cleaning workspace..."
        cleanWs()
      }
    }
  }
}
