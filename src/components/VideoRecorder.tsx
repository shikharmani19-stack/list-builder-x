import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Play } from "lucide-react";

export const VideoRecorder = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Record Your Assessment</h2>
      <Card className="p-6 space-y-6">
        <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground">
          <div className="flex flex-col items-center">
            <Camera className="h-10 w-10 mb-3" />
            <p>Camera preview placeholder</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="btn-hero">
            <Play className="h-4 w-4 mr-2" /> Start Recording
          </Button>
          <Button variant="outline">Upload Existing Video</Button>
        </div>
      </Card>
    </div>
  );
}
