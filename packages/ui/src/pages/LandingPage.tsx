import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Mail, LayoutDashboard, ArrowRight } from "lucide-react";

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HireTrail
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Track your job search <br />
                <span className="text-blue-600">without the chaos.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Automatically organize your applications from Gmail, manage your interview pipeline, and land your dream job faster.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/login">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Start Tracking Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gmail Integration</h3>
                <p className="text-slate-600">
                  Automatically fetch and categorize applications from your inbox. No more manual entry.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kanban Board</h3>
                <p className="text-slate-600">
                  Visualize your pipeline. Drag and drop applications from Applied to Offer.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insights</h3>
                <p className="text-slate-600">
                  Track your response rates and optimize your strategy with built-in analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Prop List */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Why HireTrail?</h2>
                <ul className="space-y-4">
                  {[
                    "Zero manual data entry with Gmail sync",
                    "Never miss an interview follow-up",
                    "Centralized notes for every application",
                    "Completely free for job seekers"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span className="text-slate-200 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                   <Link to="/login">
                      <Button variant="secondary" size="lg">Get Started Now</Button>
                   </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
                        <span className="font-medium text-white">Software Engineer - Google</span>
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-300">In Progress</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
                        <span className="font-medium text-white">Frontend Dev - Netflix</span>
                        <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300">Interview</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
                        <span className="font-medium text-white">Fullstack - Amazon</span>
                        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">Offer</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© {new Date().getFullYear()} HireTrail. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
