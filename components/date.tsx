import { parseISO, format } from 'date-fns';

interface DateStringInterface {
  dateString: string;
}

export const DateParser = ({ dateString }: DateStringInterface) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'dd MMM yy')}</time>;
};
