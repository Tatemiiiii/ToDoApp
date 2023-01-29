import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class ToDoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'ToDoApp', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    })
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ToDoAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
