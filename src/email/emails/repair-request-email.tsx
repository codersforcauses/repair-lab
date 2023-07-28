import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';
  
  interface RepairRequestEmailProps {
    customerName?: string;
    requestId?: string;
    date?: string;
    itemName?: string;
    issueDescription?: string;
    estimatedDate?: string;
    emailSignature?: string;
    facebookLink?: string;
    logoUrl?: string; // Assuming you might want to display your company logo at the top
  }
  export const RepairRequestEmail = ({
    customerName,
    requestId,
    date,
    itemName,
    issueDescription,
    estimatedDate,
    emailSignature,
    logoUrl,
  }: RepairRequestEmailProps) => {
    const previewText = `Confirmation of Your Repair Request - #${requestId}`;
    const facebookLink = "https://www.facebook.com/RepairLabPerth/";

    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                <Section className="mt-[32px] text-center">
                  <Img 
                    src="$/static/lablogo.png"
                    width="32"
                    height="32"
                    alt="Logo"
                   />
                </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Confirmation of Your Repair Request - #{requestId}
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Hello {customerName},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Thank you for reaching out to us regarding your repair needs. We have successfully received your request, and our team will review it promptly.
              </Text>
              <Section>
                <Text className="text-black text-[14px] leading-[24px] font-bold">
                  Repair Request Details:
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">Request ID: {requestId}</Text>
                <Text className="text-black text-[14px] leading-[24px]">Date of Request: {date}</Text>
                <Text className="text-black text-[14px] leading-[24px]">Product/Item: {itemName}</Text>
                <Text className="text-black text-[14px] leading-[24px]">Issue Description: {issueDescription}</Text>
                <Text className="text-black text-[14px] leading-[24px]">
                  Estimated Repair Date: {estimatedDate} (please note that this date is subject to change based on the nature and complexity of the issue)
                </Text>
              </Section>
              <Text className="text-black text-[14px] leading-[24px] mt-[32px]">
                For updates on your repair request, or if you have any further questions, please feel free to get in touch with us via our 
                <Link href={facebookLink} className="text-blue-600 no-underline"> official Facebook page</Link>.
                Our team is active there and will assist you with any concerns.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                We value your trust and are committed to providing you with the best possible service. Thank you for choosing us for your repair needs.
              </Text>
              <Text className="text-black text-[14px] leading-[24px] mt-[32px]">
                Warm regards,
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Repair Labs
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">{emailSignature}</Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default RepairRequestEmail;
  