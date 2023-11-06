# sam-template
- This repo hosts a sam template to get started with using REST API GW with a lamba integration using NodeJS
- This repo will create the resources
- - 1 x AWS REST API GW
- - 1 x AWS Lambda Function
- - 1 x AWS Lambda Role (created implicitly)
- - 1 x SAM CLI AWS S3 Bucket

Note: This is not a production-ready code repo, but serves as a quick start <br />
# What will I get at the end?
- A REST API GW that echoes back any JSON sent to it in the request <br />

# Limitations
- Handling dependencies for ```node_modules/```
- Request thottling
- REST API GW Authorizer for authorized requests
<br />

# Before you begin
- Create an IAM User on AWS with the right set of permissions, or you can use the ```AdministratorAccess``` permission (not recommended) https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html
- Download the credentials of the IAM User
- Have awscli installed on your local system, it is preferrable to install awscliv2 (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Configure AWS CLI with the credentials using the command below using a profile name of your choice, I am using ```example``` as the name of the profile

    ```aws configure --profile example```
- Use the AWS Access Key ID and the Secret Access Key from the IAM user to complete the command above
- Have AWS SAM CLI installed on your local system (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)<br />


# Deploying this repo
- Clone this repo
- Change directory into the root of this repo
- Make necessary changes to the NodeJS code (if you want) inside this file here at ```code/index.js```
- Create an S3 bucket using the AWS CLI and the profile you setup earlier, I am using ```example``` as name of the profile

    ```aws s3 mb s3://temp-bucket-098723 --profile example --region us-east-1 ```<br /><br />
    Note: If the command above fails, use a different name for the parameter ```s3://<S3_Bucket_Name>``` in the ```aws s3 mb``` commad above

- From the root of this repo, invoke AWS SAM CLI like so <br />
```sam deploy -t template.yml --s3-bucket temp-bucket-098723 --capabilities CAPABILITY_IAM  --profile example --region us-east-1  --stack-name "DAU-stack"```

- The output of the above command will show a REST API GW endpoint integrated with an AWS Lambda function
- For instance the output of the above command has the URL

    ```https://randomString.execute-api.us-east-1.amazonaws.com/dev```
- You can then issue a cURL call like so

    ```curl https://randomString.execute-api.us-east-1.amazonaws.com/dev/path/subpath```

    Or if you want to pass JSON

    ```curl -H 'Accept: */*'  -H 'Content-Type: application/json'  --data-raw '{"sampleJSONKey": "sampleJSONValue"}' https://randomString.execute-api.us-east-1.amazonaws.com/dev/path/subpath```

- The output of the above command will echo back the JSON request in response of the cURL command
<br />

# Local debugging
- Set breakpoints in code
- Use the following command to run a local debugging session<br />
   ``` sam local start-api --warm-containers eager --force-image-build --debug-function sampleLambdaFunction  -d 5678 --region us-east-1 --profile example  --skip-pull-image  --template template.yml``` <br /> 

- Use curl to invoke local lambda function through a local API GW
<br />
    ```curl http://127.0.0.1:3000/path/subpath```
<br />

# Cleaning up created resources
- Use the command below to destroy the created resources<br />
    ```sam delete  --profile example --region us-east-1 --no-prompts --stack-name "DAU-stack"```<br />
- Delete the AWS S3 Bucket you created earlier <br />
```aws s3 rb s3://temp-bucket-098723 --force --profile example```