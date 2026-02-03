
export interface District {
  id: string;
  name: string;
  description: string;
  associations?: string[];
}

export interface Association {
  name: string;
  location: string;
  description: string;
  role: string;
}

export interface Term {
  term: string;
  definition: string;
  category: 'general' | 'entity' | 'combat' | 'org';
}

export interface Character {
  name: string;
  affiliation: string; // Association or Office name
  location: string;
  personality: string;
  appearance: string;
  notes?: string;
  resolve: string; // Added field for short quote
}

export enum ViewState {
  INTRO = 'INTRO',
  DISTRICTS = 'DISTRICTS',
  ASSOCIATIONS = 'ASSOCIATIONS',
  PERSONNEL = 'PERSONNEL',
  GLOSSARY = 'GLOSSARY',
}