import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class ToDoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //
    const sourceBucket = new s3.Bucket(this, 'ToDoApp', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    })
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ToDoAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //
    const oai = new cloudfront.OriginAccessIdentity(this, "my-oai");

    // Create Policy and attach to mybucket
    const myBucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["s3:GetObject"],
      principals: [
        new iam.CanonicalUserPrincipal(
          oai.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
      resources: [sourceBucket.bucketArn + "/*"],
    });

    sourceBucket.addToResourcePolicy(myBucketPolicy);

    //
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: sourceBucket,
            originAccessIdentity: oai
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],

      geoRestriction: cloudfront.GeoRestriction.allowlist('JP'),
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200
    });

    //
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./web')],
      destinationBucket: sourceBucket,
      distribution: distribution
    });
  }
}
