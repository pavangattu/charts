import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {coronaLastSevenDays} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-contianer">
      <h1>Vaccination Coverage</h1>
      {/* <ResponsiveContainer> */}
      <BarChart
        data={coronaLastSevenDays}
        margin={{
          top: 5,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="doseOne" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="doseTwo" name="Dose 2" fill=" #f54394" barSize="20%" />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationCoverage
