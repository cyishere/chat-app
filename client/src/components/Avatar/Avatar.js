const Avatar = ({ username, imageUrl }) => {
  const img = imageUrl || "/avatars/default.png";
  return <img src={img} alt={username} className="rounded-full w-12 h-12" />;
};

export default Avatar;
