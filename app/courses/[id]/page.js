"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "../../../lib/supabase";

const courseData = {
  "ai-for-work": { title: "AI for Work", category: "AI & Productivity", desc: "Learn to use AI tools to speed up everyday work tasks — writing, research, and decision-making." },
  "chatgpt-productivity": { title: "ChatGPT Productivity", category: "AI & Productivity", desc: "Practical ChatGPT workflows for email, planning, and problem-solving on the job." },
  "excel-data-analysis": { title: "Excel & Data Analysis", category: "Data", desc: "Core Excel skills for organizing, analyzing, and presenting data at work." },
  "digital-marketing": { title: "Digital Marketing", category: "Marketing", desc: "Fundamentals of reaching customers online — social, email, and basic ad strategy." },
  "python-fundamentals": { title: "Python Fundamentals", category: "Coding", desc: "Get comfortable with Python basics — variables, loops, and simple scripts." },
  "project-management": { title: "Project Management", category: "Business", desc: "Core project management skills — timelines, tasks, and keeping work on track." },
};

export default function CourseDetail({ params }) {
  const course = courseData[params.id];
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    supabaseBrowser().auth.getUser().then(({ data }) => {
      setStatus(data?.user ? "in" : "out");
    });
  }, []);

  if (!course) {
    return (
      <>
        <header className="nav">
          <div className="brand">Skill<span>Sprint</span></div>
          <Link href="/courses">Courses</Link>
        </header>
        <main className="wrap">
          <h1>Course not found</h1>
          <p className="muted">We couldn't find that course.</p>
          <Link className="primary" href="/courses">Back to courses</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="nav">
        <div className="brand">Skill<span>Sprint</span></div>
        <Link href="/courses">Courses</Link>
        {status !== "in" && <Link href="/login">Login</Link>}
      </header>
      <main className="wrap">
        <span className="tag">{course.category}</span>
        <h1>{course.title}</h1>
        <p className="muted">{course.desc}</p>
        <p className="muted">8 practical lessons · Beginner</p>

        {status === "loading" && <p className="muted">Checking your account...</p>}

        {status === "in" && (
          <div className="notice">
            You're enrolled! Lesson content for this course is coming soon.
          </div>
        )}

        {status === "out" && (
          <>
            <Link className="primary" href="/signup">Sign up to start</Link>
            {" "}
            <Link href="/login">Already have an account? Log in</Link>
          </>
        )}
      </main>
    </>
  );
}
