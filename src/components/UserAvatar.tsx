import React from 'react';

interface UserAvatarProps {
  name: string;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 36 }) => {
  const getInitials = (fullName: string): string => {
    if (!fullName) return 'U';
    
    const nameParts = fullName.trim().split(' ');
    
    if (nameParts.length >= 2) {
      // First Last -> FL
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
      // Single name -> first two characters
      const singleName = nameParts[0];
      return singleName.length >= 2 
        ? singleName.substring(0, 2).toUpperCase()
        : singleName.toUpperCase();
    }
  };

  return (
    <div 
      className="user-avatar" 
      style={{ 
        width: size, 
        height: size,
        fontSize: size * 0.4
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;