pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "927854233463"
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        ECR_REPO = "${ECR_REGISTRY}/sample-app"
        IMAGE_TAG = "build-${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
           steps {
               cleanWs()
               git branch: 'master',
                url: 'https://github.com/KarteekReddy1/sample-app.git'
    }
}


        stage('Build Docker Image') {
            steps {
                sh """
                  docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                """
            }
        }

        stage('Login to ECR & Push Image') {
            steps {
                sh """
                  aws ecr get-login-password --region ${AWS_REGION} \
                  | docker login --username AWS --password-stdin ${ECR_REGISTRY}

                  docker push ${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                  sed -i 's|IMAGE_TAG|${IMAGE_TAG}|g' deployment.yaml
                  kubectl apply -f deployment.yaml
                  kubectl apply -f service.yaml
                  kubectl apply -f ingress.yaml
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh """
                  kubectl rollout status deployment/sample-app
                """
            }
        }
    }
}
