import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { UserAttr } from '../types';
import { fetchUsers } from '../services/usersService';
import { UserAvatar } from './UserAvatar';
interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedUsers: UserAttr[]) => void;
  maxUsers?: number;
}

export function ModalUsers({ isOpen, onClose, onConfirm }: ModalUsersProps) {
  const [selectedUsers, setSelectedUsers] = useState<UserAttr[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersGroup, setusersGroup] = useState<UserAttr[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfirmDisabled = selectedUsers.length === 0;

  useEffect(() => {
    const loadusersGroup = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedusersGroup = await fetchUsers();
        setusersGroup(fetchedusersGroup);
      } catch (err) {
        setError('Failed to load usersGroup. Please try again later.');
        console.error('Error fetching usersGroup:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadusersGroup();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleusersGroupelection = (user: UserAttr) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(f => f.id === user.id);
      if (isSelected) {
        return prev.filter(f => f.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const filteredusersGroup = usersGroup.filter(user =>
    user.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.attributes.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selecteduserChips = selectedUsers.map(user => (
    <div
      key={user.id}
      className="flex items-center gap-1 bg-[#4f545c] text-white px-2 py-1 rounded-full text-sm"
    >
      {user.attributes.name}
      <button
        onClick={() => toggleusersGroupelection(user)}
        className="hover:text-gray-300 cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-[#36393f] rounded-md w-full max-w-md text-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-[#202225]">
          <h2 className="text-xl font-semibold">Select users</h2>
          <button 
            onClick={onClose}
            className="hover:text-gray-400 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-[#b9bbbe] text-sm mb-4">
            Escolha os usuários que farão parte do seu ChatRoom.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {selecteduserChips}
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Encontre ou comece uma conversa"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#202225] rounded-md px-4 py-2 text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
            />
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="text-center py-4 text-[#b9bbbe]">loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-400">{error}</div>
            ) : filteredusersGroup.length === 0 ? (
              <div className="text-center py-4 text-[#b9bbbe]">no users found</div>
            ) : (
              filteredusersGroup.map(user => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 hover:bg-[#32353b] rounded-md cursor-pointer transition-colors"
                  onClick={() => toggleusersGroupelection(user)}
                >
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.attributes.name} color={user.attributes.color} />
                    <div>
                      <div className="font-medium">{user.attributes.name}</div>
                      <div className="text-[#b9bbbe] text-sm">{user.attributes.email}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-md border border-[#72767d] flex items-center justify-center ${
                    selectedUsers.some(f => f.id === user.id) ? 'bg-[#34AB70] border-[#34AB70]/80' : ''
                  }`}>
                    {selectedUsers.some(f => f.id === user.id) && (
                      <Check size={16} className="text-white" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-[#202225] bg-[#2f3136]">
          <button
            disabled={isConfirmDisabled}
            onClick={() => {
              onConfirm(selectedUsers);
              onClose();
            }}
            className={`cursor-pointer w-full bg-[#34AB70] hover:bg-[#34AB70]/80 text-white rounded-md py-2.5 font-medium transition-colors ${
              isConfirmDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
