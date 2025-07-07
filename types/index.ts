// Mock data types for the Bug Encyclopedia app
export type AnalyzeResult = {
  scientificName: string;
  japaneseName: string;
  family: string;
  img: string;
};

export type ChatTurn = { 
  role: "doctor" | "child" | "friend"; 
  message: string; 
};

export type Bug = {
  id: string;
  scientificName: string;
  japaneseName: string;
  family: string;
  img: string;
  discoveredAt: Date;
  notes?: string;
};

export type BugStore = {
  bugs: Bug[];
  addBug: (bug: Omit<Bug, 'id' | 'discoveredAt'>) => void;
  updateBugNotes: (id: string, notes: string) => void;
  getBugById: (id: string) => Bug | undefined;
};