import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { Search, Flame, Target, Utensils } from "lucide-react";
import Navbar from "@/components/Navbar.jsx";
import MealCard from "@/components/MealCard.jsx";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CATEGORY_COLORS = {
  breakfast: "hsl(28 95% 58%)",
  lunch: "hsl(156 72% 38%)",
  dinner: "hsl(186 72% 45%)",
  snack: "hsl(160 25% 35%)",
};

const DAILY_GOAL = 2000;

const Dashboard = () => {
  const meals = useSelector((s) => s.meals);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const today = new Date().toISOString().slice(0, 10);
  const todayMeals = meals.filter((m) => m.date === today);
  const totalToday = todayMeals.reduce((a, b) => a + b.calories, 0);

  const filtered = useMemo(() => {
    return meals.filter((m) => {
      const okQ = m.name.toLowerCase().includes(query.toLowerCase());
      const okC = filter === "all" || m.category === filter;
      return okQ && okC;
    });
  }, [meals, query, filter]);

  const pieData = useMemo(() => {
    const map = {};
    todayMeals.forEach((m) => {
      map[m.category] = (map[m.category] || 0) + m.calories;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [todayMeals]);

  const weekData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const cal = meals.filter((m) => m.date === key).reduce((a, b) => a + b.calories, 0);
      days.push({ day: d.toLocaleDateString(undefined, { weekday: "short" }), calories: cal });
    }
    return days;
  }, [meals]);

  const stats = [
    { label: "Calories today", value: totalToday, icon: Flame, accent: "bg-accent/15 text-accent" },
    { label: "Daily goal", value: DAILY_GOAL, icon: Target, accent: "bg-primary/15 text-primary" },
    { label: "Meals logged", value: meals.length, icon: Utensils, accent: "bg-[hsl(186_72%_45%)]/15 text-[hsl(186_72%_38%)]" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your nutrition at a glance.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold">{value}</p>
              {label === "Calories today" && (
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-hero transition-all"
                    style={{ width: `${Math.min(100, (totalToday / DAILY_GOAL) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-3">
            <h2 className="font-semibold">Last 7 days</h2>
            <p className="text-sm text-muted-foreground mb-4">Calories per day</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                    }}
                  />
                  <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
            <h2 className="font-semibold">Today by category</h2>
            <p className="text-sm text-muted-foreground mb-4">Calorie distribution</p>
            <div className="h-64">
              {pieData.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No meals logged today
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                      {pieData.map((e) => (
                        <Cell key={e.name} fill={CATEGORY_COLORS[e.name]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold">All meals</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search food…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 w-56"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No meals match your filters.
              </div>
            ) : (
              filtered.map((m) => <MealCard key={m.id} meal={m} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
