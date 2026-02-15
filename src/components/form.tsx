'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '~/components/ui/input-group';
import { logger, getErrorMessage } from '~/lib/logger';

interface FormProps {
  onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const sessionId = crypto.randomUUID();

    if (step === 1) {
      if (!formData.email || !isValidEmail(formData.email)) {
        logger.warn("form", "Invalid email submitted", { sessionId, email: formData.email });
        toast.error('Please enter a valid email address');
        return;
      }
      logger.debug("form", "Step 1 completed, moving to step 2", { sessionId, email: formData.email });
      setStep(2);
      return;
    }

    try {
      setLoading(true);
      logger.info("form", "Starting form submission", { sessionId, email: formData.email, hasReferralCode: !!refCode });

      const payload = {
        firstname: formData.name || formData.email.split('@')[0],
        email: formData.email,
        referredBy: refCode || undefined,
      };

      logger.debug("form", "Calling mail API", { sessionId });
      const mailRes = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!mailRes.ok) {
        const errorText = await mailRes.text();
        logger.error("form", "Mail API request failed", new Error(`HTTP ${mailRes.status}: ${errorText}`), { sessionId, status: mailRes.status });
        const err = mailRes.status === 429 ? 'Rate limited' : 'Email failed';
        throw new Error(err);
      }

      logger.debug("form", "Mail API succeeded, calling notion API", { sessionId });
      const notionRes = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!notionRes.ok) {
        const errData = await notionRes.json().catch(() => ({ error: 'Unknown error' }));
        logger.error("form", "Notion API request failed", new Error(`HTTP ${notionRes.status}: ${errData.error}`), { sessionId, status: notionRes.status });
        
        if (notionRes.status === 409) {
          toast.error(errData.error || "You're already on the waitlist!");
          return;
        }
        const err = notionRes.status === 429 ? 'Rate limited' : 'Notion failed';
        throw new Error(err);
      }

      const { code } = await notionRes.json();
      const link = `${window.location.origin}/?ref=${code}`;
      setShareLink(link);

      logger.info("form", "Form submission completed successfully", { sessionId, referralCode: code });
      toast.success("You're on the waitlist!");
      setSuccess(true);
      onSuccessChange?.(true);

      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: [
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#ff00ff',
            '#00ffff',
          ],
        });
      }, 150);

      setFormData({ email: '', name: '' });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      logger.error("form", "Form submission failed", error instanceof Error ? error : new Error(errorMessage), { sessionId });
      
      if (error instanceof Error) {
        const msg =
          error.message === 'Rate limited'
            ? 'Too many attempts. Try again later.'
            : 'Something went wrong. Try again.';
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ email: '', name: '' });
    setSuccess(false);
    setShareLink('');
    onSuccessChange?.(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      logger.debug("form", "Referral link copied to clipboard", { shareLink });
      toast.success('Link copied!');
    }).catch((error: unknown) => {
      logger.error("form", "Failed to copy link to clipboard", error instanceof Error ? error : new Error(String(error)));
      toast.error('Failed to copy link');
    });
  };

  return (
    <div className="w-full relative">
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p className="text-lg font-medium">
            Share your link to skip the line!
          </p>
          <div className="flex items-center gap-2 max-w-sm mx-auto">
            <input
              value={shareLink}
              readOnly
              className="flex-1 px-3 py-2 border rounded-lg text-black text-sm bg-gray-50"
            />
            <button
              type="button"
              onClick={copyLink}
              className="px-4 py-2 bg-[#e5ff00] text-black rounded-lg font-medium hover:bg-opacity-90"
            >
              Copy
            </button>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-sm text-gray-600 underline"
          >
            Join with another email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex relative"
              >
                <InputGroup className="h-auto min-h-[52px] rounded-[12px]">
                  <InputGroupInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="h-auto py-3 text-base"
                    disabled={loading}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="submit"
                      size="sm"
                      className="bg-[#e5ff00] text-black hover:bg-[#e5ff00]/90 rounded-[10px] font-semibold disabled:opacity-50"
                      disabled={
                        loading ||
                        !formData.email ||
                        !isValidEmail(formData.email)
                      }
                    >
                      Continue
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </motion.div>
            ) : (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name (optional)"
                  className="h-[52px] text-base rounded-[12px]"
                  disabled={loading}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 rounded-[12px]"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#e5ff00] text-black hover:bg-[#e5ff00]/90 rounded-[12px] font-semibold disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <title>Loading</title>
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Joining...
                      </>
                    ) : (
                      'Join Waitlist'
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
