import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import Drawer from '../../components/Drawer.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing Drawer component', () => {
    it('renders as expected', () => {
        const wrapper = shallow(
            <Drawer />
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});