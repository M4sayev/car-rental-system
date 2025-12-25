function EmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}?subject=Inquiry&body=My%20message`}>{email}</a>
  );
}

export default EmailLink;
