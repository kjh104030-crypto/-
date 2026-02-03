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

export enum ViewState {
  INTRO = 'INTRO',
  DISTRICTS = 'DISTRICTS',
  ASSOCIATIONS = 'ASSOCIATIONS',
  GLOSSARY = 'GLOSSARY',
}