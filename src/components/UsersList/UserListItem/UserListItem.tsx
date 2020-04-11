import React from 'react';
import classes from './UserListItem.module.scss';

type PropsType = {
  userId: number
  photo: string | null
  name: string
  followed: boolean | undefined
  follow: (userId:number) => void
  unfollow: (userId:number) => void
  followingInProgress: Array<number>
  onClickUserItem: (userId:number) => void
};

const defaultImg =
  'https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p';

const UserListItem: React.FC<PropsType> = ({
  userId,
  photo,
  name,
  followed,
  follow,
  unfollow,
  followingInProgress,
  onClickUserItem
}) => {
  return (
    <div
      onClick={() => onClickUserItem(userId)}
      className={classes.UserListItem}
    >
      <div className={classes.UserListItemImg}>
        <img src={photo ? photo : defaultImg} alt='img' />
      </div>
      <div className={classes.UserListItemName}>{name}</div>

      {followed ? (
        <button
          disabled={followingInProgress.some(id => id === userId)}
          onClick={e => {
            e.stopPropagation();
            unfollow(userId);
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={followingInProgress.some(id => id === userId)}
          onClick={e => {
            e.stopPropagation();
            follow(userId);
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserListItem;
