"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { MessageCircle, BookOpen, Users, Heart, Shield, Lock, Sparkles } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: "Echo AI Coach",
      description: "Your empathetic AI companion for emotional check-ins, mindfulness prompts, and personalized coping strategies.",
      href: "/echo",
      color: "text-blue-500",
    },
    {
      icon: BookOpen,
      title: "Emotion Journal",
      description: "Private, encrypted space to log moods, track patterns, and receive gentle self-care recommendations.",
      href: "/journal",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Anonymous Peer Circles",
      description: "Connect with 5-7 men in pseudonymous groups. Share safely with AI-moderated support.",
      href: "/circles",
      color: "text-purple-500",
    },
    {
      icon: Heart,
      title: "Resource Hub",
      description: "Curated helplines, counseling programs, motivational stories, and audio journaling tools.",
      href: "/resources",
      color: "text-red-500",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Safe & Anonymous",
      description: "Pseudonymous profiles with end-to-end encryption for all your data.",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "Delete your data anytime. Complete control over your information.",
    },
    {
      icon: Sparkles,
      title: "Empathetic AI",
      description: "Non-judgmental, supportive AI that understands your emotional journey.",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">A Safe Space for Men's Mental Health</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Unspoken Minds
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              An anonymous, empathetic platform where men aged 15–40 can explore emotions, connect with peers, and access mental health support without stigma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/echo">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with Echo AI
                </Button>
              </Link>
              <Link href="/journal">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Journaling
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe vulnerability is strength. Unspoken Minds reduces stigma around men's mental health by providing a safe, anonymous space to share emotions, receive AI-powered support, and connect with peers. Together, we promote empathy, community, and long-term well-being while enabling early detection of emotional distress.
            </p>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to support your mental health journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Link key={feature.href} href={feature.href}>
                  <Card className="p-6 h-full hover:shadow-lg transition-all hover:scale-105 hover:border-primary/50 cursor-pointer">
                    <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Built on Trust & Safety</h2>
              <p className="text-lg text-muted-foreground">
                Your privacy and security are our top priorities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of men who are choosing vulnerability, connection, and mental wellness.
            </p>
            <Link href="/echo">
              <Button size="lg" className="text-lg px-8 py-6">
                <MessageCircle className="w-5 h-5 mr-2" />
                Start with Echo AI
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p className="mb-2">
              <strong>Unspoken Minds</strong> - Reducing stigma, promoting empathy, supporting mental health.
            </p>
            <p className="text-sm">
              If you're in crisis, please contact a local helpline or emergency service immediately.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}