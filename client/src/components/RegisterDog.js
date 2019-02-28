import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class RegisterDog extends Component {
  constructor() {
    super();
    this.state = {
      myemail: "",
      name: "",
      age: "",
      breed: "",
      gender: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newDog = {
      myemail: this.state.myemail,
      name: this.state.name,
      age: this.state.age,
      breed: this.state.breed,
      gender: this.state.gender
    };

    axios
      .post("/dogs", newDog)
      .then(res => this.props.history.push("/mydogs"))
      .catch(err => console.log(err));
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
                <h5 className="card-title">Add Dog</h5>

                <p className="grey-text text-darken-1">
                  Back to <Link to="/mydogs">My Dogs</Link>
                </p>
                <form
                  className="form-signin"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <div className="form-label-group">
                    <label htmlFor="name">Email</label>

                    <input
                      onChange={this.onChange}
                      value={this.state.myemail}
                      error={errors.myemail}
                      id="myemail"
                      type="text"
                      className={classnames("", {
                        invalid: errors.myemail
                      })}
                    />
                    <span className="red-text">{errors.myemail}</span>
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="name">Dog's Name</label>

                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                    <span className="red-text">{errors.name}</span>
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="age">Age</label>

                    <input
                      onChange={this.onChange}
                      value={this.state.age}
                      error={errors.age}
                      id="age"
                      type="age"
                      className={classnames("", {
                        invalid: errors.age
                      })}
                    />
                    <span className="red-text">{errors.age}</span>
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="breed">Breed</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.breed}
                      error={errors.breed}
                      id="breed"
                      type="breed"
                      className={classnames("", {
                        invalid: errors.breed
                      })}
                    />
                    <span className="red-text">{errors.breed}</span>
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.gender}
                      error={errors.gender}
                      id="gender"
                      type="gender"
                      className={classnames("", {
                        invalid: errors.gender
                      })}
                    />
                    <span className="red-text">{errors.gender}</span>
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
                      Add dog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterDog.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(RegisterDog));