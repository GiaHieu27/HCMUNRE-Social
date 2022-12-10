import PropTypes from 'prop-types';

function PostError({ error, setError }) {
  return (
    <div className="postError">
      <div className="postError_error">{error}</div>
      <button
        className="green_btn"
        onClick={() => {
          setError('');
        }}
      >
        Try again
      </button>
    </div>
  );
}

PostError.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
};

export default PostError;
