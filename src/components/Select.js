
import React from 'react';
import 'antd/dist/antd.css';
import {connect} from 'dva';
import { Select } from 'antd';

class SelectSizesDemo extends React.Component {
  
 
render() {
  const {  addToSize } = this.props;
  console.log(this.props);
  const { Option } = Select;
  const children = [];
  const childrens =['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  //   const handleChange=(value) =>{
  // //    addToCart(`Selected: ${value}`)
  //     console.log(value);
  //   }
  for (let i = 0; i < 7; i++) {
    children.push(<Option key={childrens[i]}>{childrens[i]}</Option>);
  }
   
    return (
      <div style={{marginTop:'100px'}}>
        <span style={{fontSize:'30px'}}>Size:</span>
        <Select 
          mode="tags"
          size={'large'}
          placeholder="Please select"
          defaultValue={childrens}
          onChange={(value)=>{addToSize(value)}}
          style={{ width: '100%' ,lineHeight:'100px'}}
        >
          {children}
        </Select>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addToSize:(size) =>dispatch({
    type: 'selected/add',
    payload: {
      size:size
    }
    
  })
})
export default connect(null,mapDispatchToProps)(SelectSizesDemo);
