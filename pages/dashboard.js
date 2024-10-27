import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserCard from './components/UserCard';

export default function Dashboard() {
  const router = useRouter();
  const { userData } = router.query;
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (userData) {
      try {
        const decodedUserData = decodeURIComponent(userData);
        const parsedUserData = JSON.parse(decodedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, [userData]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8 pt-8">
          <div className="inline-block font-mono">
            <div className="text-green-400 mb-2">
              $ connect --to system_dashboard
            </div>

            <div className="text-gray-400 text-sm">
              Connected as: {user?.username || 'Loading...'}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {user ? (
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <div className="text-green-400 font-mono text-sm">
                  $ system_status
                  <div className="text-gray-400 mt-2">
                    <span className="text-green-400">●</span> System Online
                    <br />
                    <span className="text-green-400">●</span> User Authenticated
                    <br />
                    <span className="text-green-400">●</span> Session Active
                  </div>
                </div>
              </div>
              
              <UserCard user={user} setUser={setUser} />
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-block bg-gray-800 rounded-lg p-6">
                <div className="text-yellow-400 font-mono animate-pulse">
                  $ loading user_data...
                </div>
                <div className="text-gray-400 mt-2 font-mono">
                  Please wait while we fetch your information
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}