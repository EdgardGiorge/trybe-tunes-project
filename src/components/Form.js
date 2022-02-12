import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { value, onChange, disable, onClick, id, data, dataBtn, text } = this.props;
    return (
      <form>
        <label htmlFor={ id }>
          <input
            name="userName"
            value={ value }
            type="text"
            data-testid={ data }
            onChange={ onChange }
            id={ id }
          />
        </label>
        <button
          type="button"
          data-testid={ dataBtn }
          disabled={ disable }
          onClick={ onClick }
        >
          {text}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  dataBtn: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Form;
