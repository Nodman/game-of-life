import React from 'react';

type PropTypes = {
  alive: boolean,
};

const Cell = ({alive}: PropTypes) => (
  <td className={`${alive ? 'alive' : ''}`}/>
);

export default Cell;
