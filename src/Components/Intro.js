// Intro.js - This component represents the main introductory section of the landing page.

const Intro = () => {
  return (
    // Container div for centering content and setting background and text styles
    <div className="flex flex-col items-center justify-center text-center h-screen bg-black/40 text-white">
      
      {/* Application name with a bold heading */}
      <h1 className="text-6xl font-bold">
        <span className="text-[#000000]">XpenseS</span>
      </h1>

      {/* Description about "X" meaning growth and financial control */}
      <p className="text-[#000000] text-xl mt-4 font-semibold">
        <i>Multiply Your Savings – The "X" represents growth and better financial control.</i>
      </p>

      {/* Description about "S" meaning tracking expenses and savings */}
      <p className="text-[#000000] text-xl mt-4 font-semibold">
        <i>Track Your Expenses – The "S" represents savings.</i>
      </p>
    </div>
  );
};

export default Intro;
