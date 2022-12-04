import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationByAge: '',
    vaccinationByGender: '',
    apiStatus: apiConstants.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const CoronaUpdatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const lastSevenDaysData = CoronaUpdatedData.last7DaysVaccination.map(
        each => ({
          doseOne: each.dose_1,
          doseTwo: each.dose_2,
          vaccineDate: each.vaccine_date,
        }),
      )
      this.setState({
        coronaLastSevenDays: lastSevenDaysData,
        vaccinationByAge: CoronaUpdatedData.vaccinationByAge,
        vaccinationByGender: CoronaUpdatedData.vaccinationByGender,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {
      coronaLastSevenDays,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state

    return (
      <>
        <VaccinationCoverage coronaLastSevenDays={coronaLastSevenDays} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="fail-image"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderIsLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderOrNot = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.inProgress:
        return this.renderIsLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="img-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="web-logo"
          />
          <h3 className="logo-head">Co-WIN</h3>
        </div>
        <h2 className="cowing-head">CoWIN Vaccination in India</h2>
        {this.renderOrNot()}
      </div>
    )
  }
}

export default CowinDashboard
