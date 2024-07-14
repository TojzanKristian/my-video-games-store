import { ICategory } from "../../interfaces/ICategory";

export const categories: ICategory[] = [
    { name: 'Akcija', subcategories: ['Action', 'Shooter', 'Survival', 'Battle Royale', 'FPS', 'TPS', 'Hack and Slash', 'Stealth'] },
    { name: 'Avantura', subcategories: ['Adventure', 'Point and Click', 'Visual Novels', 'Interactive Story', 'Puzzle Adventure'] },
    { name: 'RPG', subcategories: ['RPG', 'Action RPG', 'Turn-Based RPG', 'Tactical RPG', 'MMORPG'] },
    { name: 'Simulacije', subcategories: ['Simulation', 'Party', 'Platformer', 'Narrative', 'Sandbox', 'Life Simulation', 'Vehicle Simulation', 'Construction and Management', 'Sports Simulation'] },
    { name: 'Strategija', subcategories: ['Strategy', 'MOBA', 'MMORPG', 'Roguelike', 'Metroidvania', 'Real-Time Strategy', 'Turn-Based Strategy', 'Tower Defense', '4X'] },
    { name: 'Sportske igre', subcategories: ['Sports Games', 'Sports', 'Football', 'Basketball', 'Racing', 'Extreme Sports'] },
    { name: 'Zagonetke i logičke igre', subcategories: ['Puzzle and Logic Games', 'Puzzle', 'Match-3', 'Sudoku', 'Tetris-like Games', 'Brain Teasers'] },
    { name: 'Horor', subcategories: ['Horror', 'Survival Horror', 'Psychological Horror', 'Action Horror', 'VR Horror'] },
];