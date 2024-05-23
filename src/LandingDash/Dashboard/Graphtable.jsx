import React from "react";

const Graphtable = () => {
  return (
    <div className=' w-[450px] bg-white px-5 pb-5 shadow-xl rounded-lg mt-5'>
      <div className='pt-5'>
        <h1 className='text-[15px] font-bold'>Reports</h1>
        <div  className='flex items-center gap-2 justify-between px-16 font-semibold'>
          <a href="">Weekly</a>
          <a href="">Monthly</a>
          <a href="">Yearly</a>
        </div>
        <div>
          <img src="./src/assets/chart.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Graphtable;
