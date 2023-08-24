import React from 'react';
import { Link } from 'react-router-dom';

const cardStyle = {
  height: '30px',
  minWidth: '120px',
  alignText: 'center',
  borderRadius: '6px',
  background: '#EDE9DA',
  fontSize: '16px',
  border: 'none',
  margin: '4px',
  alignSelf: 'center',
  boxShadow: '3px 3px 3px #EDE9DA',
};

type LinkButtonProps = {
  href: string;
  label: string;
};

const LinkButton = ({ href, label }: LinkButtonProps) => {
  return (
    <Link style={{ alignSelf: 'center' }} to={href}>
      <button style={cardStyle} type='button'>
        {label}
      </button>
    </Link>
  );
};

export default LinkButton;
