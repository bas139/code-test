import { problemsData } from '../data/problems';

export const calculateXP = (solvedProblemIds) => {
  let xp = 0;
  solvedProblemIds.forEach(id => {
    const problem = problemsData.find(p => p.id === id);
    if (problem) {
      if (problem.diff === 'Easy') xp += 10;
      else if (problem.diff === 'Medium') xp += 30;
      else if (problem.diff === 'Hard') xp += 50;
      else xp += 10; // fallback
    }
  });
  return xp;
};

export const getLevelInfo = (xp) => {
  // Simple progressive level formula
  // Level 1: 0-99
  // Level 2: 100-249
  // Level 3: 250-449
  // Level 4: 450-699
  // Level 5: 700-999
  
  let level = 1;
  let nextLevelXP = 100;
  let currentLevelBaseXP = 0;
  
  while (xp >= nextLevelXP) {
    level++;
    currentLevelBaseXP = nextLevelXP;
    nextLevelXP += level * 50 + 50; 
  }
  
  const progressPercent = Math.min(100, Math.max(0, ((xp - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100));

  let rank = "Novice";
  if (level >= 10) rank = "Algorithm Master";
  else if (level >= 7) rank = "Pro Coder";
  else if (level >= 4) rank = "Developer";
  else if (level >= 2) rank = "Apprentice";

  return {
    level,
    xp,
    nextLevelXP,
    progressPercent,
    rank
  };
};
