import { Badge } from "@/components/ui/badge";
import Navbar from "./_components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
                    Pointmation uses AI to generate beautiful mathematical animations from simple text prompts, powered by{" "}
                    <Badge variant={"secondary"}>manim code</Badge>
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href={"/chat"}>
                      Try Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">No coding required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Instant generation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">High-quality output</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <AspectRatio ratio={16 / 9}>
                  <video
                    className="h-full w-full object-cover rounded-lg"
                    loop
                    autoPlay
                    muted
                    playsInline
                    src="https://res.cloudinary.com/dae31fk75/video/upload/v1746950365/c5lc7n9zjxjm6dpmv2oe.mp4"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
