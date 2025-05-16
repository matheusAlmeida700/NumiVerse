
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import { isValidEmail } from "@/lib/utils";
import Hero from "../../assets/NumiVerse.png"; // Fixed uppercase 'N' in NumiVerse
import NumiShip from "../../assets/register/alien.png";
import Satelite from "../../assets/login/satelite.png";
import { useAuth } from "@/hooks/useAuth";

const SignUpPage = () => {
  const { register, isRegistering } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    register({ name, email, password });
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
        className="w-96 hidden md:block fixed top-64 right-20 animate-float"
        src={Satelite}
        alt=""
      />

      {/* Animated planets */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-space-blue opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-space-purple opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-2">
          <img className="mx-auto animate-float" src={Hero} alt="" />
        </div>

        <Card className="bg-card/80 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Registre-se para iniciar sua aventura espacial
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50"
                  disabled={isRegistering}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

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
                  disabled={isRegistering}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
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
                    disabled={isRegistering}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-background/50 pr-10"
                    disabled={isRegistering}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-space-purple hover:bg-space-purple/80"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <Loader size={16} className="mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Registrar"
                )}
              </Button>

              <p className="text-sm text-center text-white/60">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-space-blue hover:underline">
                  Faça login
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

export default SignUpPage;
