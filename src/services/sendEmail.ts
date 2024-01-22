import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import prisma from "@/lib/prisma";
import { User } from "@/types";
import { formatDate } from "@/utils/format-date";

import userService from "./user";
import { RepairRequestEmail } from "../email/emails/repair-request-email";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const emailContent = (customerUser: User, requestId: string) => {
  // use repair request email template
  return RepairRequestEmailContent(customerUser, requestId);
  // add more email templates here
};

const RepairRequestEmailContent = async (
  customerUser: User,
  requestId: string
) => {
  // get repair request information from db
  const repairRequest = await prisma.repairRequest.findUnique({
    where: { id: requestId }
  });

  // get coustmer name
  const customerName = `${customerUser?.firstName || ""} ${
    customerUser?.lastName || ""
  }`;

  return render(
    RepairRequestEmail({
      customerName: customerName,
      requestId: requestId,
      date: formatDate(repairRequest?.requestDate.toDateString() || ""),
      itemName: repairRequest?.itemType || "",
      issueDescription: repairRequest?.description || "",
      estimatedDate: "",
      emailSignature: ""
    })
  );
};

const createSendEmailCommand = (
  customerEmail: string,
  subject: string,
  content: string
) => {
  return new SendEmailCommand({
    Source: process.env.AWS_SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [customerEmail]
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8"
      },
      Body: {
        Html: {
          Data: content,
          Charset: "UTF-8"
        }
      }
    }
  });
};

export const sendEmail = async (
  subject: string,
  userId: string,
  requestId: string
) => {
  // get customer User from clerk
  const customerUser = await userService.getUser(userId);
  if (customerUser === undefined) {
    return;
  }

  // create email content
  const content = await emailContent(customerUser, requestId);

  // send email using AWS SES when customer email is available
  const customerEmail = customerUser?.emailAddress;
  if (customerEmail) {
    const sendEmailCommand = createSendEmailCommand(
      customerUser?.emailAddress,
      subject,
      content
    );

    try {
      return await sesClient.send(sendEmailCommand);
    } catch (e) {
      // error("Failed to send email.");
      return e;
    }
  }
};
