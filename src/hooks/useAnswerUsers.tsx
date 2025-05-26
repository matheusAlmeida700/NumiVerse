import { useEffect, useState } from "react";
import { userService } from "@/services/api/index";
import { Answer } from "@/types/post";

export function useAnswerUsers(answers: Answer[]) {
  const [users, setUsers] = useState<Record<string, { name: string }>>({});

  useEffect(() => {
    const loadUsers = async () => {
      const uniqueUserIds = [...new Set(answers.map((a) => a.userId))];

      const userData: Record<string, { name: string }> = {};

      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const user = await userService.getById(userId);
            userData[userId] = { name: user.name };
          } catch (err) {
            console.error(`Erro ao buscar usuário ${userId}`, err);
          }
        })
      );

      setUsers(userData);
    };

    if (answers.length > 0) loadUsers();
  }, [answers]);

  return users;
}
