//src/pages/user/FlashSaleSection
import React from 'react';

const flashSales = [
  { name: 'Sản phẩm 1', image: 'https://down-vn.img.susercontent.com/file/sg-11134252-7rdvm-lxlb5x1nnarw3a_tn', price: '675.000', discount: '-12%', tag: 'Mall' },
  { name: 'Sản phẩm 2', image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxauxm9vpgbf70_tn', price: '12.247.000', discount: '-28%', tag: 'Mall' },
  { name: 'Sản phẩm 3', image: 'https://down-vn.img.susercontent.com/file/sg-11134207-7rd67-lx43twse5n4wbc_tn', price: '329.000', discount: '-42%', tag: 'Mall' },
  { name: 'Sản phẩm 4', image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwmnybfu8wyh5c_tn', price: '319.000', discount: '-22%', tag: 'Mall' },
  { name: 'Sản phẩm 5', image: 'https://down-vn.img.susercontent.com/file/4e9cd08809c708642f3f46a36595681b_tn', price: '193.030', discount: '-61%', tag: 'Mall' },
  { name: 'Sản phẩm 6', image: 'https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lqih8f3xk7qt38_tn', price: '231.308', discount: '-40%', tag: 'Mall' },
];

const banner = {
  image: 'https://cf.shopee.vn/file/sg-11134252-7rdvu-lxkk5uge3z34aa',
  alt: 'Banner quảng cáo',
  link: '#',
};

const FlashSaleSection: React.FC = () => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">FLASH SALE</h2>
          <a href="#" className="text-red-500">Xem tất cả &gt;</a>
        </div>
        <div className="flex overflow-x-auto no-scrollbar mb-6">
          {flashSales.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-48 mx-2 bg-gray-100 p-4 rounded-lg" style={{ width: '242px' }}>
              <div className="flex justify-between items-center">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{product.tag}</span>
                <span className="text-red-500 text-xs">{product.discount}</span>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover my-2"/>
              <p className="text-center text-lg font-semibold">{product.price}</p>
              <button className="bg-orange-500 text-white w-full py-1 mt-2 rounded">ĐANG BÁN CHẠY</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <a href={banner.link} className="w-full">
            <img src={banner.image} alt={banner.alt} className="w-full h-auto object-cover rounded-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleSection;