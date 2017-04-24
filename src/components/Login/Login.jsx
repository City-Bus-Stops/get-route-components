import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Icon, Button, Segment } from 'semantic-ui-react';
import { isEmpty, head } from 'lodash';

import InputField from '../InputField/InputField';
import { validateLoginForm } from '../../validation';

const Login = ({ email, password, actions, errors }) => (
  <Grid centered padded id="login">
    <Grid.Row>
      <Grid.Column largeScreen={3} mobile={16} widescreen={3}>
        <Segment padded stacked>
          <Grid centered padded>
            <h1 className="font-style-oblique color-beige">
              Log-in to your account
            </h1>
            <Grid.Row>
              <Grid.Column>
                <InputField
                  type="text"
                  id="email"
                  customContent={<Icon name="user" />}
                  customContentPosition="left"
                  label={<p>Email <sup>*</sup></p>}
                  initialValue={email}
                  onChange={value => actions.setFormField('loginForm', 'email', value)}
                  hasError={!isEmpty(errors.email)}
                  error={head(errors.email)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <InputField
                  type="password"
                  id="password"
                  customContent={<Icon name="lock" />}
                  customContentPosition="left"
                  label={<p>Password <sup>*</sup></p>}
                  initialValue={password}
                  onChange={value => actions.setFormField('loginForm', 'password', value)}
                  hasError={!isEmpty(errors.password)}
                  error={head(errors.password)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column verticalAlign="middle">
                <Link to="/signup" className="input-label">
                  New to us?
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Button
                  fluid
                  color="blue"
                  size="large"
                  onClick={() => {
                    const validateErorrs = validateLoginForm({ email, password });
                    if (isEmpty(validateErorrs)) {
                      actions.logIn(email, password);
                    } else {
                      actions.formSubmitFailed('loginForm', validateErorrs);
                    }
                  }}
                >
                  Login
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errors: PropTypes.shape().isRequired,
  actions: PropTypes.shape({
    logIn: PropTypes.func.isRequired,
    setFormField: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
