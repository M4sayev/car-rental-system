import { useEffect, useState } from "react";
import CountUp from "react-countup";

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
}

function ClientSideCountUp({
  start = 0,
  end,
  duration = 2.0,
  suffix = "",
}: CountUpProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <span>0</span>;

  return (
    <CountUp start={start} end={end} suffix={suffix} duration={duration}>
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} />
        </div>
      )}
    </CountUp>
  );
}

export default ClientSideCountUp;
