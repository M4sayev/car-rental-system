function LoadingSR({ text = "Loading..." }: { text?: string }) {
  return (
    <span
      data-testid="loading-state-sr"
      className="sr-only"
      aria-live="polite"
      role="status"
    >
      {text}
    </span>
  );
}

export default LoadingSR;
