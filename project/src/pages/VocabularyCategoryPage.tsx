import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useVocabularyDataContext } from '../context/VocabularyDataContext';

const VocabularyCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { vocabularies } = useVocabularyDataContext();

  // Find the vocabulary set by id
  const vocabData = vocabularies.find(x => x.id === categoryId);

  if (!vocabData) {
    return (
      <Layout title="Vocabulary Category" showBack>
        <div className="p-8 text-center text-neutral-500">Category not found.</div>
      </Layout>
    );
  }

  // Calculate progress if not present
  const totalWords = vocabData.words.length;
  const masteredCount = vocabData.words.filter(w => w.mastered).length;
  const progress = vocabData.progress ?? masteredCount;

  return (
    <Layout title={vocabData.title} showBack>
      {/* Description and Progress */}
      <div className="mb-4">
        <div className="text-sm text-neutral-500 mb-1">{vocabData.description}</div>
        <div className="text-xs text-neutral-400">
          Words: {totalWords} | Progress: {progress}/{totalWords}
        </div>
      </div>

      {/* List of Words */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Words in this category</h2>
        <ul className="divide-y divide-neutral-200 bg-white rounded-xl shadow overflow-hidden">
          {vocabData.words.map((w, idx) => (
            <li key={w.word} className="p-4 flex flex-col sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary-700 text-base">{w.word}</span>
                  {w.mastered && (
                    <span className="inline-block text-green-500 text-lg" title="Mastered">✓</span>
                  )}
                </div>
                <div className="text-sm text-neutral-600 mb-1">— {w.translation}</div>
                {w.phrases && w.phrases.length > 0 && (
                  <ul className="ml-2 text-xs text-neutral-500 space-y-1">
                    {w.phrases.map((p, pidx) => (
                      <li key={pidx}>
                        <span className="italic">"{p.example}"</span>
                        <span className="text-neutral-400 ml-2">({p.translation})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold shadow transition hover:bg-primary-700"
          onClick={() => {}}
        >
          Take Quiz
        </button>
        <button
          className="bg-secondary-100 text-secondary-700 px-6 py-2 rounded-lg font-bold shadow transition hover:bg-secondary-200"
          onClick={() => {}}
        >
          Practice Flashcards
        </button>
      </div>
    </Layout>
  );
};

export default VocabularyCategoryPage;
