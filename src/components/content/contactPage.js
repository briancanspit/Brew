import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import Styles from "./styles/contact.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const LoadingContainer = () => (
  <div className={Styles.preloader}>
    <img src={require("../../images/preloader.svg")} alt="Preloader" />
  </div>
)

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPopoverOpen: false,
      submitted: false,
      firstName: "",
    }
  }

  handleChange = event => {
    const { value } = event.target
    this.setState({
      firstName: value,
    })
  }

  handleHover = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    })
  }

  handleSubmit = () => {
    this.setState({
      submitted: true,
    })
  }

  handleMessage = () => {
    if (this.state.submitted) {
      return <span className="alert alert-success">Your message was sent!</span>
    }
    if (this.state.firstName.length > 0) {
      return (
        <span className="alert alert-info">
          We're anxious for your message, {this.state.firstName}
        </span>
      )
    } else {
      return null
    }
  }

  render() {
    const mapStyles = { width: "100%", height: "90%" }
    let card = `card mb-3 ${Styles.card}`
    let cardTitle = `card-title text-center ${Styles.cardTitle}`
    let submitBtn = ` btn btn-block ${Styles.submitButton} mb-2`

    return (
      <div className={Styles.container}>
        <div className={card}>
          <div className="row no-gutters">
            <div className="col-md-5">
              <div className="card-body">
                <h5 className={cardTitle}>We'd love to hear from you</h5>
                <div className="text-center mt-3 mb-3">
                  <p className="badge badge-info mr-2">We love ideas</p>
                  <p className="badge badge-warning mr-2">We solve issues</p>
                  <p className="badge badge-danger mr-2">We act fast</p>
                  <p className="badge badge-success mr-2">We value you</p>
                </div>
                <div className="mb-4 mt-0">{this.handleMessage()}</div>
                <form onSubmit={this.handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        maxLength="15"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Your Message"
                      rows="7"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className={submitBtn}>
                      <span className="mr-2">Send Message</span>
                      <FontAwesomeIcon
                        className={Styles.fontAwesome}
                        icon={faPaperPlane}
                      />
                    </button>
                  </div>
                </form>
                <p className="card-text">
                  <small className="text-muted">We will soon be in touch</small>
                </p>
              </div>
            </div>
            <div className="col-md-7">
              {this.state.isPopoverOpen ? (
                <span className="alert alert-success mb-4">
                  Haile Selassie Ave, P.O. BOX 1234-30200, Nairobi KE
                </span>
              ) : (
                <span className="alert alert-warning mb-4">
                  Hover over the map to view our address
                </span>
              )}
              <div onMouseOver={this.handleHover} onMouseOut={this.handleHover}>
                <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{ lat: -1.2921, lng: 36.8219 }}
                  className="mt-4"
                >
                  <Marker
                    title={"Zoom in for our main office street address"}
                    name={"BREW"}
                    position={{ lat: -1.2921, lng: 36.8219 }}
                  />
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MainContent)
