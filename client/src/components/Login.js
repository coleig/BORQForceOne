import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_ERRORS = "GET_ERRORS";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // get errors if not validated correctly
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    // if we made it through the login process
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
  }

  setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    
    // First of all. great work and beatiful dashboard of your projecrt. I can play aroundwith it for a good time since it has 
    // many features. I also like your favicon and all the styling of the website, it matches the theme well.
    
    // However, There are some minor changes you might want to consider. The login part has validation for email and password format, 
    // which is good. It seems that when a user tries to login, it didn't check if the password matches with the stored password in the databse.
    
    // In that case, when I register with an email, I could use that email and another random password to login, which seemed a little odd.
    
    // Hope you can figure that out in the future projects. Overall, great work! Good luck.
    axios
      .post("/login", userData)
      .then(res => {
          localStorage.setItem("email", res.data.email);
          this.props.history.push("/dashboard"); // re-direct to login on successful register
      }) 
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-lg-10 col-xl-9 mx-auto"
            style={{ padding: "100px" }}
          >
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex col-6" />
              <div className="card-body">
                <h5 className="card-title">Login below</h5>
                <p className="grey-text text-darken-1">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
                <form
                  className="form-signin"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <div className="form-label-group">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                  </div>
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password || errors.passwordincorrect
                      })}
                    />
                  </div>

                    <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                    >
                      Login
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps
)(withRouter(Login));
