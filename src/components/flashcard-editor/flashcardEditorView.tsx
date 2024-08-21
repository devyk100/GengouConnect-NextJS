"use client";
import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dynamically import CodeEditor to avoid SSR issues
const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

function HomePage() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <div className="flex w-screen h-screen items-center justify-center p-0 m-0">
      <Card className="flex flex-col w-full max-w-[500px] h-full">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="w-full h-full">
            <CodeEditor
              value={code}
              language="javascript" // Adjust if needed
              placeholder="Please enter JS code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "Montserrat,ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                width: "100% !important", // Ensure CodeEditor uses full width of container
                height: "100% !important", // Ensure CodeEditor uses full height of container
                boxSizing: "border-box", // Include padding and border in width calculation
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
