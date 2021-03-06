import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../store'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { songList, fetchData: fetchListData } = this.props
    if (!songList.length) {
      fetchListData()
    }
  }

  render() {
    const { songList } = this.props
    return (
      <div>
        <h3>this page is the Home</h3>
        {
          songList.map(({ id, title, picUrl }) => (
            <dl key={id}>
              <dt><img src={picUrl} alt="" srcSet="" /></dt>
              <dd>{title}</dd>
            </dl>
          ))
        }

      </div>
    )
  }
}

Home.serverFetch = fetchData

const mapDispatchToProps = { fetchData }

const mapStateToProps = ({ songList }) => ({ songList })

export default connect(mapStateToProps, mapDispatchToProps)(Home)
