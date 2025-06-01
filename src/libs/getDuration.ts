import { fromUnixTime } from 'date-fns';

const getDuration = (start: number, stop: number) => {
  const milliseconds =
    fromUnixTime(stop).getTime() - fromUnixTime(start).getTime();
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${hours}:${minutes.toString().padStart(2, '0')}`;

  return duration;
};

export default getDuration;
