import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LessonPlayer from "@/components/LessonPlayer";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { lessonData } from "@/data/lessonData";

const LessonView = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  useEffect(() => {
    if (lessonId && lessonData[lessonId]) {
      document.title = `NumiVerse - ${lessonData[lessonId].title}`;
    } else {
      document.title = "NumiVerse - Lição";
    }
  }, [lessonId]);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
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
