
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SolarSystemView from '@/components/SolarSystem';
import { useQuery } from '@tanstack/react-query';
import { planetService } from '@/services/planetService';

const SolarSystemPage = () => {
  useEffect(() => {
    document.title = "NumiVerse - Sistema Solar";
  }, []);

  // Fetch planets data from API
  const { data: planets, isLoading } = useQuery({
    queryKey: ['planets'],
    queryFn: planetService.getPlanets,
    retry: 1,
  });

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>

      <NavBar />

      <main className="flex-1 pt-20 pb-12">
        <section className="py-10 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
            Explore os Planetas Matemáticos
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <SolarSystemView />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolarSystemPage;
