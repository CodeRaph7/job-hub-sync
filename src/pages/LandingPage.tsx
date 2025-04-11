
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Users, TrendingUp, Facebook, Twitter, Linkedin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold text-blue-600">JobBoard</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </nav>
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/hiring">Wanna Sign Up or Login?</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Find Your Dream Job</h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of employers and job seekers on JobBoard, the #1 platform for connecting talent with opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">I'm a Job Seeker</Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">I'm an Employer</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobBoard?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Job Search</h3>
              <p className="text-gray-600">Find jobs that match your skills and preferences with our advanced search tools.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Top Employers</h3>
              <p className="text-gray-600">Connect with leading companies and startups looking for talent like you.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
              <p className="text-gray-600">Access resources and opportunities to grow your career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"JobBoard helped me find my dream job in just a few weeks. Highly recommended!"</p>
              <p className="font-semibold">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"As an employer, JobBoard has made hiring so much easier. The platform is intuitive and effective."</p>
              <p className="font-semibold">- Jane Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <form className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32" 
                required
              ></textarea>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="text-center">&copy; {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
