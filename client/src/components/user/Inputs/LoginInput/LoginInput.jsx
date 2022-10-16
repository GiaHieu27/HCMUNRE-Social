import { ErrorMessage, useField } from 'formik';

function LoginInput({ iconName, placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: 'translateY(6px)' }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_top"></div>
        </div>
      )}

      <div className="input-group">
        <box-icon color="gray" type="solid" name={iconName}></box-icon>
        <input
          className={meta.touched && meta.error ? 'input_error_border' : null}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <i className="error_icon"></i>}
      </div>

      {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: 'translateY(-6px)' }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_bottom"></div>
        </div>
      )}
    </>
  );
}

export default LoginInput;
