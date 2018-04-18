import React from 'react';

class Contest extends React.Component{
    render() {
        return(
            <div className="Contest">
                <div className="contest-description">
                {this.props.description}
                </div>

                 <div className="home-link link btn btn-primary"
                  onClick={this.props.contestListClick}>
                    Contest List
                </div>

            </div>
        );
    }
}

Contest.propTypes = {
    description:React.PropTypes.string.isRequired,
    contestListClick:React.PropTypes.func.isRequired,
}

export default Contest;