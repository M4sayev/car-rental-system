interface DateTimeProps {
  className?: string;
  date: string;
}
function DateTime({ date, className = "" }: DateTimeProps) {
  return (
    <time className={className} dateTime={date}>
      {date}
    </time>
  );
}

export default DateTime;
