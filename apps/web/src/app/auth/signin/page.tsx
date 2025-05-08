"use client";

import { Suspense } from "react";
import SignIn from "../_components/SignIn";

export default function Page() {
  return (
    <Suspense fallback={<>Loading..</>}>
      <SignIn />
    </Suspense>
  );
}
