import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const handleAsyncErrors = (fn) => (res, next) => 
    Promise.resolve(fn(res, next)).catch(next);

  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'an unexpected server error occurred',
      error: process.env.NODE_ENV === 'production' ? {} : err
    });
  };