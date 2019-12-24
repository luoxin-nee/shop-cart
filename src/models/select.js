import shop from "../api/shop";


export default {
  namespace: "selected",
  state: {size: ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'],
  productSize:[],
  change:'default',
  },
  
  effects: {
    
    *add({payload: { size ,change}}, {  put ,call }) {
      const res = yield call(shop.getProducts);
      //const { selected } = yield select();
      
      const checkAdult=(product)=> {
        for(var s=0; s<size.length;s++){
          for(var i=0;i<product.availableSizes.length;i++){
            if (size[s]===product.availableSizes[i]){
              return product;
            }
          }
      }
      };
      const productSize=res.data.filter(checkAdult);
      const changes=change
      const products=res.data.filter(checkAdult);
       console.log(productSize)
      yield put({
          type: 'addToSize',
          payload: {
            size,
            productSize,
            changes,
            products
          }
        })
      
    },
    
  },
  reducers: {
    addToSize: (state, { payload: { size,productSize ,changes,products} }) => {
      return {
        ...state,
        size:size,
        productSize:(changes==='default'?products:(changes==='Highest'?(productSize.sort((a, b)=>{return b.price - a.price})):(productSize.sort((a, b)=>{return a.price - b.price})))),
        change:changes
      }
    },
    
  }
};

