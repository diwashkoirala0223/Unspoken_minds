"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LoginPrompt from "@/components/LoginPrompt";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Smile, Meh, Frown, Calendar, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JournalEntry {
  id: number;
  user_id: number;
  mood: string;
  content: string;
  tags: string[] | null;
  created_at: string;
}

export default function JournalPage() {
  const { user, loading: userLoading } = useUser();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentMood, setCurrentMood] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const moods = [
    { value: "great", label: "Great", icon: Smile, color: "text-green-500" },
    { value: "good", label: "Good", icon: Smile, color: "text-blue-500" },
    { value: "calm", label: "Calm", icon: Meh, color: "text-teal-500" },
    { value: "okay", label: "Okay", icon: Meh, color: "text-yellow-500" },
    { value: "stressed", label: "Stressed", icon: Frown, color: "text-orange-500" },
    { value: "anxious", label: "Anxious", icon: Frown, color: "text-red-500" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-purple-500" },
  ];

  const suggestedTags = ["work", "relationships", "family", "health", "positive", "challenging", "growth", "gratitude"];

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;
    
    setIsFetching(true);
    try {
      const response = await fetch(`/api/journal/entries?user_id=${user.id}&limit=50`);
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const saveEntry = async () => {
    if (!user || !currentMood || !currentContent.trim()) {
      alert("Please select a mood and write something");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/journal/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          mood: currentMood,
          content: currentContent,
          tags: selectedTags.length > 0 ? selectedTags : null,
        }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries([newEntry, ...entries]);
        setCurrentMood("");
        setCurrentContent("");
        setSelectedTags([]);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save entry");
      }
    } catch (error) {
      console.error("Failed to save entry:", error);
      alert("Failed to save entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const response = await fetch(`/api/journal/entries?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEntries(entries.filter((entry) => entry.id !== id));
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
      console.error("Failed to delete entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / entries.length) * 100),
    }));
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
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Private & Encrypted</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Emotion Journal</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your moods, reflect on your feelings, and discover patterns in your emotional journey.
            </p>
          </div>

          <Tabs defaultValue="write" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="write">Write Entry</TabsTrigger>
              <TabsTrigger value="view">View & Insights</TabsTrigger>
            </TabsList>

            {/* Write Tab */}
            <TabsContent value="write">
              <Card className="p-6 max-w-3xl mx-auto">
                <div className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <Label className="text-base mb-3 block">How are you feeling right now?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {moods.map((mood) => (
                        <button
                          key={mood.value}
                          onClick={() => setCurrentMood(mood.value)}
                          disabled={isLoading}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            currentMood === mood.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <mood.icon className={`w-8 h-8 ${mood.color}`} />
                          <span className="text-sm font-medium">{mood.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content" className="text-base mb-3 block">
                      What's on your mind?
                    </Label>
                    <Textarea
                      id="content"
                      value={currentContent}
                      onChange={(e) => setCurrentContent(e.target.value)}
                      placeholder="Write freely about your thoughts, feelings, or experiences today. This space is private and judgment-free."
                      className="min-h-[200px] resize-none"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-base mb-3 block">Add tags (optional)</Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => !isLoading && toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button onClick={saveEntry} className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your entries are stored securely and encrypted for your privacy.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* View Tab */}
            <TabsContent value="view" className="space-y-6">
              {/* Mood Statistics */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Mood Patterns</h2>
                </div>
                {isFetching ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : entries.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Based on {entries.length} {entries.length === 1 ? "entry" : "entries"}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {getMoodStats().map(({ mood, count, percentage }) => {
                        const moodData = moods.find((m) => m.value === mood);
                        return (
                          <div key={mood} className="text-center p-4 bg-muted/50 rounded-lg">
                            {moodData && <moodData.icon className={`w-8 h-8 mx-auto mb-2 ${moodData.color}`} />}
                            <p className="font-semibold capitalize">{mood}</p>
                            <p className="text-2xl font-bold text-primary">{percentage}%</p>
                            <p className="text-xs text-muted-foreground">{count} times</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Start journaling to see your mood patterns
                  </p>
                )}
              </Card>

              {/* Entries List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Entries</h2>
                {isFetching ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : entries.length > 0 ? (
                  entries.map((entry) => {
                    const moodData = moods.find((m) => m.value === entry.mood);
                    return (
                      <Card key={entry.id} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {moodData && <moodData.icon className={`w-6 h-6 ${moodData.color}`} />}
                            <div>
                              <p className="font-semibold capitalize">{entry.mood}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(entry.created_at).toLocaleDateString()} at {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteEntry(entry.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-3">{entry.content}</p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </Card>
                    );
                  })
                ) : (
                  <Card className="p-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No entries yet. Start writing to track your journey.</p>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}