import Clock from 'react-live-clock';

export default function Datetime() {
  return (
    <Clock
      date={new Date().toDateString()}
      format="MMMM Mo, YYYY"
      timezone="Australia/Sydney"
    />
  );
}
