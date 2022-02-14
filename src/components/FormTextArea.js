export default function FormTextArea(props) {
  return (
    <div className="mb-3">
      <label for={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        className="form-control"
        onChange={props.handleChange}
        {...props}
      ></textarea>
    </div>
  );
}
