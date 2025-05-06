import VideoPlayer from "./_components/VideoPlayer";

export default async function Home() {
  const code = `from manim import *


class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen`;
  return (
    <div className="p-4">
      <VideoPlayer code={code} />
    </div>
  );
}
