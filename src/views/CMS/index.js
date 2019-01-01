import React from 'react';

import { ProperContainer, Header, LogoContainer, Menu, MenuItem, MenuButton, Hero } from './styled-components';
const configUrl = 'https://s3-us-west-1.amazonaws.com/configuration-state/config.json';

const fetchConfig = () => {
  return new Promise((resolve, reject) => {
    fetch(configUrl)
      .then((configResp) => configResp.json())
      .then((config) => resolve(config))
      .catch((error) => reject(error));
  })
};

class CMS extends React.Component {
  state = {
    title: '',
    menu: {},
    images: {}
  };

  async componentDidMount() {
    const configState = await fetchConfig();
    console.log('configState', configState);
    this.updateStateFromConfig(configState);
  }

  updateStateFromConfig = (configState) => {
    console.log('update', configState);
    this.setState({
      ...configState
    })
  };
  render() {
    const { title, menu, images } = this.state;

    return(
    <ProperContainer>
      <Header>
        <LogoContainer>Super Logo</LogoContainer>
        <Menu>
            {
              Object.entries(menu).map(([name, properties], idx) => (
                  <MenuItem>
                    {
                      properties.type === 'button'
                        ? <MenuButton>{name}</MenuButton>
                        : <div><p key={name + idx}>{name.toUpperCase()}</p></div>
                    }
                  </MenuItem>
                ))
            }
        </Menu>
      </Header>
      <Hero heroImage={images.lookRight || ''}>{ title }</Hero>
    </ProperContainer>
    );
  }
}

export default CMS;