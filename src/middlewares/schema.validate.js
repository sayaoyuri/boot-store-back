export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const validation = schema.validate(req.body, { abortEarly: false });
      if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
      }

      res.locals = { ...validation.value };
    } catch (error) {
      return res.status(500).send("Ocorreu um erro ao processar a requisição");
    };

    next();
  };
};