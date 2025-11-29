"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LoginPrompt from "@/components/LoginPrompt";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Shield, Lock, MessageCircle, Clock, User, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Circle {
  id: number;
  name: string;
  topic: string;
  description: string;
  max_members: number;
  current_members: number;
  created_at: string;
}

interface Message {
  id: number;
  circle_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: string;
}

export default function CirclesPage() {
  const { user, loading: userLoading } = useUser();
  const [circles, setCircles] = useState<Circle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    fetchCircles();
  }, []);

  const fetchCircles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/circles?limit=20");
      if (response.ok) {
        const data = await response.json();
        setCircles(data);
      }
    } catch (error) {
      console.error("Failed to fetch circles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (circleId: number) => {
    try {
      const response = await fetch(`/api/circles/${circleId}/messages?limit=50`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const joinCircle = async (circleId: number) => {
    if (!user) return;

    setIsJoining(true);
    try {
      const response = await fetch("/api/circles/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          circle_id: circleId,
          user_id: user.id,
        }),
      });

      if (response.ok) {
        setHasJoined(true);
        await fetchMessages(circleId);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to join circle");
      }
    } catch (error) {
      console.error("Failed to join circle:", error);
      alert("Failed to join circle. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  const sendMessage = async () => {
    if (!user || !selectedCircle || !newMessage.trim()) return;

    setIsSending(true);
    try {
      const response = await fetch(`/api/circles/${selectedCircle.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, { ...message, username: user.username }]);
        setNewMessage("");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const openCircleDialog = (circle: Circle) => {
    setSelectedCircle(circle);
    setHasJoined(false);
    setMessages([]);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Anonymous & AI-Moderated</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Peer Circles</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join small, pseudonymous groups of 5–7 men to share experiences, find support, and build meaningful connections in a safe, moderated environment.
            </p>
          </div>

          {/* Safety Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">AI Moderation</h3>
                <p className="text-xs text-muted-foreground">
                  Real-time content monitoring ensures respectful, supportive conversations
                </p>
              </div>
            </Card>
            <Card className="p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Pseudonymous</h3>
                <p className="text-xs text-muted-foreground">
                  Use your username – no real names or personal info required
                </p>
              </div>
            </Card>
            <Card className="p-4 flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Small Groups</h3>
                <p className="text-xs text-muted-foreground">
                  Limited to 5-7 members for intimate, meaningful discussions
                </p>
              </div>
            </Card>
          </div>

          {/* Available Circles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Available Circles</h2>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {circles.map((circle) => {
                  const isActive = circle.current_members < circle.max_members;
                  return (
                    <Card key={circle.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{circle.name}</h3>
                            {isActive ? (
                              <Badge variant="default" className="bg-green-500">
                                <Clock className="w-3 h-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Full</Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="mb-3">
                            {circle.topic}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{circle.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>
                            {circle.current_members}/{circle.max_members} members
                          </span>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              disabled={!isActive} 
                              size="sm"
                              onClick={() => openCircleDialog(circle)}
                            >
                              {isActive ? "Join Circle" : "Full"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>{selectedCircle?.name}</DialogTitle>
                              <DialogDescription>
                                Connect with peers in a safe, supportive environment
                              </DialogDescription>
                            </DialogHeader>

                            {!hasJoined ? (
                              <div className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg">
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Community Guidelines
                                  </h4>
                                  <ul className="text-sm space-y-1 text-muted-foreground">
                                    <li>• Be respectful and supportive</li>
                                    <li>• No sharing of personal identifying information</li>
                                    <li>• Listen actively and validate others' feelings</li>
                                    <li>• Keep conversations confidential</li>
                                    <li>• Report any concerning behavior</li>
                                  </ul>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                  You'll be joining as <strong>{user.username}</strong>
                                </p>

                                <Button 
                                  onClick={() => selectedCircle && joinCircle(selectedCircle.id)} 
                                  className="w-full" 
                                  disabled={isJoining}
                                >
                                  {isJoining ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Joining...
                                    </>
                                  ) : (
                                    "Join Circle"
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <ScrollArea className="h-[300px] border rounded-lg p-4">
                                  <div className="space-y-4">
                                    {messages.length > 0 ? (
                                      messages.map((msg) => (
                                        <div key={msg.id} className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                              <AvatarFallback className="text-xs">
                                                {msg.username.slice(0, 2).toUpperCase()}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-sm">{msg.username}</span>
                                            <span className="text-xs text-muted-foreground">
                                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                          </div>
                                          <p className="text-sm ml-10 text-muted-foreground">{msg.content}</p>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-center text-muted-foreground py-8">
                                        No messages yet. Be the first to share!
                                      </p>
                                    )}
                                  </div>
                                </ScrollArea>

                                <div className="space-y-2">
                                  <Textarea 
                                    placeholder="Share your thoughts with the circle..." 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    disabled={isSending}
                                  />
                                  <Button 
                                    className="w-full" 
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim() || isSending}
                                  >
                                    {isSending ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                      </>
                                    ) : (
                                      <>
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Send Message
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* How It Works */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-6 text-center">How Peer Circles Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">1. Use Your Identity</h3>
                <p className="text-sm text-muted-foreground">
                  Your pseudonymous username protects your privacy
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">2. Join a Circle</h3>
                <p className="text-sm text-muted-foreground">
                  Select a circle that resonates with your current experiences or challenges
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">3. Share & Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with peers in a safe, AI-moderated space for mutual support
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}