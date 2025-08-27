import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { MacroResults } from "./MacroResults";
import { calculateMacros, type UserData, type MacroData } from "@/lib/macroCalculations";

export const MacroCalculator = () => {
  const [userData, setUserData] = useState<UserData>({
    gender: "",
    height: "",
    weight: "",
    age: "",
    activityLevel: "",
    goal: ""
  });
  
  const [results, setResults] = useState<MacroData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', userData);
    
    // Check for missing fields and show specific error messages
    const missingFields = [];
    if (!userData.gender) missingFields.push("Gender");
    if (!userData.height) missingFields.push("Height");
    if (!userData.weight) missingFields.push("Weight");
    if (!userData.age) missingFields.push("Age");
    if (!userData.activityLevel) missingFields.push("Activity Level");
    if (!userData.goal) missingFields.push("Goal");

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      try {
        console.log('Calculating macros...');
        const macroData = calculateMacros(userData);
        console.log('Calculation result:', macroData);
        
        setResults(macroData);
        setShowResults(true);
        
        toast({
          title: "Success!",
          description: "Your macro plan has been calculated.",
        });
      } catch (error) {
        console.error('Calculation error:', error);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your macros. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const resetForm = () => {
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return <MacroResults data={results} onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-primary p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Macro Tracker</h1>
          <p className="text-white/80 text-lg">Calculate your personalized nutrition goals</p>
        </div>

        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-black-primary">Your Profile</CardTitle>
            <CardDescription>Tell us about yourself to get accurate macro recommendations</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gender */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Gender *</Label>
                <RadioGroup
                  value={userData.gender}
                  onValueChange={(value) => setUserData(prev => ({ ...prev, gender: value }))}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Age, Height, Weight */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years) *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={userData.age}
                    onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={userData.height}
                    onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={userData.weight}
                    onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-3">
                <Label>Activity Level *</Label>
                <Select
                  value={userData.activityLevel}
                  onValueChange={(value) => setUserData(prev => ({ ...prev, activityLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (intense daily training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Goal */}
              <div className="space-y-3">
                <Label>Goal *</Label>
                <Select
                  value={userData.goal}
                  onValueChange={(value) => setUserData(prev => ({ ...prev, goal: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What's your goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={isCalculating}
                className="w-full bg-gradient-primary hover:shadow-green transition-all duration-300 text-white font-semibold py-3 text-lg"
                size="lg"
              >
                {isCalculating ? "Calculating..." : "Calculate My Macros"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};