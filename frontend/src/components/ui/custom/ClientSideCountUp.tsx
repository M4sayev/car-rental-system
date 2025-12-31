import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";

interface Props {
  end: number;
  duration?: number;
  suffix?: string;
}

function ClientSideCountUp({ end, duration = 2, suffix = "" }: Props) {
  const spanRef = useRef<HTMLSpanElement>(null);

  const { start, reset } = useCountUp({
    ref: spanRef as React.RefObject<HTMLElement>,
    start: 0,
    end,
    duration,
    suffix,
    startOnMount: false,
  });

  useEffect(() => {
    reset();
    start();
  }, [end, reset, start]);

  return <span ref={spanRef} />;
}

export default ClientSideCountUp;
