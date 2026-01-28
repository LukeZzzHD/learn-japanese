'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { toast } from 'sonner';

const PIN_LENGTH = 6;

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isSubmittingRef = useRef(false);

  const submitPin = useCallback(
    async (pinValue: string) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      setIsLoading(true);

      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: pinValue }),
        });

        const data = await response.json();

        if (data.success) {
          router.push('/');
          router.refresh();
        } else {
          toast.error('Invalid PIN');
          setPin('');
        }
      } catch {
        toast.error('Something went wrong');
        setPin('');
      } finally {
        setIsLoading(false);
        isSubmittingRef.current = false;
      }
    },
    [router]
  );

  const handleDigitPress = useCallback(
    (digit: string) => {
      if (isLoading) return;
      setPin((prev) => {
        if (prev.length >= PIN_LENGTH) return prev;
        const newPin = prev + digit;
        if (newPin.length === PIN_LENGTH) {
          setTimeout(() => submitPin(newPin), 100);
        }
        return newPin;
      });
    },
    [isLoading, submitPin]
  );

  const handleBackspace = useCallback(() => {
    if (isLoading) return;
    setPin((prev) => prev.slice(0, -1));
  }, [isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigitPress, handleBackspace, isLoading]);

  const numpadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['backspace', '0', ''],
  ];

  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden">
      <Card className="w-full max-w-[280px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Enter PIN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-2">
          {/* PIN Display */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: PIN_LENGTH }).map((_, index) => (
              <div
                key={index}
                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all ${
                  index < pin.length
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/30 bg-transparent'
                }`}
              />
            ))}
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 place-items-center gap-2">
            {numpadButtons.flat().map((key, index) => {
              if (key === '') {
                return <div key={index} className="h-14 w-14" />;
              }

              if (key === 'backspace') {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-14 w-14 rounded-full"
                    onClick={handleBackspace}
                    disabled={isLoading || pin.length === 0}
                    aria-label="Delete"
                  >
                    <Delete className="h-5 w-5" />
                  </Button>
                );
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-14 w-14 rounded-full text-xl font-medium"
                  onClick={() => handleDigitPress(key)}
                  disabled={isLoading}
                >
                  {key}
                </Button>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <p className="text-muted-foreground text-center text-sm">
              Verifying...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
