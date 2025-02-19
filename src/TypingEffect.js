import React, { useState, useEffect } from "react";

const TypingEffect = () => {
  const behav = ["Cepat", "Percaya", "Aman", "Murah"];
  const [behavIndex, setBehavIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentBehav = behav[behavIndex];

    let typingSpeed = isDeleting ? 100 : 300;
    if (!isDeleting && charIndex === currentBehav.length) {
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      typingSpeed = 3000;
      setBehavIndex((prev) => (prev + 1) % behav.length);
      setIsDeleting(false);
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      if (charIndex === currentBehav.length) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, behavIndex, behav]);

  return (
    <div className="typing-container">
      <span id="behav" className={isDeleting ? "typing" : ""}>
        {behav[behavIndex].substring(0, charIndex)}
      </span>
    </div>
  );
};

export default TypingEffect;
