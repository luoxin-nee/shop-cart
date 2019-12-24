import React from 'react';
import { connect } from 'dva';
import { Drawer, Button, Badge,Icon } from "antd";
class Cart extends React.Component {
  state = { visible: false, placement: "right" };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };


  render() {
   
    
    const { products, subtotal, onCheckout, loading, checking,num,deleteProducts } = this.props;
    const nodes = products.map((item, key) => (
      <li key={key}>
        {item.title} {item.price} x {item.quantity}
        <Button onClick={()=>deleteProducts(item.id,item.quantity)} style={{width:'20px',height:'20px',padding:'0',float:'right'}}><Icon type="close" style={{ fontSize: '20px' }}/></Button>
      </li>
    ));
    
    return (
      <div style={{ display: 'flex', width: "100%" ,paddingTop:'20px'}}>
        <Button style={{ height: '64px', display: 'flex', marginLeft: 'auto', border: "none" }} onClick={this.showDrawer}>
          <span style={{ marginRight: 24 }} >
            <Badge count={num}>
            <Icon type="shopping-cart" style={{ fontSize: '50px' }} />
            </Badge>
          </span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ul>{nodes}</ul>
          <div>Total: {subtotal}</div>
          <div>
            {checking && <div style={{ color: 'red' }}>Checking ...</div>}
            <Button onClick={onCheckout} disabled={subtotal <= 0.00 || loading} ><p style={{ margin: 'auto', lineHeight: '0px' }}>Checkout</p></Button>
          </div>
        </Drawer>

      </div>
    );
  };

}


const mapStateToProps = ({ cart, products, loading }) => ({
  products: cart.added.map(id => ({ ...products.byId[id], quantity: cart.quantities[id] })),
  subtotal: cart.added.reduce((amount, id) => products.byId[id].price * cart.quantities[id] + amount, 0).toFixed(2),
  loading: loading.models['cart'],
  checking: loading.effects['cart/checkout'],
  num:cart.num
})

const mapDispatchToProps = (dispatch) => ({
   onCheckout: () => dispatch({
    type: 'cart/checkout'
  }),
   deleteProducts:(log,num)=>dispatch({
    type: 'cart/delete',
    payload:{log,num} 
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
