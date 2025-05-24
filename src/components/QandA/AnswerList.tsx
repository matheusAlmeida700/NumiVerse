import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { postService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Answer } from "@/types/post";
import { useUser } from "@/hooks/useUserData";
import usePost from "@/hooks/usePost";
import { useParams } from "react-router-dom";

interface AnswerListProps {
  postId: string;
  answers: Answer[];
  currentUserId?: string;
  onAnswerDeleted: () => void;
}

const AnswerList = ({
  postId,
  answers,
  currentUserId,
  onAnswerDeleted,
}: AnswerListProps) => {
  const { id } = useParams<{ id: string }>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: post } = usePost(id);

  useEffect(() => {
    if (post?.userId) {
      setUserId(post.userId);
    }
  }, [post]);

  const { data: answerUser } = useUser(userId);

  const handleDeleteAnswer = async (answerId: string) => {
    try {
      setDeletingId(answerId);
      await postService.deleteAnswer(postId, answerId);
      toast({
        title: "Resposta removida",
        description: "Sua resposta foi removida com sucesso.",
      });
      onAnswerDeleted();
    } catch (error) {
      console.error("Error deleting answer:", error);
      toast({
        title: "Erro ao remover resposta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {answers
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        )
        .map((answer) => (
          <Card
            key={answer._id}
            className="border-white/10 bg-card/70 backdrop-blur-sm"
          >
            <CardContent className="pt-6">
              <p className="text-white/90 whitespace-pre-wrap">{answer.text}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-white/60">
              <span>{answerUser?.name}</span>

              <div className="flex items-center gap-3">
                <span>
                  {answer.createdAt &&
                    formatDistanceToNow(new Date(answer.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                </span>

                {currentUserId === answer.userId && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-white/60 hover:text-white hover:bg-transparent"
                      >
                        <Trash size={22} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover resposta</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover esta resposta?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteAnswer(answer._id!)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {deletingId === answer._id
                            ? "Removendo..."
                            : "Remover"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default AnswerList;
