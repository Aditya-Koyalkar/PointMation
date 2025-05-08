import PromptBox from "@/app/_components/PromptBox";

type Props = {};

export default function ChatPage() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1"></div>
      <div className="flex justify-center">
        <PromptBox />
      </div>
    </div>
  );
}
