import Clock from 'react-live-clock';

export default function Datetime() {
  return (
    <div className="flex flex-col">
      <Clock
        className="font-bold text-lg text-shadow text-slate-700 dark:text-slate-400"
        format="h:mm:ss A"
        ticking
        timezone="Australia/Sydney"
      />
      <Clock
        className="text-darkGray-200 dark:text-lightGray-200"
        format="dddd, MMMM Mo"
        timezone="Australia/Sydney"
      />
    </div>
  );
}
