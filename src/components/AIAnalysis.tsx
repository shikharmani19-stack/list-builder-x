import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle2, Sparkles } from "lucide-react";

export const AIAnalysis = () => {
  const metrics = [
    { label: "Form Score", value: "92/100" },
    { label: "Rep Count", value: "48" },
    { label: "Tempo Consistency", value: "96%" },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Brain className="h-7 w-7 text-primary" /> AI Analysis
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            <h3 className="font-semibold text-lg">Key Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((m) => (
              <Card key={m.label} className="p-4 text-center">
                <div className="text-sm text-muted-foreground">{m.label}</div>
                <div className="text-2xl font-bold text-primary">{m.value}</div>
              </Card>
            ))}
          </div>
        </Card>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success" />
            <h3 className="font-semibold text-lg">Highlights</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Excellent lower-body alignment and knee tracking</li>
            <li>Consistent cadence with minimal variability</li>
            <li>Meets national U17 standard for sprint drill</li>
          </ul>
          <Badge className="bg-primary/20 text-primary border-primary/30">Verified by AI</Badge>
        </Card>
      </div>
    </div>
  );
}
