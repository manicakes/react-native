/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule DimensionsChangeExample
 * @flow
 */
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  DeviceEventEmitter,
  Text,
  View,
  Dimensions,
} = ReactNative;

import type EmitterSubscription from 'EmitterSubscription';

class DimensionsChangeExample extends React.Component {
  _dimensionsSubscription: EmitterSubscription;

  constructor(props) {
    super(props);
    this.state = Dimensions.get('window');
  }

  componentDidMount() {
    this._dimensionsSubscription = DeviceEventEmitter.addListener(
      'didUpdateDimensions', this._onDimensionsChange,
    );
  }

  componentWillUnmount() {
    this._dimensionsSubscription.remove();
  }

  _onDimensionsChange = (dimensions: Object) => {
    this.setState({
      ...dimensions.window,
    });
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

exports.title = 'DimensionsChangeExample';
exports.description = 'listening to dimensions changes';
exports.examples = [
  {
    title: 'DimensionsChangeExample',
    description: 'listening to device dimension changes',
    render() { return <DimensionsChangeExample />; },
  },
];
