import {
  Code2,
  Trophy,
  Users,
  Zap,
  ChevronRight,
  Play,
  Star,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { onBoardUser } from "@/modules/auth/actions";

export default async function Home() {
  await onBoardUser();

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Interactive Coding",
      description:
        "Practice with real-world coding challenges and get instant feedback on your solutions.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Track Progress",
      description:
        "Monitor your improvement with detailed analytics and achievement systems.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Global Community",
      description:
        "Learn from thousands of developers worldwide and share your knowledge.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Feedback",
      description:
        "Get instant feedback on your solutions with detailed explanations.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Problems Solved" },
    { number: "10K+", label: "Active Developers" },
    { number: "25+", label: "Programming Languages" },
    { number: "98%", label: "Success Rate" },
  ];

  const problemCategories = [
    {
      level: "Beginner",
      title: "Easy Problems",
      description:
        "Perfect for getting started with basic programming concepts and syntax.",
      count: "500+ Problems",
      color: "amber",
    },
    {
      level: "Intermediate",
      title: "Medium Problems",
      description:
        "Challenge yourself with data structures and algorithm problems.",
      count: "800+ Problems",
      color: "indigo",
    },
    {
      level: "Advanced",
      title: "Hard Problems",
      description:
        "Master complex algorithms and compete in programming contests.",
      count: "300+ Problems",
      color: "amber",
    },
  ];

  return (
    <div className="mt-24 min-h-screen transition-colors">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center px-4 pt-16 min-h-screen">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-950 dark:hover:bg-amber-900 mb-8 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
          >
            <Star className="mr-2 w-4 h-4" />
            Join 10,000+ developers already coding
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-8 font-black text-gray-900 dark:text-white text-2xl md:text-5xl lg:text-6xl leading-tight">
            Master{" "}
            <span className="inline-block relative">
              <span className="inline-block bg-amber-500 dark:bg-amber-400 shadow-lg px-6 py-3 rounded-2xl text-white dark:text-gray-900 -rotate-1 transform">
                Problem
              </span>
            </span>{" "}
            Solving
            <br />
            with{" "}
            <span className="inline-block relative">
              <span className="inline-block bg-indigo-600 dark:bg-indigo-500 shadow-lg px-6 py-3 rounded-2xl text-white rotate-1 transform">
                Code
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-3xl text-gray-600 dark:text-gray-300 text-xl md:text-2xl leading-relaxed">
            Challenge yourself with thousands of coding problems, compete with
            developers worldwide, and accelerate your programming journey with
            real-time feedback and expert solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 shadow-lg hover:shadow-xl text-white dark:text-gray-900 transition-all hover:-translate-y-0.5 transform"
            >
              <Play className="mr-2 w-5 h-5" />
              Start Coding Now
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-indigo-50 dark:hover:bg-indigo-950 border-2 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300"
            >
              Browse Problems
            </Button>
          </div>

          {/* Stats */}
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-4xl">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 font-bold text-gray-900 dark:text-white text-3xl md:text-4xl">
                  {stat.number}
                </div>
                <div className="font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-gray-50 dark:bg-neutral-900/50 py-24"
      >
        <div className="mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-4xl md:text-5xl">
              Everything you need to{" "}
              <span className="text-amber-600 dark:text-amber-400">excel</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-xl">
              Our platform provides comprehensive tools and resources to help
              you become a better programmer
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg border-gray-200 dark:border-gray-700 transition-shadow duration-200"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${
                      index % 2 === 0
                        ? "bg-amber-100 dark:bg-amber-900"
                        : "bg-indigo-100 dark:bg-indigo-900"
                    } rounded-xl flex items-center justify-center ${
                      index % 2 === 0
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-indigo-600 dark:text-indigo-400"
                    } mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section id="problems" className="py-24">
        <div className="mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-gray-900 dark:text-white text-4xl md:text-5xl">
              Choose your{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                challenge
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-xl">
              From beginner-friendly puzzles to advanced algorithmic challenges
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-3">
            {problemCategories.map((category, index) => (
              <Card
                key={index}
                className={`border-2 hover:shadow-lg transition-all duration-200 ${
                  category.color === "amber"
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700"
                    : "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                }`}
              >
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className={`w-fit ${
                      category.color === "amber"
                        ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
                        : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                    }`}
                  >
                    {category.level}
                  </Badge>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </CardDescription>
                  <div
                    className={`font-semibold ${
                      category.color === "amber"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {category.count}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-600 dark:from-amber-600 to-amber-300 dark:to-indigo-600 py-24 rounded-md">
        <div className="mx-auto px-4 max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-white text-4xl md:text-5xl">
            Ready to start your coding journey?
          </h2>
          <p className="mb-8 text-white/90 text-xl">
            Join thousands of developers who are improving their skills every
            day
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 shadow-lg text-gray-900"
          >
            Get Started for Free
          </Button>
        </div>
      </section>
    </div>
  );
}
