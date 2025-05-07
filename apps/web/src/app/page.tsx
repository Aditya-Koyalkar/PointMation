import { Badge } from "@/components/ui/badge";
import Navbar from "./_components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-block" variant="secondary">
                    AI-Powered Animation
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Turn Text Prompts Into Stunning Animated Videos
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Pointmation uses AI to generate beautiful mathematical animations from simple text prompts, powered by manim code.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#demo">
                      Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-purple-50 via-white to-blue-50 p-2 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-24 w-24 text-purple-500 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm dark:bg-black/50"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-white/80 dark:bg-gray-950/80">
                    <Play className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
