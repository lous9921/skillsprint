"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    if (error) {
      setMsg(error.message);
    } else {
      router.push("/courses");
    }
  }

  return (
    <>
      <header className="nav">
        <div className="brand">Skill<span>Sprint</span></div>
        <Link href="/">Home</Link>
        <Link href="/signup">Create account</Link>
      </header>
      <main className="wrap">
        <form className="form card" onSubmit={submit}>
          <h1>Welcome back</h1>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="primary">Log in</button>
          {msg && <div className="notice">{msg}</div>}
        </form>
      </main>
    </>
  );
}
