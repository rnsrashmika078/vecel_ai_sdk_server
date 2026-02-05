// middleware.ts
import { NextResponse } from "next/server";

export function middleware() {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "*");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
