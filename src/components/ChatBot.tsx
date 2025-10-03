import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useState } from "react";

export const ChatBot = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hi! I’m your AI Coach. Ask me about your training." },
  ]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "Thanks! I’ll analyze that." }]);
    setText("");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Brain className="text-primary" /> AI Coach
      </h2>
      <Card className="p-6 flex flex-col h-[70vh]">
        <div className="flex-1 space-y-3 overflow-auto mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-lg max-w-[75%] ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted/40"}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Type your message" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
