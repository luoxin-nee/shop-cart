import React from 'react';
import { connect } from 'dva';
import { d } from '../utils/utils';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import './ProductList.css';




class Nav extends React.Component {
  Highest=()=>{

  }
 render() {
    const { Option } = Select;
    const { products, select , OnChange} = this.props;
   
 const children = [ <Option key={ "default"}>{ "default sort"}</Option>,<Option key={ "Highest"}>{ "Highest to lowest"}</Option>,<Option key={ "lowest"}>{ "lowest to Highest"}</Option>];
  

    return (
      <div>
        <h1>{(select.productSize.length === 0 ? products.length : select.productSize.length)} Product(s)found</h1>
        <div id="components-dropdown-demo-dropdown-button">

          
          {/* <Select
          defaultValue="default sort"
          onChange={(value)=>OnChange(value,select.size)}
          style={{ width: 200 }}
        >
          {children}
        </Select> */}
         
        </div>
        
      </div>
    );
  }
};

const mapStateToProps = ({ products, selected }) => ({
    products: d(products.byId, products.result),
    select: selected
  
})

const mapDispatchToProps = (dispatch) => ({
  OnChange: (change,size) => dispatch({
     type: 'selected/add',
     payload: {
       change,
       size
     }
   }),
  
})


export default connect(mapStateToProps, mapDispatchToProps)(Nav);