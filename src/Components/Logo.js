// Logo.js - This component displays the application's logo.

const Logo = () => {
  return (
    // Renders the logo image with specific styles and positioning
    <img 
      src="/image/logo.png" // Path to the logo image
      alt="XS Logo" // Alternative text for accessibility
      className="w-15 h-15 absolute top-2 left-20" // Sets width, height, and absolute positioning
    />
  );
};

export default Logo;
