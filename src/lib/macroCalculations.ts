export interface UserData {
  gender: string;
  height: string;
  weight: string;
  age: string;
  activityLevel: string;
  goal: string;
}

export interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealsPerDay: number;
  bmr: number;
  tdee: number;
  weight: number;
  activityLevel: string;
  goal: string;
}

export const calculateMacros = (userData: UserData): MacroData => {
  const weight = parseFloat(userData.weight);
  const height = parseFloat(userData.height);
  const age = parseFloat(userData.age);
  
  // Calculate BMR using Harris-Benedict Equation
  let bmr: number;
  if (userData.gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const activityMultiplier = activityMultipliers[userData.activityLevel as keyof typeof activityMultipliers];
  const tdee = bmr * activityMultiplier;

  // Adjust calories based on goal
  let targetCalories: number;
  switch (userData.goal) {
    case 'lose':
      targetCalories = tdee - 500; // 500 calorie deficit for 1lb/week loss
      break;
    case 'gain':
      targetCalories = tdee + 500; // 500 calorie surplus for 1lb/week gain
      break;
    default:
      targetCalories = tdee; // maintenance
  }

  // Calculate macros
  // Protein: 1.6-2.2g per kg body weight (using 2.0g for active individuals)
  const protein = Math.round(weight * 2.0);
  
  // Fat: 25-30% of calories
  const fatCalories = targetCalories * 0.27;
  const fat = Math.round(fatCalories / 9);
  
  // Carbs: remaining calories
  const remainingCalories = targetCalories - (protein * 4) - (fat * 9);
  const carbs = Math.round(remainingCalories / 4);

  // Determine meals per day based on calorie needs
  let mealsPerDay: number;
  if (targetCalories >= 3000) {
    mealsPerDay = 6; // High calorie needs
  } else if (targetCalories >= 2500) {
    mealsPerDay = 5;
  } else if (targetCalories >= 2000) {
    mealsPerDay = 4;
  } else {
    mealsPerDay = 3; // Lower calorie needs
  }

  return {
    calories: Math.round(targetCalories),
    protein,
    carbs,
    fat,
    mealsPerDay,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    weight,
    activityLevel: userData.activityLevel,
    goal: userData.goal
  };
};