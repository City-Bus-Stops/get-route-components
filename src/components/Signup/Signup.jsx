import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Icon, Button, Segment } from 'semantic-ui-react';
import { isEmpty, head } from 'lodash';

import InputField from '../InputField/InputField';

const Signup = ({ email, password, confirmPassword, errors, signUp, setFormField }) => (
  <Grid centered padded id="signup">
    <Grid.Row>
      <Grid.Column largeScreen={3} mobile={16} widescreen={3}>
        <Segment padded stacked>
          <Grid centered padded>
            <h1 className="font-style-oblique color-beige">
              Create account
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
            <Grid.Row>
              <Grid.Column>
                <InputField
                  type="password"
                  id="confirmPassword"
                  customContent={<Icon name="lock" />}
                  iconPosition="left"
                  label={<p>Confirm Password <sup>*</sup></p>}
                  value={confirmPassword}
                  onChange={value => setFormField('confirmPassword', value)}
                  hasError={!isEmpty(errors.confirmPassword)}
                  error={head(errors.confirmPassword)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column verticalAlign="middle">
                <Link to="/login" className="input-label">
                  Already have account?
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Button
                  fluid
                  color="blue"
                  size="large"
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Signup.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  errors: PropTypes.shape().isRequired,
  signUp: PropTypes.func.isRequired,
  setFormField: PropTypes.func.isRequired,
};

export default Signup;
