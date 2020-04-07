import React, { useState } from 'react';
import classes from './Pagination.module.scss';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (currentPage: number, pageSize: number) => void;
  portionSize: number;
};

const Pagination: React.FC<PropsType> = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  const pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / props.portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * props.portionSize + 1;
  const rightPortionNumber = portionNumber * props.portionSize;

  return (
    <div className={classes.Pagination}>
      {portionNumber > 1 && (
        <button
          className={classes.PaginationControl}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}

      <div className={classes.PaginationItems}>
        {pages
          .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
          .map((p) => {
            return (
              <span
                className={props.currentPage === p ? classes.active : ''}
                key={p}
                onClick={() => props.onPageChanged(p, props.pageSize)}
              >
                {p}
              </span>
            );
          })}
      </div>

      {portionCount > portionNumber && (
        <button
          className={classes.PaginationControl}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
