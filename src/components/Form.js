import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { value, onChange, disable, onClick } = this.props;
    return (
      <form>
        <label htmlFor="user">
          <input
            name="userName"
            value={ value }
            type="text"
            data-testid="login-name-input"
            onChange={ onChange }
            id="user"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ disable }
          onClick={ onClick }
        >
          Entrar
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
};

export default Form;
