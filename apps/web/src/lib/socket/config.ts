"use client";

import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_WORKER_SERVER_URL);

export default socket;
