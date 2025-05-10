import socket from "@/lib/socket/config";
import { useEffect } from "react";

function useWebsocket(callback: () => void, key?: unknown) {
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      if (key) {
        socket.emit("join-room", key);
        console.log("joining room", key);
      }
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("code-worker", () => {
      console.log("Video created event received");
      callback();
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [callback, key]);
}

export default useWebsocket;
