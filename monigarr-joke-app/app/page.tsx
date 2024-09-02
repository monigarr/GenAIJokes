"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
    { emoji: "🖤", value: "Gothic"},
    { emoji: "⚙️", value: "Steampunk"},
    { emoji: "🏙️", value: "Urban Fantasy" },
    { emoji: "🌸", value: "Magical Realism"},
    { emoji: "🕯️", value: "Paranormal"},
    { emoji: "🚬", value: "Noir" },
    { emoji: "👑", value: "Epic"},
    { emoji: "🔥", value: "Dystopian"},
    { emoji: "💔", value: "Drama" },
    { emoji: "⚔️", value: "Historical Fiction"},
    { emoji: "😜", value: "Comedy"},
    { emoji: "⏳", value: "Thriller"},
    { emoji: "🏞️", value: "Adventure" },
    { emoji: "👻", value: "Horror"},   
    
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Serious" },
    { emoji: "😂", value: "Funny" },
    { emoji: "😂", value: "Humorous" },
    { emoji: "🤔", value: "Serious" }, 
    { emoji: "😊", value: "Optimistic" }, 
    { emoji: "😞", value: "Pessimistic" }, 
    { emoji: "🌑", value: "Dark" }, 
    { emoji: "😄", value: "Light-hearted" }, 
    { emoji: "🕵️‍♂️", value: "Mysterious" }, 
    { emoji: "💖", value: "Romantic" }, 
    { emoji: "😢", value: "Melancholic" }, 
    { emoji: "😏", value: "Satirical" }, 
    { emoji: "😰", value: "Suspenseful" }, 
    { emoji: "💔", value: "Tragic" }, 
    { emoji: "🌅", value: "Uplifting" }, 
    { emoji: "🕰️", value: "Nostalgic" }, 
    { emoji: "🎠", value: "Whimsical" }, 
    { emoji: "🌟", value: "Hopeful" }, 
    { emoji: "😠", value: "Bitter" }, 
    { emoji: "🖤", value: "Sombre" }, 
    { emoji: "🪞", value: "Reflective" }, 
    { emoji: "🪓", value: "Gritty" }, 
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generator</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Select your Joke genre and tone.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">GENRE</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">TONE</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.genre} joke in a ${state.tone} tone`,
              })
            }
          >
            Generate New Joke
          </button>

          <div
            hidden={
              messages.length === 200 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}