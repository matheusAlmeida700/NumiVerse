import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const formSchema = z.object({
  category: z.enum([
    "algebra",
    "aritmetica",
    "geometria",
    "estatistica",
    "funcoes",
    "outros",
  ]),
  content: z
    .string()
    .min(10, { message: "A dúvida precisa ter pelo menos 10 caracteres" })
    .max(600, { message: "A dúvida não pode ter mais de 600 caracteres" }),
});

interface PostFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const PostForm = ({ onSuccess, onCancel }: PostFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "algebra",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast.error("Você precisa estar logado para postar uma dúvida");
      return;
    }

    setIsSubmitting(true);
    try {
      await postService.create({
        userId: user.id,
        category: values.category,
        content: values.content,
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Erro ao criar postagem");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="bg-card border-white/20">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card">
                  <SelectItem value="algebra">Álgebra</SelectItem>
                  <SelectItem value="aritmetica">Aritmética</SelectItem>
                  <SelectItem value="geometria">Geometria</SelectItem>
                  <SelectItem value="estatistica">Estatística</SelectItem>
                  <SelectItem value="funcoes">Funções</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Dúvida</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva sua dúvida em detalhes..."
                  className="min-h-[120px] resize-none bg-card border-white/20"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="flex justify-between">
                <FormMessage />
                <span className="text-xs text-white/60">
                  {field.value.length}/600 caracteres
                </span>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-space-purple hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Postar dúvida"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
