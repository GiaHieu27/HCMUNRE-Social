import { useField } from "formik";

function RegisterInput({ iconName, placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input-group">
      <box-icon color="gray" type="solid" name={iconName}></box-icon>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
}

export default RegisterInput;
