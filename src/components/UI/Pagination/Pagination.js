import React from 'react';
import classes from './Pagination.module.scss';

const Pagination = (props) => {
  const pagesCount = Math.ceil(
    props.totalUsersCount / props.pageSize
  );

  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.Pagination}>
        {pages.map(p => {
          return (
            <span
              className={props.currentPage === p ? classes.active : null}
              key={p}
              onClick={() => props.onPageChanged(p, props.pageSize)}
            >
              {p}
            </span>
          );
        })}
      </div>
  );
};

export default Pagination;