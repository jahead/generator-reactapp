import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import Radium from 'radium'
import {changeTitle} from '../actions'

@connect(state => state, {changeTitle})
@Radium
class Home extends React.Component {
    componentDidMount() {
        this.props.changeTitle('ReactApp')
    }
    render () {
        return (
            <div style={[styles.base, styles.larger]}>Hello {this.props.title}</div>
        )
    }
}

const styles = {
    base: {
        color: 'red'
    },
    larger: {
        fontSize: 20
    }
}

export default Home
