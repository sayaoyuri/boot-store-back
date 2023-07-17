import dayjs from "dayjs";

export const getDate = (req, res, next) => {
  try {
    const format = 'HH:mm:ss - DD/MM/YYYY';
    const date = { value: dayjs().format(format), format };
    res.locals = { ...res.locals, date };

  } catch (err) { res.status(500).send(err.message); }

  next();
};