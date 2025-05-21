import { Button } from "@/components/ui/button";
import { Answer } from "@/types/lesson";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SortableQuestionProps {
  answers: Answer[];
  sortableItems: string[];
  moveItemInSortList: (index: number, direction: "up" | "down") => void;
  showFeedback: boolean;
}

const SortableQuestion = ({
  answers,
  sortableItems,
  moveItemInSortList,
  showFeedback,
}: SortableQuestionProps) => {
  return (
    <div className="w-full space-y-2">
      {sortableItems.map((itemId, index) => {
        const answer = answers.find((a) => a.id === itemId);
        return (
          <div
            key={itemId}
            className="flex items-center gap-2 p-3 bg-card/70 border border-white/10 rounded-lg"
          >
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveItemInSortList(index, "up")}
                disabled={index === 0 || showFeedback}
                className="h-7 w-7"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveItemInSortList(index, "down")}
                disabled={index === sortableItems.length - 1 || showFeedback}
                className="h-7 w-7"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <span className="flex-1">{answer?.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SortableQuestion;
