
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LessonPlayer from "@/components/LessonPlayer";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { lessonService } from "@/services/lessonService";
import { lessonData } from "@/data/lessonData";

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  // Attempt to get lesson data from API first, fall back to local data
  const { data: lessonFromApi } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonId ? lessonService.getLessonById(lessonId) : Promise.reject('No lessonId'),
    enabled: !!lessonId,
    retry: 1,
  });

  // Use API data if available, otherwise fall back to local data
  const currentLesson = lessonFromApi || (lessonId && lessonData[lessonId]);

  useEffect(() => {
    if (currentLesson) {
      document.title = `NumiVerse - ${currentLesson.title}`;
    } else {
      document.title = "NumiVerse - Lição";
    }
  }, [currentLesson]);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-16">
        <LessonPlayer />
      </main>

      <Footer />
    </div>
  );
};

export default LessonView;
