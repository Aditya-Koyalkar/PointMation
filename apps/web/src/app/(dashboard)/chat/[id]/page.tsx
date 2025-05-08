type Props = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params }: Props) {
  const id = params.id;
  return <>{id}</>;
}
