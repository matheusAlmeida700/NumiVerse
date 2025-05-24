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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { postService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z
    .string()
    .min(5, { message: "A resposta precisa ter pelo menos 5 caracteres" })
    .max(500, { message: "A resposta não pode ter mais de 500 caracteres" }),
});

interface AnswerFormProps {
  postId: string;
  onSuccess: () => void;
}

const AnswerForm = ({ postId, onSuccess }: AnswerFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast({
        title: "Erro ao adicionar resposta",
        description: "Você precisa estar logado para responder.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await postService.addAnswer(postId, {
        userId: user.id,
        text: values.text,
      });
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error adding answer:", error);
      toast({
        title: "Erro ao adicionar resposta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Escreva sua resposta..."
                  className="min-h-[100px] resize-none bg-card/50 border-white/20"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="flex justify-between">
                <FormMessage />
                <span className="text-xs text-white/60">
                  {field.value.length}/500 caracteres
                </span>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="submit"
            className="bg-space-purple hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Responder"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnswerForm;
