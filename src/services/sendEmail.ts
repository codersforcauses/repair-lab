import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";

import prisma from "@/lib/prisma";
import { User } from "@/types";

import userService from "./user";
import { RepairRequestEmail } from "../email/emails/repair-request-email";
import { formatDate } from "../utils";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  endpoint:
    process.env.AWS_SES_SWITCH === "ON" ? undefined : "http://localhost:8005"
});

const emailHtml = (customerUser: User, requestId: string) => {
  return repairRequestEmailHtml(customerUser, requestId);
  // add more email templates here
};

const repairRequestEmailHtml = async (
  customerUser: User,
  requestId: string
) => {
  const repairRequest = await prisma.repairRequest.findUnique({
    where: { id: requestId }
  });

  let eventDate = "";
  if (repairRequest?.eventId) {
    const event = await prisma.event.findUnique({
      where: { id: repairRequest?.eventId }
    });
    eventDate = formatDate(event?.endDate.toDateString() || "");
  }

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
      estimatedDate: eventDate,
      emailSignature: "" // TODO: Add email signature
    })
  );
};

const createSendEmailCommand = (
  customerEmail: string,
  subject: string,
  content: string
) => {
  return new SendEmailCommand({
    Source: "repairlabtest@gmail.com",
    Destination: {
      ToAddresses: [customerEmail]
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: subject
      },
      Body: {
        // if html data and text data both exist, the email will be sent in html format
        Html: {
          Charset: "UTF-8",
          Data: content
        },
        Text: {
          Charset: "UTF-8",
          Data: ""
        }
      }
    }
  });
};

const sendEmail = async (
  subject: string,
  userId: string,
  requestId: string
) => {
  const customerUser = await userService.getUser(userId);
  if (customerUser === undefined) {
    return;
  }

  const emailContent = await emailHtml(customerUser, requestId);

  const sendEmailCommand = createSendEmailCommand(
    customerUser?.emailAddress,
    subject,
    emailContent
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    // error("Failed to send email. Error: ", e);
    return e;
  }
};

export default sendEmail;
