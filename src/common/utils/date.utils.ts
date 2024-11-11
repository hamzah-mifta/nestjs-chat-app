import * as moment from 'moment';

export const getUnixTimestamp = (date?: Date): number => {
  const d = date ?? new Date();

  return moment(d).unix();
};
