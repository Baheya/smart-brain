import React, { useState, useEffect } from 'react';

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState('');
  useEffect(() => {
    const generateEmoji = (entries) => {
      fetch(`${process.env.REACT_APP_LAMBDA_API}${entries}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => setEmoji(data.input))
        .catch(console.log);
    };
    generateEmoji(entries);
  }, [entries]);
  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">{`Rank badge: ${emoji}`}</div>
    </div>
  );
};

export default Rank;
