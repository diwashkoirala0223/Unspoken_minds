"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function LoginPrompt() {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateUsername = () => {
    const adjectives = ["Brave", "Calm", "Noble", "Wise", "Strong", "Gentle", "Bold", "Quiet"];
    const nouns = ["Wolf", "Eagle", "Mountain", "Ocean", "Forest", "River", "Lion", "Phoenix"];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 100);
    setUsername(`${adj}${noun}${num}`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Anonymous Identity</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Unspoken Minds</h2>
          <p className="text-muted-foreground text-sm">
            Create your pseudonymous identity to begin your journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Choose Your Anonymous Username</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., BraveWolf42"
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={generateUsername}
                variant="outline"
                disabled={isLoading}
              >
                Generate
              </Button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
            <p className="font-medium mb-2">Privacy First:</p>
            <ul className="space-y-1 text-xs">
              <li>• No email or personal info required</li>
              <li>• Your username is your only identifier</li>
              <li>• All data is encrypted and private</li>
              <li>• Delete your account anytime</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !username.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Identity...
              </>
            ) : (
              "Begin Journey"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
