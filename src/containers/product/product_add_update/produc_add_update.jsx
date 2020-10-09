import React, { Component } from 'react'

export default class ProductAddUpdate extends Component {
    render() {
        const {id} = this.props.match.params;
        return (
            <div>
                <span>ProductAddUpdate{id}</span>
            </div>
        )
    }
}
