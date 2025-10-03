import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target } from "lucide-react";

export const PerformanceDashboard = () => {
  const goals = [
    { label: "Speed", value: 82 },
    { label: "Agility", value: 90 },
    { label: "Endurance", value: 74 },
  ];

  return (
    <div className="container mx-auto px-6 py-10 space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Trophy className="text-primary" /> Performance Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {goals.map((g) => (
          <Card key={g.label} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{g.label}</div>
              <Target className="text-primary" />
            </div>
            <Progress value={g.value} />
            <div className="text-sm text-muted-foreground">{g.value}% of goal</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
