import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import PostForm from "@/components/QandA/PostForm";
import usePost from "@/hooks/usePost";
import { Post } from "@/types/post";
import Footer from "@/components/Footer";

const QandAListPage = () => {
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const { data: posts = [], isLoading, error, refetch } = usePost();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar dúvidas",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }, [error]);

  const handlePostCreated = () => {
    setShowForm(false);
    refetch();
    toast({
      title: "Dúvida postada",
      description: "Sua dúvida foi postada com sucesso",
    });
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
      <div className="space-stars"></div>
      <NavBar />

      <div className="max-w-5xl mx-auto pt-32 px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="flex items-center text-3xl font-bold text-white mb-2">
              <MessageCircleQuestion className="w-10 h-10 text-space-purple mr-3" />
              Dúvidas da Comunidade
            </h1>
            <p className="text-white/80">
              Tire suas dúvidas ou ajude outros alunos com seus conhecimentos
            </p>
          </div>

          {isAuthenticated && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-space-purple hover:bg-purple-700 flex items-center gap-2 mt-6 md:mt-0"
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
            {posts.map((post: Post) => (
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
