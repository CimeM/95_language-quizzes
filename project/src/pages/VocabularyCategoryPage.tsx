import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useVocabularyDataContext } from '../context/VocabularyDataContext';

const VocabularyCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { vocabularies } = useVocabularyDataContext();

  const [playingWord, setPlayingWord] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Find the vocabulary set by id
  const vocabData = vocabularies.find(x => x.id === categoryId);

  if (!vocabData) {
    return (
      <Layout title="Vocabulary Category" showBack>
        <div className="p-8 text-center text-neutral-500">Category not found.</div>
      </Layout>
    );
  }

  // Clean Up Audio on Unmount when user leaves the page
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Calculate progress if not present
  const totalWords = vocabData.words.length;
  const masteredCount = vocabData.words.filter(w => w.mastered).length;
  const progress = vocabData.progress ?? masteredCount;

  const playAudio = async (lang: string, text: string, wordKey: string) => {
    // Always clear before starting new audio
    setPlayingWord(wordKey);

    // Stop any previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    try {
      const response = await fetch(
        `https://langapi.rivieraapps.com/audio?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(text)}`
      );
      if (!response.ok) throw new Error('Audio fetch failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const audio = new window.Audio(url);

      // Set handlers BEFORE playing
      audio.onended = () => setPlayingWord(null);
      audio.onerror = () => setPlayingWord(null);

      audioRef.current = audio;
      audio.play();
    } catch (e) {
      setPlayingWord(null);
      alert('Could not play audio');
    }
  };

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
                  
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary-700 text-base">{w.word}</span>
                    <button
                      className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors text-sm"
                      onClick={() => playAudio('fr', w.word + ". " + w.phrases[0].example, w.word)}
                      disabled={playingWord === w.word}
                      aria-label={`Play audio for ${w.word}`}
                    >
                      {playingWord === w.word ? 'Playing...' : '🔊'}
                    </button>
                    {w.mastered && (
                      <span className="inline-block text-green-500 text-lg" title="Mastered">✓</span>
                    )}
                  </div>

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
