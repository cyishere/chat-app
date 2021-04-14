const Avatar = ({ user, imageUrl }) => {
  return (
    <img src={imageUrl} alt={user.username} className="rounded-full w-12" />
  );
};

export default Avatar;
