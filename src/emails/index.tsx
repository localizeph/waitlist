import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

const WaitlistEmail = ({ userFirstname }: { userFirstname: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head>
          <title>You're on the list</title>
          <Preview>Thanks for joining the Waitly waitlist.</Preview>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap');
            `}
          </style>
        </Head>
        <Body
          className="bg-[#09090B] py-12"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          <Container className="bg-[#18181B] rounded-2xl mx-auto px-8 py-12 max-w-160">
            {/* Logo/Brand */}
            <Section className="text-center mb-8">
              <Text className="text-2xl font-semibold text-white tracking-tight">
                localize
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#DFFF1A]/10 mb-6">
                <span className="text-2xl">✦</span>
              </div>

              <Text className="text-3xl font-semibold text-white mb-4 tracking-tight">
                You're on the list
              </Text>

              <Text className="text-[#A1A1AA] text-lg leading-relaxed mb-8">
                Hi {userFirstname}, thanks for your interest. We'll notify you
                as soon as early access is ready.
              </Text>
            </Section>

            {/* CTA */}
            <Section className="text-center mb-8">
              <Button
                className="bg-[#DFFF1A] text-[#09090B] font-semibold py-3 px-6 rounded-full no-underline text-sm"
                href="https://twitter.com/Idee8Agency"
              >
                Follow for updates
              </Button>
            </Section>

            {/* Divider */}
            <div className="h-px bg-[#27272A] my-8" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-xs text-[#71717A] mb-2">
                © {currentYear} Idee8 Agency
              </Text>
              <Text className="text-xs text-[#71717A]">
                <Link href="#" className="text-[#71717A] underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistEmail;
