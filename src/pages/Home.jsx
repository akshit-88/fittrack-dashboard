import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar.jsx";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Salad, BarChart3, Sparkles } from "lucide-react";

const Home = () => {
  const meals = useSelector((s) => s.meals);
  const totalToday = meals
    .filter((m) => m.date === new Date().toISOString().slice(0, 10))
    .reduce((a, b) => a + b.calories, 0);

  const features = [
    { icon: Salad, title: "Log meals fast", desc: "Capture breakfast, lunch, dinner & snacks in seconds." },
    { icon: BarChart3, title: "Visual insights", desc: "Beautiful charts that show what you actually eat." },
    { icon: Activity, title: "Stay on target", desc: "Track calories per day and build healthy streaks." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-card" />
          <div className="container relative py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Smart fitness & diet tracker
              </span>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
                Eat smarter.{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">Train better.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                FitTrack helps you log every meal, watch your calories, and stay consistent — all in
                one beautifully simple dashboard.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-95">
                  <Link to="/dashboard">
                    Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/add">Log a meal</Link>
                </Button>
              </div>

              <div className="mt-12 inline-flex items-center gap-6 rounded-2xl border border-border bg-card px-8 py-5 shadow-soft">
                <div>
                  <p className="text-3xl font-bold text-primary">{totalToday}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">kcal today</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold">{meals.length}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">meals logged</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero shadow-glow">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
