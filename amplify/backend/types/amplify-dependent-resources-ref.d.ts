export type AmplifyDependentResourcesAttributes = {
  "api": {
    "api2b0df875": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "medistream8783a446": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "medistream79999209": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "predictions": {
    "transcribeAudioToText": {
      "language": "string",
      "region": "string"
    },
    "interpretMedicalText": {
      "region": "string",
      "type": "string"
    }
  }
}