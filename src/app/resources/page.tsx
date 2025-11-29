"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, Globe, Mic, PlayCircle, StopCircle, AlertCircle, ExternalLink, BookOpen } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Resource {
  name: string;
  description: string;
  contact: string;
  availability: string;
  region: string;
}

interface Story {
  title: string;
  author: string;
  excerpt: string;
  readTime: string;
}

export default function ResourcesPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const helplines: Resource[] = [
    {
      name: "National Suicide Prevention Lifeline (US)",
      description: "24/7 free and confidential support for people in distress.",
      contact: "988",
      availability: "24/7",
      region: "United States",
    },
    {
      name: "Crisis Text Line (US)",
      description: "Text-based support for anyone in crisis.",
      contact: "Text HOME to 741741",
      availability: "24/7",
      region: "United States",
    },
    {
      name: "SAMHSA National Helpline",
      description: "Treatment referral and information service for mental health.",
      contact: "1-800-662-4357",
      availability: "24/7",
      region: "United States",
    },
    {
      name: "Samaritans (UK)",
      description: "Confidential emotional support for anyone in distress.",
      contact: "116 123",
      availability: "24/7",
      region: "United Kingdom",
    },
    {
      name: "Beyond Blue (Australia)",
      description: "Support service for depression, anxiety, and suicide prevention.",
      contact: "1300 22 4636",
      availability: "24/7",
      region: "Australia",
    },
    {
      name: "Lifeline (Australia)",
      description: "Crisis support and suicide prevention services.",
      contact: "13 11 14",
      availability: "24/7",
      region: "Australia",
    },
  ];

  const counselingPrograms: Resource[] = [
    {
      name: "BetterHelp",
      description: "Online therapy platform with licensed therapists.",
      contact: "betterhelp.com",
      availability: "Flexible scheduling",
      region: "Global",
    },
    {
      name: "Talkspace",
      description: "Virtual therapy via text, audio, and video.",
      contact: "talkspace.com",
      availability: "Flexible scheduling",
      region: "Global",
    },
    {
      name: "7 Cups",
      description: "Free emotional support from trained listeners.",
      contact: "7cups.com",
      availability: "24/7",
      region: "Global",
    },
    {
      name: "Open Path Collective",
      description: "Affordable therapy with membership fee.",
      contact: "openpathcollective.org",
      availability: "Varies",
      region: "United States",
    },
  ];

  const stories: Story[] = [
    {
      title: "From Silence to Strength: My Journey with Anxiety",
      author: "Anonymous",
      excerpt: "For years, I thought asking for help was weakness. Then I realized that acknowledging my struggles was the bravest thing I'd ever done. Here's how therapy changed my life...",
      readTime: "5 min read",
    },
    {
      title: "A Father's Perspective: Postpartum Depression in Men",
      author: "James M.",
      excerpt: "No one talks about how becoming a father can trigger depression in men too. I want to share my story so others don't feel alone in this experience...",
      readTime: "7 min read",
    },
    {
      title: "Breaking the Cycle: How I Learned to Express Emotions",
      author: "Michael T.",
      excerpt: "Growing up, I was taught that men don't cry. It took hitting rock bottom to realize that emotions aren't weakness – they're human. My path to emotional freedom...",
      readTime: "6 min read",
    },
    {
      title: "College, Career, and Coping: A Student's Mental Health Journey",
      author: "David L.",
      excerpt: "The pressure to succeed academically while managing mental health felt impossible. Here's how I found balance and learned to prioritize my wellbeing...",
      readTime: "4 min read",
    },
  ];

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
    } else {
      setIsRecording(true);
      // Simulate recording timer
      const timer = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 300) {
            // 5 minutes max
            clearInterval(timer);
            setIsRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Support & Resources</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Resource Hub</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access curated helplines, counseling services, motivational stories, and voice journaling tools.
            </p>
          </div>

          {/* Crisis Alert */}
          <Alert className="mb-8 border-red-500 bg-red-50 dark:bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>In Crisis?</strong> If you're experiencing a mental health emergency, please call your local emergency services or contact a crisis helpline immediately. You are not alone.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="helplines" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="helplines">Helplines</TabsTrigger>
              <TabsTrigger value="counseling">Counseling</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="voice">Voice Zone</TabsTrigger>
            </TabsList>

            {/* Helplines Tab */}
            <TabsContent value="helplines" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helplines.map((helpline, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{helpline.name}</h3>
                        <Badge variant="outline" className="mb-2">
                          {helpline.region}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{helpline.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="font-semibold">{helpline.contact}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available:</span>
                        <Badge variant="secondary">{helpline.availability}</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Counseling Tab */}
            <TabsContent value="counseling" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {counselingPrograms.map((program, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Globe className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{program.name}</h3>
                        <Badge variant="outline" className="mb-2">
                          {program.region}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Website:</span>
                        <span className="font-semibold">{program.contact}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="text-sm">{program.availability}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="space-y-4">
              <div className="space-y-4">
                {stories.map((story, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold mb-1">{story.title}</h3>
                            <p className="text-sm text-muted-foreground">By {story.author}</p>
                          </div>
                          <Badge variant="secondary">{story.readTime}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{story.excerpt}</p>
                        <Button variant="outline" size="sm">
                          Read Full Story
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
                <h3 className="font-semibold mb-2">Share Your Story</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your experience could help someone else. Submit your anonymous story to inspire others.
                </p>
                <Button>Submit Your Story</Button>
              </Card>
            </TabsContent>

            {/* Voice Zone Tab */}
            <TabsContent value="voice" className="space-y-6">
              <Card className="p-8 max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <Mic className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h2 className="text-2xl font-bold mb-2">Safe Voice Zone</h2>
                  <p className="text-muted-foreground">
                    Express yourself through voice. Your recordings are private, encrypted, and analyzed for emotional insights.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Recording Interface */}
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    {isRecording && (
                      <div className="mb-4">
                        <div className="text-4xl font-bold text-primary mb-2">{formatTime(recordingTime)}</div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">Recording...</span>
                        </div>
                      </div>
                    )}

                    <Button
                      size="lg"
                      onClick={toggleRecording}
                      className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      {isRecording ? (
                        <>
                          <StopCircle className="w-5 h-5 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Start Recording
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground mt-4">
                      Maximum recording time: 5 minutes
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Emotion Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        AI analyzes your voice tone to detect stress, anxiety, or emotional patterns
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Visual Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        See visual representations of your emotional journey over time
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Private & Secure</h4>
                      <p className="text-sm text-muted-foreground">
                        All recordings are encrypted and stored securely. Delete anytime
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">No Transcription</h4>
                      <p className="text-sm text-muted-foreground">
                        We analyze tone, not words. Your privacy is fully protected
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Voice journaling is a tool for self-reflection. If you're in crisis, please contact a helpline or emergency service immediately.
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
