import React from 'react';

type PaginationProps = {
  start: number;
  end: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

const buttonStyle = {
  fontSize: '20px',
  margin: '5px',
  cursor: 'pointer',
};

const Pagination = ({ start, end, total, onPrev, onNext }: PaginationProps) => {
  return (
    <div style={{ width: '100%', alignSelf: 'center', textAlign: 'center'}}>
      {start > 0 && (
        <span style={buttonStyle} onClick={() => onPrev()}>
          {'prev'}
        </span>
      )}
      {end < total -1 && (
        <span style={buttonStyle} onClick={() => onNext()}>
          {'next'}
        </span>
      )}
    </div>
  );
};

export default Pagination;
