
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginCredentials, RegisterData, UserProfile } from '@/services/authService';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });

  // Query for getting the current user profile
  const { 
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser 
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated, // Only run if authenticated
    retry: false,
    meta: {
      onError: () => {
        // If error, try to use local data
        const localUser = authService.getUserFromLocal();
        if (!localUser) {
          setIsAuthenticated(false);
          localStorage.removeItem('auth_token');
        }
      }
    }
  });

  // Login mutation
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        setIsAuthenticated(true);
        authService.saveUserToLocal(data.user);
        toast({
          title: "Sucesso!",
          description: "Login realizado com sucesso",
        });
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        navigate('/');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Falha no login. Verifique suas credenciais.",
        variant: "destructive",
      });
    }
  });

  // Register mutation
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso",
      });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Falha ao criar conta. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      localStorage.removeItem('auth_token');
      queryClient.clear();
      toast({
        title: "Desconectado",
        description: "Você foi desconectado com sucesso",
      });
      navigate('/login');
    }
  });

  return {
    user: user as UserProfile | undefined,
    login,
    register,
    logout,
    isAuthenticated,
    isLoggingIn,
    isRegistering,
    isLoadingUser,
    userError,
    refetchUser
  };
};
