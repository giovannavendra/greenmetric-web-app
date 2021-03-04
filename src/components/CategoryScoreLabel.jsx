import React from 'react';

export default function CategoryScoreLabel ({ dataEntry, dataIndex, header, subheader, color, ...props }) {
  return (
    <React.Fragment>
      <text dominantBaseline="central" {...props} y={props.y - 8} fontSize="26px" fill={color}>{header}</text>
      <text dominantBaseline="central" {...props} y={props.y + 12} fontSize="12px">{subheader}</text>
    </React.Fragment>
  );
}
