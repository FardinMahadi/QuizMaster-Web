'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden md:pt-32 md:pb-24">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-400/20 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium border rounded-full bg-white/50 backdrop-blur-sm shadow-sm border-gray-200/50 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-gray-600">Reimagining the search for knowledge</span>
        </div>
        
        <h1 className="max-w-4xl mx-auto mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Master Any Subject with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Prosnokorta</span>
        </h1>
        
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          The ultimate platform for teachers and students. Create comprehensive quizzes, track real-time progress, and achieve academic excellence.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link href="/register">
            <Button size="lg" className="px-8 text-lg font-semibold rounded-full group">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="px-8 text-lg font-semibold rounded-full bg-white">
              Student Login
            </Button>
          </Link>
        </div>

        {/* Mockup Preview */}
        <div className="relative mt-16 md:mt-24 group animate-in fade-in zoom-in-95 duration-1000 delay-500">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <div className="relative overflow-hidden bg-white border border-gray-200 shadow-2xl rounded-2xl aspect-[16/9]">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Platform Dashboard Preview" 
              className="object-cover w-full h-full opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
              <div className="p-4 bg-white/90 backdrop-blur-md rounded-xl border shadow-lg transform translate-y-4">
                 <p className="font-semibold text-gray-900">Real-time Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
