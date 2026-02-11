import Navbar from "@/components/Navbars/Navbar";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, CheckCircle, AlertTriangle, Shield, Heart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
          <Image
            src="/large-tsunami-wave-crashing-into-city.jpg"
            alt="Emergency Response Team"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 px-4 md:px-6 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-200 backdrop-blur-md mb-4 shadow-lg shadow-red-900/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase">Active Storm Response: Leonardo</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl drop-shadow-2xl">
            Rapid Emergency Response for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Ksar El Kebir</span>
          </h1>

          <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
            Coordinating rescue efforts, managing resources, and protecting our community during critical situations. Enhancing resilience through unity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full justify-center">
            <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105 border-0">
              I Need Help
              <AlertTriangle className="ml-2 h-5 w-5 fill-current" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8 border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 transition-all">
              Become a Volunteer
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-20">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/80 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* 2. Live Statistics Section */}
      <section className="py-24 relative bg-zinc-50 dark:bg-black/95 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10 m-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              Live Situation <span className="text-red-600">Overview</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
              Real-time data from our operations center. Transparency and efficiency in every action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <AlertTriangle className="h-32 w-32 text-red-600" />
              </div>
              <div className="relative flex flex-col gap-6">
                <div className="p-4 bg-white dark:bg-zinc-800 w-fit rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <Activity className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">24</h3>
                  <p className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mt-2">Active Emergencies</p>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-[30%] rounded-full shadow-[0_0_10px_rgba(220,38,38,0.4)]" />
                </div>
                <p className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                  <span className="text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded text-xs">↑ 12%</span> vs last hour
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <CheckCircle className="h-32 w-32 text-zinc-600" />
              </div>
              <div className="relative flex flex-col gap-6">
                <div className="p-4 bg-white dark:bg-zinc-800 w-fit rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <CheckCircle className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">78</h3>
                  <p className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mt-2">Resolved Cases</p>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-700 dark:bg-zinc-400 w-[85%] rounded-full" />
                </div>
                <p className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                  Total for this event
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Users className="h-32 w-32 text-red-600" />
              </div>
              <div className="relative flex flex-col gap-6">
                <div className="p-4 bg-white dark:bg-zinc-800 w-fit rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">150+</h3>
                  <p className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mt-2">Active Volunteers</p>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-[60%] rounded-full shadow-[0_0_10px_rgba(220,38,38,0.4)]" />
                </div>
                <p className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                  <span className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded text-xs">↑ 5</span> new joined today
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="container px-4 md:px-6 m-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-red-600 font-bold tracking-wider uppercase text-xs border border-red-200 dark:border-red-900/50 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/10">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
              How We Save Lives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[100px] left-[16%] right-[16%] h-[2px] bg-zinc-100 dark:bg-zinc-800 -z-10" />

            {[
              {
                title: "Report an Emergency",
                desc: "Citizens report incidents via the app or hotline. Geolocation ensures precise tracking.",
                icon: AlertTriangle,
                step: "01"
              },
              {
                title: "Smart Prioritization",
                desc: "Our AI-driven system ranks cases by severity, assigning resources where they are needed most.",
                icon: Activity,
                step: "02"
              },
              {
                title: "Coordinated Rescue",
                desc: "Volunteer teams and authorities are dispatched instantly with real-time navigation.",
                icon: Shield,
                step: "03"
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center relative group">
                <div className="w-24 h-24 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border-[6px] border-white dark:border-black shadow-2xl relative z-10 group-hover:border-red-50 dark:group-hover:border-red-900/20">
                  <feature.icon className="h-10 w-10 text-red-600" />
                  <div className="absolute -top-4 -right-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                    {feature.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strong CTA Section */}
      <section className="py-24 relative overflow-hidden flex items-center justify-center bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/natural-disaster-landscape.jpg"
            alt="Rescue Operation"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 to-zinc-950/90 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 drop-shadow-lg">
            TOGETHER WE PROTECT <span className="text-red-500">OUR CITY</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the community of responders, donors, and helpers. Your contribution can save a life today.
          </p>
          <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 shadow-2xl transition-all transform hover:scale-105 rounded-full border-0">
            Join the Initiative
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
