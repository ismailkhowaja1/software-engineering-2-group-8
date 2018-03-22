import React, { Component } from 'react';
import { AppRegistry, SectionList, Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements'
import Drawer from '../components/Drawer.js';
import AuthService from "../components/AuthService";
import axios from 'axios';
import ProfileCard from "../components/ProfileCard";
import ProfileSkills from "../components/ProfileSkills.js";

export default class UserProfile extends React.Component {
	// Create new component that extends this
	constructor() {
		super();
		this.state = {
			profileId: '',
			isCurrentUser: false,
			userProfile: '',
			name: {
				first: '',
				last: '',
			},
			email: '',
			has: [],
			want: [],
		}
		this.authService = new AuthService();
	}

	componentDidMount() {
		this.mounted = true;
		this.getProfileId();
	}

	componentWillUnmount() {
		this.mounted = false;
		this.setState({ profileId: '' });
		if (this.props.navigation.state.params !== undefined &&
			this.props.navigation.state.params !== null &&
			this.props.navigation.state.params.profileID !== null) {
			this.props.navigation.state.params.profileID = '';
		}
	}

	async getProfileId() {
		if (this.props.navigation.state.params && this.props.navigation.state.params !== undefined && this.props.navigation.state.params.profileID) {
			this.setState({
				profileId: this.props.navigation.state.params.profileID,
				isCurrentUser: false,
			}, this.fetchTrades);
		} else {
			const profile = await this.authService.getProfile();
			this.setState({
				profileId: profile.id,
				isCurrentUser: true,
			}, this.fetchTrades);
		}
	}


	async fetchTrades() {
		const { profileId } = this.state;
		let endpoint = `http://favour-trader-test.appspot.com/api/users/${profileId}/profile/`;
		if (this.authService.loggedIn() && this.mounted) {
			const profile = await this.authService.getProfile();
			this.authService.getToken()
				.then(token => {
					const config = {
						headers: {
							Authorization: token,
						},
					};

					axios.get(endpoint, config)
						.then(res => res.data)
						.then(profileInfo => {
							if (this.mounted) {

								this.setState({
									userProfile: profileInfo.user,
									name: {
										first: profileInfo.user.name.first,
										last: profileInfo.user.name.last,
									},
									email: profileInfo.user.email,
									has: profileInfo.user.has,
									wants: profileInfo.user.wants,
								})
							}
						})
						.catch((err) => {
							console.log(err);
						});
				})
		}
	}

	render() {
		return (
			<View >
				<ProfileCard name={this.state.name} email={this.state.email} />
				<ProfileSkills has={this.state.has} wants={this.state.wants} />
				{
					this.state.isCurrentUser ? (
						<View></View>
					) : (
							<Button
								icon={<Text style={{ color: 'white' }}>⇌</Text>}
								backgroundColor='#03A9F4'
								buttonStyle={styles.button}
								title='Offer Trade'
								onPress={() => { }} />
						)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	button: {
		borderRadius: 0,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 10,
		width: 300
	}
});

