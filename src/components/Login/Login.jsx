import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Icon, Button, Segment } from 'semantic-ui-react';
import { isEmpty, head } from 'lodash';

import InputField from '../InputField/InputField';

const Login = ({ email, password, errors, logIn, setFormField }) => (
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
                  iconPosition="left"
                  label={<p>Email <sup>*</sup></p>}
                  value={email}
                  onChange={value => setFormField('email', value)}
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
                  iconPosition="left"
                  label={<p>Password <sup>*</sup></p>}
                  value={password}
                  onChange={value => setFormField('password', value)}
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
                  onClick={logIn}
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
  logIn: PropTypes.func.isRequired,
  setFormField: PropTypes.func.isRequired,
};

export default Login;
