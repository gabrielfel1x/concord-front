type Props = {
  name: string | undefined;
  color?: string;
};

export const UserAvatar = ({ name, color }: Props) => {
  const initial = name ? name[0].toUpperCase() : "?";

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
      style={{ backgroundColor: color ?? "#34AB70" }}
    >
      {initial}
    </div>
  )
}
