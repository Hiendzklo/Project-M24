//src/pages/user/CategorySection
import React, { useRef } from 'react';

const categories = [
  { name: 'Thời Trang Nam', icon: 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn' },
  { name: 'Điện Thoại & Phụ Kiện', icon: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn' },
  { name: 'Thiết Bị Điện Tử', icon: 'https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn' },
  { name: 'Máy Tính & Laptop', icon: 'https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn' },
  { name: 'Máy Ảnh & Máy Quay Phim', icon: 'https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn' },
  { name: 'Đồng Hồ', icon: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn' },
  { name: 'Giày Dép Nam', icon: 'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de_tn' },
  { name: 'Thiết Bị Điện Gia Dụng', icon: 'https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn' },
  { name: 'Thể Thao & Du Lịch', icon: 'https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4_tn' },
  { name: 'Ô Tô & Xe Máy & Xe Đạp', icon: 'https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn' },
  { name: 'Balo & Túi ví Nam', icon: 'https://down-vn.img.susercontent.com/file/18fd9d878ad946db2f1bf4e33760c86f_tn' },
  { name: 'Đồ chơi', icon: 'https://down-vn.img.susercontent.com/file/ce8f8abc726cafff671d0e5311caa684_tn' },
  { name: 'Chăm sóc thú cưng', icon: 'https://down-vn.img.susercontent.com/file/cdf21b1bf4bfff257efe29054ecea1ec_tn' },
  { name: 'Dụng cụ & thiết bị tiện ích', icon: 'https://down-vn.img.susercontent.com/file/e4fbccba5e1189d1141b9d6188af79c0_tn' },
  { name: 'Thời Trang Nữ', icon: 'https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d_tn' },
  { name: 'Mẹ & Bé', icon: 'https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e_tn' },
  { name: 'Nhà Cửa & Đời Sống', icon: 'https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f_tn' },
  { name: 'Sắc Đẹp', icon: 'https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72_tn' },
  { name: 'Sức Khỏe', icon: 'https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747_tn' },
  { name: 'Giày Dép Nữ', icon: 'https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847_tn' },
  { name: 'Túi Ví Nữ', icon: 'https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52_tn' },
  { name: 'Phụ Kiện & Trang Sức Nữ', icon: 'https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e_tn' },
  { name: 'Bách Hóa Online', icon: 'https://down-vn.img.susercontent.com/file/c432168ee788f903f1ea024487f2c889_tn' },
  { name: 'Nhà Sách Online', icon: 'https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139_tn' },
  { name: 'Thời trang trẻ em', icon: 'https://down-vn.img.susercontent.com/file/4540f87aa3cbe99db739f9e8dd2cdaf0_tn' },
  { name: 'Giặt giũ & Chăm sóc nhà cửa', icon: 'https://down-vn.img.susercontent.com/file/cd8e0d2e6c14c4904058ae20821d0763_tn' },
  { name: 'Voucher & Dịch vụ', icon: 'https://down-vn.img.susercontent.com/file/b0f78c3136d2d78d49af71dd1c3f38c1_tn' },
];

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName);
    // Bạn có thể thực hiện các hành động khác tại đây, như chuyển hướng đến trang danh mục hoặc gọi API
  };

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">DANH MỤC</h2>
        <div className="relative">
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10">
            &lt;
          </button>
          <div className="flex overflow-x-auto no-scrollbar" ref={scrollRef}>
            <div className="flex flex-col">
              <div className="flex">
                {categories.slice(0, 14).map((category, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-32 mx-2 cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <img src={category.icon} alt={category.name} className="w-16 h-16 mb-2"/>
                    <p className="text-center">{category.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex mt-4">
                {categories.slice(14).map((category, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-32 mx-2 cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <img src={category.icon} alt={category.name} className="w-16 h-16 mb-2"/>
                    <p className="text-center">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
