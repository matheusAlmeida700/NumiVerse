import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { postService } from "@/services/api";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import PostForm from "@/components/QandA/PostForm";

const QandAListPage = () => {
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getAll,
  });

  useEffect(() => {
    if (error) {
      toast.error("Falha ao carregar dúvidas", {
        description: "Tente novamente mais tarde",
      });
    }
  }, [error]);

  const handlePostCreated = () => {
    setShowForm(false);
    refetch();
    toast.success("Dúvida postada com sucesso!");
  };

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

  return (
    <div className="min-h-screen bg-space-gradient">
      <NavBar />

      <div className="max-w-5xl mx-auto pt-32 px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Dúvidas da Comunidade
            </h1>
            <p className="text-white/80">
              Tire suas dúvidas ou ajude outros alunos com seus conhecimentos
            </p>
          </div>

          {isAuthenticated && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-space-purple hover:bg-purple-700 flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Nova Dúvida
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 bg-card p-6 rounded-lg border border-white/10 shadow-lg">
            <PostForm
              onSuccess={handlePostCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {!isAuthenticated && !showForm && (
          <Card className="mb-8 border-white/10 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-center text-white/80">
                <Link to="/auth" className="text-space-purple hover:underline">
                  Faça login
                </Link>{" "}
                para criar uma nova dúvida ou responder outras pessoas
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="border-white/10 bg-card/80 backdrop-blur-sm animate-pulse h-40"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Card className="border-white/10 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-white/80">Ainda não há dúvidas postadas</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post: any) => (
              <Link key={post._id} to={`/qanda/${post._id}`}>
                <Card className="border-white/10 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all hover:scale-[1.01]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={`${getCategoryColor(post.category)}`}>
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
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 line-clamp-3">{post.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <span className="text-xs text-white/60">
                      {post.answers?.length || 0}{" "}
                      {post.answers?.length === 1 ? "resposta" : "respostas"}
                    </span>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-space-purple"
                    >
                      Ver mais
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QandAListPage;
