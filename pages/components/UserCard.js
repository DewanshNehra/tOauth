import React, { useState } from 'react';
import { useRouter } from 'next/router';

const UserCard = ({ user, setUser }) => {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    router.push('/');
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return '"null"';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string' && value.startsWith('#')) return `"${value}"`;
    if (typeof value === 'string') return `"${value}"`;
    return value;
  };

  const renderUserData = (data, prefix = '') => {
    return Object.entries(data).map(([key, value]) => {
      if (value === undefined) return null;
      
      // Skip rendering of complex nested objects we don't want to display
      if (['followers_url', 'following_url', 'gists_url', 'starred_url', 
           'subscriptions_url', 'organizations_url', 'repos_url', 'events_url', 
           'received_events_url', 'avatar_url', 'gravatar_id', 'url', 'html_url'].includes(key)) {
        return null;
      }

      // Handle nested objects (like the plan object)
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={prefix + key}>
            <div className="flex">
              <span className="text-purple-400">{key}</span>
              <span className="text-gray-400 mx-2">:</span>
              <span className="text-yellow-300">{'{}'}</span>
            </div>
            <div className="ml-4">
              {renderUserData(value, `${prefix}${key}.`)}
            </div>
          </div>
        );
      }

      return (
        <div key={prefix + key} className="flex">
          <span className="text-purple-400">{key}</span>
          <span className="text-gray-400 mx-2">:</span>
          <span className="text-yellow-300">{renderValue(value)}</span>
        </div>
      );
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="rounded-lg overflow-hidden shadow-2xl bg-gray-800">
        <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 "></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 " ></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:opacity-75 hover:h-[23px]  transition-all duration-100 "></div>
            </div>
            <span className="text-gray-300 text-sm ml-2">user@system ~ /userinfo</span>
          </div>
        </div>
    
        <div className="p-6 font-mono">
          <div className="text-green-400 mb-4">
            $ cat userinfo.json
          </div>
          
          <div className="text-gray-300 space-y-1">
            <div className="text-cyan-400 font-bold mb-2">
              {user.username || user.name || user.login}
            </div>
            {renderUserData(user)}
          </div>
          
          {/* Logout Section */}
          <div className="mt-6 border-t border-gray-600 pt-4">
            {!showLogoutConfirm ? (
              <>
                <div className="text-green-400">
                  $ logout --user {user.username || user.name || user.login}
                </div>
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="mt-2 text-gray-300 hover:text-white cursor-pointer"
                >
                  [Press Enter to confirm logout]
                </button>
              </>
            ) : (
              <>
                <div className="text-yellow-400">Are you sure you want to logout? (y/n)</div>
                <div className="flex space-x-4 mt-2">
                  <button 
                    onClick={handleLogout}
                    className="text-green-400 hover:text-green-300 cursor-pointer"
                  >
                    y
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    n
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="text-green-400 mt-4">
            <span className="animate-pulse">▊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;