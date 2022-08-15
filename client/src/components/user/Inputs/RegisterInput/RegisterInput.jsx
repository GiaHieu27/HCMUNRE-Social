import { ErrorMessage, useField } from "formik";

function RegisterInput({ iconName, placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error && (
        <div
          className={`input_error ${
            field.name === "first_name" ? "" : "input_error_desktop"
          }`}
          style={{
            transform: `${
              field.name === "email" ||
              field.name === "first_name" ||
              field.name === "last_name"
                ? "translateY(18px)"
                : "translateY(3px)"
            } `,
            position: `${field.name === "first_name" ? "absolute" : ""}`,
            left: `${field.name === "first_name" ? "-10.2rem" : ""}`,
            width: `${field.name === "first_name" ? "43%" : ""}`,
          }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              field.name === "first_name"
                ? "error_arrow_left"
                : "error_arrow_right"
            }
          ></div>
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
          className={meta.touched && meta.error ? "input_error_border" : ""}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.touched && meta.error && <i className="error_icon"></i>}
      </div>
    </>
  );
}

export default RegisterInput;
