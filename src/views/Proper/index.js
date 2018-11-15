import React from 'react';
import Button from '../../components/Button';

class Proper extends React.Component {

  render() {
    console.log('Button', Button.props);
    const MyButton = <Button animated={true} onClick={() => console.log('click')}>Button</Button>;

    console.log('isRequired', Button.propTypes.animated.is);
    return(
    <div>
     { MyButton }
    </div>
    );
  }
}

export default Proper;