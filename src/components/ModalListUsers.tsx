import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { UserAttr } from '../types';
import { fetchUsers } from '../services/usersService';
import { UserAvatar } from './UserAvatar';

interface ModalUsersListProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalUsersList({ isOpen, onClose }: ModalUsersListProps) {
  const [users, setUsers] = useState<UserAttr[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-[#36393f] rounded-md w-full max-w-md text-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-[#202225]">
          <h2 className="text-xl font-semibold">Users List</h2>
          <button 
            onClick={onClose}
            className="hover:text-gray-400 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-4 text-[#b9bbbe]">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-400">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-[#b9bbbe]">No users found</div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {users.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 hover:bg-[#32353b] rounded-md cursor-pointer transition-colors"
                >
                  <UserAvatar name={user.attributes.name} color={user.attributes.color} />
                  <div>
                    <div className="font-medium">{user.attributes.name}</div>
                    <div className="text-[#b9bbbe] text-sm">{user.attributes.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}