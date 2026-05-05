import { useDispatch } from "react-redux";
import { deleteMeal } from "@/redux/mealsSlice.jsx";
import { Trash2, Utensils, Coffee, Soup, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const ICONS = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Soup,
  snack: Cookie,
};

const COLORS = {
  breakfast: "bg-accent/15 text-accent",
  lunch: "bg-primary/15 text-primary",
  dinner: "bg-[hsl(186_72%_45%)]/15 text-[hsl(186_72%_38%)]",
  snack: "bg-secondary text-secondary-foreground",
};

const MealCard = ({ meal }) => {
  const dispatch = useDispatch();
  const Icon = ICONS[meal.category] || Utensils;
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${COLORS[meal.category]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{meal.name}</p>
        <p className="text-xs text-muted-foreground capitalize">
          {meal.category} · {meal.date}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">{meal.calories}</p>
        <p className="text-xs text-muted-foreground">kcal</p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => dispatch(deleteMeal(meal.id))}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MealCard;
