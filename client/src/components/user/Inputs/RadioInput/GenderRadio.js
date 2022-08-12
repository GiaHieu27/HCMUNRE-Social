import { useMediaQuery } from "react-responsive";

function GenderSelect({ ...props }) {
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${props.genderError && !view3 && "50px"}` }}
    >
      <label htmlFor="male">
        Nam
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={props.handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Nữ
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={props.handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        Khác
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={props.handleRegisterChange}
        />
      </label>
      {props.genderError && (
        <div
          className={
            view3 ? "input_error input_error_select_large_right" : "input_error"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_right"}
          ></div>
          {props.genderError}
        </div>
      )}
    </div>
  );
}

export default GenderSelect;
