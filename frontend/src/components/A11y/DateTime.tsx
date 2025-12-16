function DateTime({ date }: { date: string }) {
  return <time dateTime={date}>{date}</time>;
}

export default DateTime;
