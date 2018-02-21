import React, {Component} from 'react';
import UserProfileModal from '../components/UserProfileModal.js';
import axios from 'axios'
import {Row} from 'antd';
import MatchCard from "../components/MatchCard";
import Main from "./Main"

class FilterWants extends Main {
    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                },
				params: {
					has: 'false',
					wants: 'true'
				}
            };

            axios.get('/api/users/matches', config)
            .then(res => res.data.matches)
            .then(matches => this.setState({matchedUsers: matches }))
            .catch( (err) => {
                console.log(err);
            });
        }
        // else should redirect to login page
    }
}

export default FilterWants;