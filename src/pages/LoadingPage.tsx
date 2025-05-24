import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const LoadingPage = () => (
  <div className="min-h-screen flex flex-col bg-space-gradient">
    <div className="space-stars"></div>
    <NavBar />
    <main className="flex-1 pt-24 pb-16 container mx-auto px-4 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </main>
    <Footer />
  </div>
);

export default LoadingPage;
