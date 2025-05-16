import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumiShip from "../assets/register/alien.png";
import Satelite from "../assets/login/satelite.png";
import Ship from "../assets/login/naveNumi.png";
import Logo from "/src/assets/numi/numi-ship.png";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/solar" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password);
        toast({
          title: "Login bem-sucedido",
          description: "Bem Vindo ao Corretor de Redações!",
        });
      } else {
        if (!formData.name || formData.name.trim() === "") {
          throw new Error("Nome é obrigatório");
        }
        await signup(formData.name, formData.email, formData.password);
        toast({
          title: "Conta criada",
          description: "Sua conta foi criada com sucesso!",
        });
      }
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao entrar. Por favor, tente novamente.";
      setError(errorMessage);
      toast({
        title: "Erro ao entrar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setError(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <PageTransition>
      <div className="space-stars"></div>
      <div className="min-h-screen bg-space-gradient flex flex-col">
        <header className="w-full px-6 pt-6 flex justify-between items-center z-10">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="w-12 h-12 rotate-6" />
            <span className="text-xl font-bold text-white text-glow">
              NumiVerse
            </span>
          </Link>
        </header>
        <img
          className="w-96 hidden md:block fixed top-32 left-28 animate-float"
          src={NumiShip}
          alt=""
        />
        <img
          className="w-96 hidden md:block fixed top-64 right-20 animate-float"
          src={Satelite}
          alt=""
        />
        <img
          className="w-96 hidden md:block fixed bottom-20 left-56 animate-float"
          src={Ship}
          alt=""
        />
        <div className="absolute top-72 left-28 w-40 h-40 rounded-full bg-space-blue opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-60 right-20 w-60 h-60 rounded-full bg-space-purple opacity-20 blur-3xl animate-pulse"></div>

        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card className="shadow-xl border-opacity-30 dark:bg-slate-900/90 backdrop-blur-lg">
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={switchTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Cadastre-se</TabsTrigger>
                </TabsList>

                <CardContent className="p-6 pt-8">
                  <motion.div
                    key={activeTab}
                    initial={{
                      opacity: 0,
                      x: activeTab === "login" ? -20 : 20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <CardTitle className="text-2xl font-bold">
                      {activeTab === "login"
                        ? "Bem-vindo de volta"
                        : "Criar conta"}
                    </CardTitle>

                    <CardDescription>
                      {activeTab === "login"
                        ? "Digite suas credenciais para acessar sua conta"
                        : "Preencha seus dados para criar uma nova conta"}
                    </CardDescription>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {activeTab === "signup" && (
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Nome Completo
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="pl-10"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Senha
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <>
                            {activeTab === "login" ? "Login" : "Criar Conta"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                </CardContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;
