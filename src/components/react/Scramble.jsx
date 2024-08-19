import React, { useEffect } from 'react';
import { useScramble } from 'use-scramble';

const Scramble = ({ initialText, alternateText, initialColorClass, alternateColorClass }) => {
  const [text, setText] = React.useState(initialText);
  const [colorClass, setColorClass] = React.useState(initialColorClass);
  const { ref, replay } = useScramble({
    text,
    range: [65, 125],
    speed: 0.25,
    tick:1,
    scramble: 10,
    step: 6,
    seed: 0,
    chance: 1,
    overdrive: true,
    overflow: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => (prevText === initialText ? alternateText : initialText));
      setColorClass((prevClass) => (prevClass === initialColorClass ? alternateColorClass : initialColorClass));
      replay();
    }, 3500);

    return () => clearInterval(interval);
  }, [initialText, alternateText, initialColorClass, alternateColorClass, replay]);

  return <span ref={ref} className={colorClass}>{text}</span>;
};

export default Scramble;
