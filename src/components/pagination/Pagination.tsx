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
  console.log('pagination state', { start, end, total });
  return (
    <div style={{ width: '100%' }}>
      {start > 0 && (
        <span style={buttonStyle} onClick={() => onPrev()}>
          {'prev'}
        </span>
      )}
      {end < total && (
        <span style={buttonStyle} onClick={() => onNext()}>
          {'next'}
        </span>
      )}
    </div>
  );
};

export default Pagination;
