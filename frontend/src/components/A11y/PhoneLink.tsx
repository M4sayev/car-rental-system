function PhoneLink({ phone }: { phone: string }) {
  return <a href={`tel:${phone}`}>{phone}</a>;
}

export default PhoneLink;
