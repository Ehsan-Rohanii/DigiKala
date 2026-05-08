import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import FetchData from "../../Utils/FetchData";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ad1 from '/assets/ad1.jpg';





export default function Products() {
  const [products, setProducts] = useState([]); // Initialize with empty array
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [productCount, setProductCount] = useState(0); // Initialize with 0
  const { categoryId } = useParams();
  const itemsPerPage = 10;
  useEffect(() => {
    (async () => {
      const result = await FetchData(
        `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}sort=${sort}&minPrice[$gte]=${price[0]}&maxPrice[$lte]=${price[1]}&page=${page}&limit=${itemsPerPage}&populate=defaultProductVariantId,variantIds`,
      );
      setProducts(result.data);
      setProductCount(result.count);
      console.log(products)
    })();
  }, [sort, price, page, categoryId]);
  return <div>
    
  </div>
}
