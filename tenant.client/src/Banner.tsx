import { useState } from 'react';

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState('');

  const handleBannerUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedBannerUrl = reader.result as string;
        setBannerUrl(uploadedBannerUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Banner Preview:</h2>
      <input type="file" accept="image/*" onChange={handleBannerUpload} />
      {bannerUrl ? (
        <div>
          <img src={bannerUrl} alt="Uploaded Banner" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      ) :
        <h3>No Banner found</h3>
    }
    </div>
  );
};

export default Banner;
