// src/components/ModalUsers.tsx
import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { UserAttr } from '../types';
import { fetchUsers } from '../services/usersService';

interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedFriends: UserAttr[]) => void;
  maxFriends?: number;
}

export function ModalUsers({ isOpen, onClose, onConfirm, maxFriends = 7 }: ModalUsersProps) {
  const [selectedFriends, setSelectedFriends] = useState<UserAttr[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<UserAttr[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFriends = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedFriends = await fetchUsers();
        setFriends(fetchedFriends);
      } catch (err) {
        setError('Failed to load friends. Please try again later.');
        console.error('Error fetching friends:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadFriends();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFriendSelection = (friend: UserAttr) => {
    setSelectedFriends(prev => {
      const isSelected = prev.some(f => f.id === friend.id);
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id);
      }
      if (prev.length >= maxFriends) return prev;
      return [...prev, friend];
    });
  };

  const filteredFriends = friends.filter(friend =>
    friend.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.attributes.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFriendChips = selectedFriends.map(friend => (
    <div
      key={friend.id}
      className="flex items-center gap-1 bg-[#4f545c] text-white px-2 py-1 rounded-full text-sm"
    >
      {friend.attributes.name}
      <button
        onClick={() => toggleFriendSelection(friend)}
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
          <h2 className="text-xl font-semibold">Selecionar amigos</h2>
          <button 
            onClick={onClose}
            className="hover:text-gray-400 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-[#b9bbbe] text-sm mb-4">
            Você pode adicionar mais {maxFriends - selectedFriends.length} amigos.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFriendChips}
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
              <div className="text-center py-4 text-[#b9bbbe]">Carregando...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-400">{error}</div>
            ) : filteredFriends.length === 0 ? (
              <div className="text-center py-4 text-[#b9bbbe]">Nenhum amigo encontrado</div>
            ) : (
              filteredFriends.map(friend => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-2 hover:bg-[#32353b] rounded-md cursor-pointer transition-colors"
                  onClick={() => toggleFriendSelection(friend)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#34AB70] flex items-center justify-center">
                      <span className="text-lg font-medium">
                        {friend.attributes.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{friend.attributes.name}</div>
                      <div className="text-[#b9bbbe] text-sm">{friend.attributes.email}</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-md border border-[#72767d] flex items-center justify-center ${
                    selectedFriends.some(f => f.id === friend.id) ? 'bg-[#34AB70] border-[#34AB70]/80' : ''
                  }`}>
                    {selectedFriends.some(f => f.id === friend.id) && (
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
            onClick={() => {
              onConfirm(selectedFriends);
              onClose();
            }}
            className="cursor-pointer w-full bg-[#34AB70] hover:bg-[#34AB70]/80 text-white rounded-md py-2.5 font-medium transition-colors"
          >
            Criar grupo privado
          </button>
        </div>
      </div>
    </div>
  );
}
