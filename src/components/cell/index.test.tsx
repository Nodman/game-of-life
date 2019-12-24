import React from 'react';
import {render} from '@testing-library/react';

import Cell from './index';

const table = document.createElement('tr');

test('Renders Cell properly', () => {
  const {container, rerender} = render(<Cell alive />, {
    container: document.body.appendChild(table),
  });
  const children = container.children;
  expect(children.length).toEqual(1);
  const td = children[0];
  expect(td.tagName.toLowerCase()).toEqual('td');
  expect(td).toHaveClass('alive');
  rerender(<Cell alive={false} />);
  expect(td).not.toHaveClass('alive');
});
