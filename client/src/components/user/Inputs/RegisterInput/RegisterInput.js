import { ErrorMessage, useField } from "formik";

function RegisterInput({ iconName, placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error && (
        <div className="input_error" style={{ transform: "translateY(6px)" }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_top"></div>
        </div>
      )}

      <div
        className="input-group"
        style={{
          width: `${
            field.name === "first_name" || field.name === "last_name"
              ? "50%"
              : "100%"
          }`,
          marginBottom: `${
            field.name === "first_name" || field.name === "last_name" ? "0" : ""
          }`,
        }}
      >
        <box-icon color="gray" type="solid" name={iconName}></box-icon>
        <input
          className={meta.touched && meta.error ? "input_error_border" : null}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <i className="error_icon"></i>}
      </div>

      {/* {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: "translateY(-6px)" }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_bottom"></div>
        </div>
      )} */}
    </>
  );
}

export default RegisterInput;
