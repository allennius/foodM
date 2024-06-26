// Recommend Drink
// An algorithm that either give a specific or random recommendation :D
// Why? Don´t ask...
export const DrinkRecommendation = (foodId: string): string => {
  if (Math.random() > 0.5) {
    // random
    let drinkNr: number;
    drinkNr = randomAlgorithm();
    return drinkIDs[drinkNr];
  } else {
    // Specified per food
    return specificAlgorithm(foodId);
  }
};
const randomAlgorithm = (): number => {
  const random = Math.random() * drinkIDs.length;
  let drinkNr = Math.round(random);
  console.log("Random Drink NR", drinkNr);
  return drinkNr;
};
const specificAlgorithm = (foodId: string): string => {
  const foodDrinkMatching: { [key: string]: string } = {
    "6604087a29f983c33c7b4141": "12768", // Food 1 with Drink 1
    "6604089029f983c33c7b630e": "12618", // Food 2 with Drink 2
    "6604089e29f983c33c7b79eb": "15092", // Food 3 with Drink 3
    "660408b229f983c33c7b98fc": "12630", // Food 4 with Drink 4
    "660bc29a29f983c33c49dedb": "12724", // Food 5 with Drink 5
    "660becfe29f983c33c4d5166": "12726", // Food 6 with Drink 6
  };
  return foodDrinkMatching[foodId];
};

// List of our Food/Drink-ID´s
const drinkIDs = [
  "12768",
  "12618",
  "15092",
  "12630",
  "12724",
  "12726",
  "11288",
  "178365",
  "11462",
  "11000",
  "11003",
  "12528",
];
const foodIDs = [
  "6604087a29f983c33c7b4141",
  "6604089029f983c33c7b630e",
  "6604089e29f983c33c7b79eb",
  "660408b229f983c33c7b98fc",
  "660bc29a29f983c33c49dedb",
  "660becfe29f983c33c4d5166",
];
