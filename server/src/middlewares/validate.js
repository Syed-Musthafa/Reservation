import { validationResult} from 'express-validator'

// To handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors :  errors.array().reduce((acc, error) => {
        if(!(acc[error.path] || acc[error.param])){
          acc[error.path || error.param] = error.msg
        }
        return acc;
      }, {})
    });
  }
  
  next();
};


export { handleValidationErrors}