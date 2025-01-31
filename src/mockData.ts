import { Channel, User } from './types';

export const currentUser: User = {
  id: '1',
  name: 'Matheus Tedi (you)',
  avatar: 'https://singlecolorimage.com/get/9D9DA7/150x150',
  online: true,
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Hivna Maino',
    avatar: 'https://singlecolorimage.com/get/34AB70/150x150',
    online: true,
  },
  {
    id: '3',
    name: 'Gabriel Vimac',
    avatar: 'https://singlecolorimage.com/get/3434AB/150x150',
    online: false,
  },
];

export const channels: Channel[] = [
  {
    id: '1',
    name: 'Jurimetria e Amigos',
    messages: [
      {
        id: '1',
        content: "Hey everyone! How are you?",
        sender: users[0],
        timestamp: new Date('2024-03-10T10:00:00'),
      },
      {
        id: '2',
        content: "I'm going to drop everything and live with muay thai",
        sender: users[1],
        timestamp: new Date('2024-03-10T10:01:00'),
      },
      {
        id: '3',
        content: "I'm tired of studying :,(",
        sender: users[2],
        timestamp: new Date('2024-03-10T10:02:00'),
      },
    ],
  },
];