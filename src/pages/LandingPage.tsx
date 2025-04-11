
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-hiring-background to-hiring-muted">
      <header className="container mx-auto flex justify-between items-center py-6 px-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-hiring-primary">JobHubSync</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            Log in
          </Button>
          <Button>
            Sign up
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-hiring-text">
            Revolutionizing The Job Search Experience
          </h2>
          <p className="text-lg md:text-xl mb-8 text-hiring-text/80 max-w-2xl mx-auto">
            Discover a smarter way to connect talent with opportunity. Our innovative 
            swipe-based UI and intelligent matching algorithm help companies and job seekers 
            find their perfect match faster and more efficiently.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/hiring">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4 text-center text-hiring-text/60">
        <p>© {new Date().getFullYear()} JobHubSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
