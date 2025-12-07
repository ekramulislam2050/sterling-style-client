import { Typewriter } from "react-simple-typewriter";
import { memo, useEffect, useRef, useState } from "react";

const OnTimeTypewriter = memo(() => {
  const [done, setDone] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    if (!played.current) {
      played.current = true;
    }
  }, []);

  return !done ? (
    <Typewriter
      words={["SSL ERP SYSTEM"]}
      loop={false}
      cursor={false}
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1500}
      onTypeDone={() => setDone(true)}
    />
  ) : (
    <span>SSL ERP SYSTEM</span>
  );
});

export default OnTimeTypewriter;
