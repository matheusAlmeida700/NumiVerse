
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SolarSystem from "@/components/SolarSystem";
import { Rocket, Star } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.title = "NumiVerse - Space Math Adventure";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient">
      {/* Space background */}
      <div className="space-stars"></div>
      
      <NavBar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-32 pb-20 px-4 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-float">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-glow mb-6">
                Explore the <span className="text-space-purple">NumiVerse</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
                Embark on an interstellar journey through mathematics. 
                Learn, play, and master math concepts as you explore planets in our cosmic adventure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button className="text-lg px-8 py-6 bg-space-purple hover:bg-space-purple/80 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Begin Your Journey
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
              <div className="bg-card/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-3xl font-bold text-white">6</p>
                <p className="text-white/60 text-sm">Planets</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-white/60 text-sm">Lessons</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-3xl font-bold text-white">20+</p>
                <p className="text-white/60 text-sm">Games</p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <p className="text-3xl font-bold text-white">100K+</p>
                <p className="text-white/60 text-sm">Space Learners</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solar System Section */}
        <section className="py-10 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
            Explore Math Planets
          </h2>
          <SolarSystem />
        </section>
        
        {/* Features section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
              Why NumiVerse?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-space-purple/30 flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-space-purple" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Gamified Learning</h3>
                <p className="text-white/70 text-center">
                  Earn XP, collect achievements, and level up as you complete lessons and challenges.
                </p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-space-blue/30 flex items-center justify-center mb-4">
                  <Rocket className="w-8 h-8 text-space-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Interactive Content</h3>
                <p className="text-white/70 text-center">
                  Engage with interactive 3D models, visualizations, and games that make math concepts come alive.
                </p>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Progressive Mastery</h3>
                <p className="text-white/70 text-center">
                  Start with basics and gradually advance through increasingly complex concepts at your own pace.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to explore the NumiVerse?</h2>
                <p className="text-white/70">
                  Join thousands of space explorers mastering math through cosmic adventures.
                </p>
              </div>
              <Link to="/register">
                <Button className="whitespace-nowrap bg-space-purple hover:bg-space-purple/80">
                  Launch Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
