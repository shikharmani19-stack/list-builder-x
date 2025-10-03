import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Camera,
  Trophy,
  Users,
  Brain,
  Shield,
  Smartphone,
  ChevronRight,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { VideoRecorder } from "@/components/VideoRecorder";
import { AIAnalysis } from "@/components/AIAnalysis";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { ChatBot } from "@/components/ChatBot";

// Using public placeholder asset for prototype visuals
const heroImage = "/placeholder.svg";
const aiAnalysisImage = "/placeholder.svg";
const mobileInterfaceImage = "/placeholder.svg";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const features = [
    {
      icon: Camera,
      title: "Video Assessment",
      description: "Record fitness tests with AI-powered analysis",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "AI Verification",
      description: "On-device ML for accurate performance measurement",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Cheat Detection",
      description: "Advanced algorithms ensure fair assessment",
      color: "text-success",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Works on any smartphone, even with low bandwidth",
      color: "text-warning",
    },
  ];

  const stats = [
    { label: "Athletes Assessed", value: "50K+", icon: Users },
    { label: "AI Accuracy", value: "99.2%", icon: Target },
    { label: "Tests Completed", value: "200K+", icon: Trophy },
    { label: "Response Time", value: "<2s", icon: Zap },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "record":
        return <VideoRecorder />;
      case "analysis":
        return <AIAnalysis />;
      case "dashboard":
        return <PerformanceDashboard />;
      case "chat":
        return <ChatBot />;
      default:
        return (
          <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent" />
              </div>

              <div className="relative z-10 container mx-auto px-6 text-center">
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
                  🏆 Sports Authority of India Initiative
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered Sports
                  <br />
                  Talent Assessment
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Democratizing sports talent discovery across India with cutting-edge AI technology.
                  Record, analyze, and showcase your athletic potential from anywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero group" size="lg" onClick={() => setActiveSection("record")}>
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Assessment
                  </Button>
                  <Button variant="outline" className="btn-secondary" size="lg" onClick={() => setActiveSection("analysis")}>
                    View AI Analysis
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="card-floating p-6 text-center">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Revolutionary Features</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Advanced AI technology meets sports science to create the most comprehensive
                  talent assessment platform ever built.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="card-floating p-8 text-center group interactive-glow">
                    <div
                      className={`inline-flex p-4 rounded-full bg-muted/20 mb-6 ${feature.color} group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Technology Showcase */}
            <section className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Advanced AI Analysis</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our proprietary AI models analyze every aspect of athletic performance with
                    precision that rivals professional sports science laboratories.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span>Real-time skeletal tracking and movement analysis</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-4"></div>
                      <span>Automated rep counting and form assessment</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-success rounded-full mr-4"></div>
                      <span>Performance benchmarking against national standards</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img src={aiAnalysisImage} alt="AI Analysis Interface" className="rounded-xl shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SAI TalentScout</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveSection("home")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === "home" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveSection("record")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === "record" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                }`}
              >
                Record Test
              </button>
              <button
                onClick={() => setActiveSection("analysis")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === "analysis" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                }`}
              >
                AI Analysis
              </button>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveSection("chat")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === "chat" ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"
                }`}
              >
                AI Coach
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{renderContent()}</main>

      {/* Floating Action Button for Chat */}
      {activeSection !== "chat" && (
        <button
          onClick={() => setActiveSection("chat")}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        >
          <Brain className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Index;
