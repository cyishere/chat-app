const Avatar = ({ username, imageUrl }) => {
  return (
    <img src={imageUrl} alt={username} className="rounded-full w-12 h-12" />
  );
};

export default Avatar;
