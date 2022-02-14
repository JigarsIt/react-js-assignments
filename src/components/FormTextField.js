export default function FormTextField(props) {
  return (
    <div className="mb-3">
      <label for={props.id} className="form-label">
        {props.label}
      </label>
      <input
        className="form-control"
        onChange={props.handleChange}
        {...props}
      />
    </div>
  );
}
