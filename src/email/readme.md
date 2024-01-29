# React Email Starter

A live preview right in your browser so you don't need to keep sending real emails during development.

## Getting Started

First, install the dependencies:

```sh
npm install
# or
yarn
```

Then, run the development server:

```sh
npm run dev
# or
yarn dev
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT

---

# AWS SES

Amazon Simple Email Service

## Getting Started

First, install the dependencies:

```sh
npm install @aws-sdk/client-ses
# or
yarn add @aws-sdk/client-ses
# or
pnpm install @aws-sdk/client-ses
```

## [SendEmailCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendEmailCommand/)

Composes an email message and immediately queues it for sending. To send email using this operation, your message must meet the following requirements:

- The message must be sent from a verified email address or domain. If you attempt to send email using a non-verified address or domain, the operation results in an "Email address not verified" error.
- If your account is still in the Amazon SES sandbox, you may only send to verified addresses or domains, or to email addresses associated with the Amazon SES Mailbox Simulator. For more information, see Verifying Email Addresses and Domains in the Amazon SES Developer Guide.
- The maximum message size is 10 MB.
- The message must include at least one recipient email address. The recipient address can be a To: address, a CC: address, or a BCC: address. If a recipient email address is invalid (that is, it is not in the format UserName[SubDomain.]Domain.TopLevelDomain), the entire message is rejected, even if the message contains other recipients that are valid.
- The message may not include more than 50 recipients, across the To:, CC: and BCC: fields. If you need to send an email message to a larger audience, you can divide your recipient list into groups of 50 or fewer, and then call the SendEmail operation several times to send the message to each group.
- For every message that you send, the total number of recipients (including each recipient in the To:, CC: and BCC: fields) is counted against the maximum number of emails you can send in a 24-hour period (your sending quota). For more information about sending quotas in Amazon SES, see Managing Your Amazon SES Sending Limits in the Amazon SES Developer Guide.

### [SendEmailCommand Input](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-ses/Interface/SendEmailCommandInput)

List requried fileds below.

|       Parameter        |          Type           |                              Description                               |
| :--------------------: | :---------------------: | :--------------------------------------------------------------------: |
| Destination (Required) | Destination\| undefined | The destination for this email, composed of To:, CC:, and BCC: fields. |
|   Message (Required)   |   Message\| undefined   |                        The message to be sent.                         |
|   Source (Required)    |   string\| undefined    |              The email address that is sending the email.              |

### [SendEmailCommand Output](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-ses/Interface/SendEmailCommandOutput)

List requried fileds below.

|      Parameter       |        Type        |                            Description                            |
| :------------------: | :----------------: | :---------------------------------------------------------------: |
| $metadata (Required) |  ResponseMetadata  |               Metadata pertaining to this request.                |
| MessageId (Required) | string\| undefined | The unique message identifier returned from the SendEmail action. |

---

# AWS SES Mock

Refer to github repository [domdomegg/aws-ses-v2-local](https://github.com/domdomegg/aws-ses-v2-local), which is a local version of AWS SES supporting both the V1 API and the V2 API.

## Getting Started

Run the [aws-ses-v2-local Docker image](https://hub.docker.com/r/pensk/aws-ses-v2-local), which is the mock email service running at [localhost:8005](localhost:8005).

```sh
docker run -p 8005:8005 pensk/aws-ses-v2-local
```

## How It Works

Use the environment variable ${AWS_SES_SWITCH} to decide whether to employ the mock service or the actual AWS SES service. When the switch is set to 'ON,' real emails will be sent from Amazon. Otherwise, mock emails can be viewed at [localhost:8005](localhost:8005).

## License

MIT
