import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import AnswerForm from "@/components/QandA/AnswerForm";
import AnswerList from "@/components/QandA/AnswerList";
import { Skeleton } from "@/components/ui/skeleton";
import usePost from "@/hooks/usePost";
import { useUser } from "@/hooks/useUserData";

const QandADetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);

  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
    refetch: refetchPost,
  } = usePost(id);

  useEffect(() => {
    if (post?.userId) {
      setUserId(post.userId);
    }
  }, [post]);

  const {
    data: postUser,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser(userId);

  const { toast } = useToast();

  useEffect(() => {
    if (postError) {
      toast({
        title: "Erro ao carregar",
        description: "Falha ao carregar detalhes da dúvida",
        variant: "destructive",
      });
      navigate("/qanda");
    }
  }, [postError, navigate]);

  const getCategoryName = (category: string) => {
    const categories = {
      algebra: "Álgebra",
      aritmetica: "Aritmética",
      geometria: "Geometria",
      estatistica: "Estatística",
      funcoes: "Funções",
      outros: "Outros",
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      algebra: "bg-blue-500",
      aritmetica: "bg-green-500",
      geometria: "bg-purple-500",
      estatistica: "bg-orange-500",
      funcoes: "bg-pink-500",
      outros: "bg-gray-500",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  const handleAnswerAdded = () => {
    refetchPost();
  };

  return (
    <div className="min-h-screen bg-space-gradient">
      <div className="space-stars"></div>
      <NavBar />

      <div className="max-w-5xl mx-auto pt-32 px-4 pb-16">
        <Button
          variant="ghost"
          className="text-white/80 hover:text-white mb-6"
          onClick={() => navigate("/qanda")}
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para lista de dúvidas
        </Button>

        {isPostLoading ? (
          <div>
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-24 mb-8" />
            <Skeleton className="h-40 w-full mb-6" />
          </div>
        ) : post ? (
          <>
            <div className="mb-8">
              <Card className="border-white/10 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge
                      className={`${getCategoryColor(post.category)} mb-2`}
                    >
                      {getCategoryName(post.category)}
                    </Badge>
                    <span className="text-xs text-white/60">
                      {post.createdAt &&
                        formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/80 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>
                </CardHeader>
                <CardFooter className="text-sm text-white/60">
                  Postado por Usuário {postUser?.name}
                </CardFooter>
              </Card>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={22} />
                <h2 className="text-xl font-semibold text-white">
                  Respostas ({post.answers?.length || 0})
                </h2>
              </div>

              {isAuthenticated ? (
                <Card className="border-white/10 bg-card/80 backdrop-blur-sm mb-6">
                  <CardContent className="pt-6">
                    <AnswerForm
                      postId={post._id!}
                      onSuccess={handleAnswerAdded}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-white/10 bg-card/80 backdrop-blur-sm mb-6">
                  <CardContent className="pt-6">
                    <p className="text-center text-white/80">
                      <Link
                        to="/auth"
                        className="text-space-purple hover:underline"
                      >
                        Faça login
                      </Link>{" "}
                      para responder esta dúvida
                    </p>
                  </CardContent>
                </Card>
              )}

              {post.answers && post.answers.length > 0 ? (
                <AnswerList
                  postId={post._id!}
                  answers={post.answers}
                  currentUserId={user?.id}
                  onAnswerDeleted={refetchPost}
                />
              ) : (
                <Card className="border-white/10 bg-card/80 backdrop-blur-sm">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-white/80">
                      Ainda não há respostas para esta dúvida
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default QandADetailPage;
