import React, {Component} from 'react';
import axios from'axios';
import ProductCarousel from './product_carousel';

class ProductDetails extends Component{
    state ={
        details: null
    }

    async componentDidMount(){
        setTimeout(()=>{
            this.getDetails()
        }, 10);
    }

    async getDetails(){
        const {params} = this.props.match;
        //Call server to get product details

        const resp = await axios.get(`/api/getproductdetails.php?productId=${params.product_id}`);

        if(resp.data.success){
            this.setState({
                details: resp.data.productInfo
            });
        } else {
            this.setState({
                details: false
            });
        }

        
    }

    render(){
        console.log('product details:', this.state.details);

        const {details} = this.state;

        if(details === null){
            return <h1>Loading...</h1> //make some fancy loading animation
        } else if(!details){
            return <h1 className="center">No Product Found</h1>
        }

        const { description = "No desription currently available", images, name } = details;

        // const images = details.images.map((image, index)=>{
        //     return(
        //         <img key={index} src={`/dist/${image}`} className="staticimage"/>
        //     )
        // });
        const price = (details.price / 100).toFixed(2);
        return(
            <div className="product-details">
                <h1 className="center">{name}</h1>
                <ProductCarousel images={images}/>
                
                <h2 className="center">{`$${price}`}</h2>
                <p>{description}</p>
            </div>
        );
    }
}

export default ProductDetails;
