import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Loader } from "lucide-react";
import Hero from "../../assets/numiVerse.png";
import NumiShip from "../../assets/login/naveNumi.png";
import Satelite from "../../assets/login/satelite.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulating login for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store a fake token for now - this will be replaced with the real token from the API
      localStorage.setItem("auth_token", "fake_token_for_development");

      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha no login. Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient flex flex-col items-center justify-center px-4 py-12">
      {/* Background stars */}
      <div className="space-stars"></div>
      <img
        className="w-96 hidden md:block fixed top-32 left-28 animate-float"
        src={NumiShip}
        alt=""
      />
      <img
        className="w-96 hidden md:block fixed top-80 right-20 animate-float"
        src={Satelite}
        alt=""
      />

      {/* Animated planet */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-space-purple opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-space-blue opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img className="mx-auto animate-float" src={Hero} alt="" />
        </div>

        <Card className="bg-card/80 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Acesse sua conta para continuar sua jornada espacial
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 pr-10"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="text-right">
                  <Link
                    to="/recuperar-senha"
                    className="text-sm text-space-blue hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-space-purple hover:bg-space-purple/80"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              <p className="text-sm text-center text-white/60">
                Ainda não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="text-space-blue hover:underline"
                >
                  Registre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Guest entry option */}
        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="link" className="text-white/80 hover:text-white">
              Continuar como convidado
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
