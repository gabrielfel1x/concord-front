export function formatDistanceToNow(date: string): string {
  const now = new Date();
  const createdAt = new Date(date);
  const diff = now.getTime() - createdAt.getTime();
  return formatDistance(diff);
}

const formatDistance = (diff: number): string => {
  if (diff < 60000) {
    return 'agora';
  } else if (diff < 3600000) {
    return `há ${Math.floor(diff / 60000)} minutos`;
  } else if (diff < 86400000) {
    return `há ${Math.floor(diff / 3600000)} horas`;
  } else {
    return `há ${Math.floor(diff / 86400000)} dias`;
  }
}