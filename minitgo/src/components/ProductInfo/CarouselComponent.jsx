
  


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarouselComponent({ productId, selectedImageIndex }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://minitgo.com/api/fetch_products.php')
      .then(response => {
        const products = response.data.data;
        const selectedProduct = products.find(p => p.product_id === productId);
        if (selectedProduct) {
          const productImages = [];
          for (let i = 1; i <= 5; i++) {
            if (selectedProduct[`product_image${i}`]) {
              productImages.push(selectedProduct[`product_image${i}`]);
            }
          }
          setImages(productImages);
        } else {
          setError("Product not found");
        }
      })
      .catch(error => {
        setError(error);
      });
  }, [productId]);

  return (
    <div id="carouselExampleIndicators" className="carousel slide v w-100 border rounded-2" data-bs-ride="carousel" style={{ height: '100%' }}>
      <div className="carousel-inner rounded h-100">
        {images.map((img, index) => (
          <div key={index} className={`h-100 carousel-item ${index === selectedImageIndex ? ' active' : ''}`}>
            <img className="d-block w-100 h-100" src={img} alt={`Slide ${index}`}/>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev rounded-circle p-2 ms-1" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{ height: "30px", top: "50%", width: "35px", backgroundColor: "#99ccff " }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next rounded-circle p-2 me-1" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{ height: "30px", top: "50%", width: "35px", backgroundColor: "#99ccff" }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselComponent;
