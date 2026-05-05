import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMeal } from "@/redux/mealsSlice.jsx";
import Navbar from "@/components/Navbar.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

const AddMeal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    calories: "",
    category: "breakfast",
    date: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState({});

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (form.name.length > 80) errs.name = "Too long";
    const cal = Number(form.calories);
    if (!form.calories || isNaN(cal) || cal <= 0) errs.calories = "Enter a positive number";
    if (cal > 10000) errs.calories = "That seems too high";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    dispatch(addMeal({ ...form, name: form.name.trim() }));
    toast.success("Meal logged!", { description: `${form.name} · ${cal} kcal` });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-10">
        <div className="mx-auto max-w-xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Add a meal</h1>
            <p className="text-muted-foreground">Log what you ate to keep your stats accurate.</p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Food name</Label>
              <Input
                id="name"
                placeholder="e.g. Avocado toast"
                value={form.name}
                onChange={update("name")}
                maxLength={80}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  min="1"
                  placeholder="320"
                  value={form.calories}
                  onChange={update("calories")}
                />
                {errors.calories && <p className="text-xs text-destructive">{errors.calories}</p>}
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={update("category")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={update("date")} />
            </div>

            <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground shadow-glow hover:opacity-95">
              <PlusCircle className="mr-2 h-4 w-4" /> Add meal
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMeal;
