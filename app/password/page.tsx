import type { Metadata } from "next";
import { LockScreen } from "./LockScreen";

export const metadata: Metadata = { title: "locked", robots: { index: false } };

export default function PasswordPage() {
  return <LockScreen />;
}
