

// atomatic import and aggregate the files using a pattern
// This will import all files matching the pattern as modules
const modulesVocabulary = import.meta.glob('./preplexity-vocab*', { eager: true });

export const allModulesVocabulary = Object.values(modulesVocabulary)
    .map((mod) => mod.vocabullaryDatasets);



// atomatic import and aggregate the files using a pattern
// This will import all files matching the pattern as modulesWeeklyQuizzes
const modulesWeeklyQuizzes = import.meta.glob('./preplexity-weekly*', { eager: true });

export const allquizzes = Object.values(modulesWeeklyQuizzes)
    .map((mod) => mod.vocabullaryDatasets);

