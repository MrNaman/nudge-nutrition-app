import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Utensils, Activity } from "lucide-react";
import { type MacroData } from "@/lib/macroCalculations";

interface MacroResultsProps {
  data: MacroData;
  onReset: () => void;
}

export const MacroResults = ({ data, onReset }: MacroResultsProps) => {
  return (
    <div className="min-h-screen bg-gradient-primary p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button 
            onClick={onReset}
            variant="secondary"
            className="mb-4 bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Your Macro Plan</h1>
            <p className="text-white/80 text-lg">Personalized nutrition recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Calories */}
          <Card className="shadow-card border-0">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Daily Calories</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {data.calories.toLocaleString()}
              </div>
              <p className="text-muted-foreground">calories per day</p>
              <Badge variant="secondary" className="mt-2">
                {data.goal === 'lose' ? 'Weight Loss' : data.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}
              </Badge>
            </CardContent>
          </Card>

          {/* Recommended Meals */}
          <Card className="shadow-card border-0">
            <CardHeader className="text-center pb-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Meal Schedule</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {data.mealsPerDay}
              </div>
              <p className="text-muted-foreground">meals per day</p>
              <p className="text-sm text-muted-foreground mt-2">
                ~{Math.round(data.calories / data.mealsPerDay)} calories per meal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Macronutrients Breakdown */}
        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Macronutrient Breakdown</CardTitle>
            <p className="text-muted-foreground">Your daily macro targets</p>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Protein */}
              <div className="text-center p-6 bg-gradient-card rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary">Protein</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {data.protein}g
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {Math.round((data.protein * 4 / data.calories) * 100)}% of calories
                </div>
                <Badge variant="outline" className="border-primary/20">
                  {data.protein * 4} calories
                </Badge>
              </div>

              {/* Carbohydrates */}
              <div className="text-center p-6 bg-gradient-card rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary">Carbs</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {data.carbs}g
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {Math.round((data.carbs * 4 / data.calories) * 100)}% of calories
                </div>
                <Badge variant="outline" className="border-primary/20">
                  {data.carbs * 4} calories
                </Badge>
              </div>

              {/* Fat */}
              <div className="text-center p-6 bg-gradient-card rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary">Fat</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {data.fat}g
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {Math.round((data.fat * 9 / data.calories) * 100)}% of calories
                </div>
                <Badge variant="outline" className="border-primary/20">
                  {data.fat * 9} calories
                </Badge>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-3 text-center">Additional Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Water intake:</span> {Math.round(data.weight * 0.035)}L per day
                </div>
                <div>
                  <span className="font-medium">Fiber:</span> {Math.round(data.calories / 1000 * 14)}g per day
                </div>
                <div>
                  <span className="font-medium">Activity level:</span> {data.activityLevel}
                </div>
                <div>
                  <span className="font-medium">BMR:</span> {Math.round(data.bmr)} calories
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};