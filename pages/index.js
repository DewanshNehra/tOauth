import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="rounded-lg overflow-hidden shadow-2xl bg-gray-800">
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 "></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 " ></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 "></div>
              </div>
              <span className="text-gray-300 text-sm ml-2">login@system ~ /auth</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono">
            <div className="text-green-400 mb-4">
              $ welcome_to_system
            </div>

            <div className="text-gray-400 mb-6">
              Please select authentication provider:
            </div>

            <div className="space-y-4">
              {/* Google Auth Button */}
              <Link href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=email&state=google`}
                className="block">
                <button 
                  onMouseEnter={() => setSelectedOption('google')}
                  onMouseLeave={() => setSelectedOption(null)}
                  className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200">
                  <span className="text-green-400">$</span> 
                  <span className="text-gray-300"> auth --provider</span>
                  <span className="text-yellow-400"> google</span>
                  
                  {selectedOption === 'google' && (
                    <span className="text-gray-400 ml-2 text-sm">// Sign in with Google</span>
                  )}
                </button>
              </Link>

              {/* Discord Auth Button */}
              <Link href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=identify&state=discord`}
                className="block">
                <button 
                  onMouseEnter={() => setSelectedOption('discord')}
                  onMouseLeave={() => setSelectedOption(null)}
                  className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200">
                  <span className="text-green-400">$</span> 
                  <span className="text-gray-300"> auth --provider</span>
                  <span className="text-purple-400"> discord</span>
                  {selectedOption === 'discord' && (
                    <span className="text-gray-400 ml-2 text-sm">// Sign in with Discord</span>
                  )}
                </button>
              </Link>

              {/* GitHub Auth Button */}
              <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user&state=github`}
                className="block">
                <button 
                  onMouseEnter={() => setSelectedOption('github')}
                  onMouseLeave={() => setSelectedOption(null)}
                  className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200">
                  <span className="text-green-400">$</span> 
                  <span className="text-gray-300"> auth --provider</span>
                  <span className="text-gray-400"> github</span>
                  {selectedOption === 'github' && (
                    <span className="text-gray-400 ml-2 text-sm">// Sign in with GitHub</span>
                  )}
                </button>
              </Link>
            </div>

            <div className="mt-6 text-gray-500 text-sm">
              <div className="mb-1">System ready. Awaiting authentication...</div>
              <div className="animate-pulse">▊</div>
            </div>
          </div>
        </div>

        {/* Footer Help Text */}
        <div className="text-center mt-4 text-gray-500 text-sm font-mono">
          Made by <a href='https://github.com/DewanshNehra' className="text-green-400">Dewans Nehra</a> 
        </div>
      </div>
    </div>
  );
}