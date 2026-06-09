import React from 'react';

export default function NewHotBadge({ isNew, isHot }) {
  return (
    <>
      {isNew && <span className="badge-new">NEW</span>}
      {isHot && <span className="badge-hot">HOT</span>}
    </>
  );
}
