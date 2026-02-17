'use client';

import { Zap, Layout, Shield, Target, BookOpen, BarChart3 } from 'lucide-react';

const features = [
  {
    name: 'Smart Quiz Creation',
    description: 'Easily design comprehensive assessments with multiple subject supports and rich formatting.',
    icon: Layout,
    color: 'bg-blue-500',
  },
  {
    name: 'Real-time Analytics',
    description: 'Track student progress instantly with detailed performance metrics and visual reports.',
    icon: BarChart3,
    color: 'bg-purple-500',
  },
  {
    name: 'Goal Targeted Learning',
    description: 'Custom learning paths based on performance data to focus on areas that need improvement.',
    icon: Target,
    color: 'bg-green-500',
  },
  {
    name: 'Secure Assessments',
    description: 'End-to-end encryption and robust authentication to ensure exam integrity and data privacy.',
    icon: Shield,
    color: 'bg-red-500',
  },
  {
    name: 'Instant Feedback',
    description: 'Students receive grades and detailed breakdowns immediately after finishing a quiz.',
    icon: Zap,
    color: 'bg-amber-500',
  },
  {
    name: 'Vast Library',
    description: 'Access a growing repository of subjects and quizzes curated for various education levels.',
    icon: BookOpen,
    color: 'bg-cyan-500',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for academic success
          </h2>
          <p className="text-lg text-gray-600">
            Prosnokorta provides the tools for both teachers and students to excel in a digital-first learning environment.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={feature.name}
              className="p-8 transition-all border border-gray-100 rounded-2xl hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 group animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center p-3 mb-6 rounded-xl ${feature.color} text-white shadow-lg shadow-${feature.color.split('-')[1]}-500/20`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                {feature.name}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
