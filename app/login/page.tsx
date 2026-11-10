import type { Metadata } from "next";
import { LoginApp } from "./LoginApp";

export const metadata: Metadata = { title: "team corner", robots: { index: false, follow: false } };

export default function LoginPage() {
  return <LoginApp />;
}
