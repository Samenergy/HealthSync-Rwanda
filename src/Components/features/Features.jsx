
export default function Features() {
    return (
      <div className="relative isolate overflow-hidden bg-[#011C36] py-20 sm:py-16">
        
        <div className="pi-20">
          <div className="mx-auto max-w-full lg:mx-0 pl-[100px]">
            <h2 className="text-4xl font-bold tracking-tight text-[#ffffff] sm:text-6xl mr-20 text-center max-w-full">Our Features</h2>
            <div className="py-10 flex flex-col lg:flex-row justify-center items-center max-w-full px-4 lg:px-20">
                <div className="w-full lg:w-[260px] bg-black h-[405px] p-10 rounded-sm mr-20 mb-8 lg:mb-0 lg:mr-8">
                    <div className=" lg:ml-8 ml-[30%] flex justify-center items-center rounded-full bg-[#011C36] w-16 h-16 lg:w-28 lg:h-20 mb-6">
                      <img className="w-20 h-auto lg:w-20 lg:h-auto" src="./src/assets/nurse.svg" alt="" />
                    </div>
                    <h2 className="text-white text-lg lg:text-xl font-bold mb-4 text-center lg:text-center">Patient Care</h2>
                    <p className="text-gray-50 text-center lg:text-center">Simplify patient check-in, access medical history securely, and Stay organized with appointment scheduling and reminders.
                    </p>
                </div>
                <div className="w-full lg:w-[260px] bg-black h-auto p-10 rounded-sm mr-20 mb-8 lg:mb-0 lg:mr-8">
                    <div className=" lg:ml-8 ml-[30%] flex justify-center items-center rounded-full bg-[#011C36] w-16 h-16 lg:w-28 lg:h-20 mb-6">
                      <img className="w-20 h-auto lg:w-20 lg:h-auto" src="./src/assets/data-storage.svg" alt="" />
                    </div>
                    <h2 className="text-white text-lg lg:text-xl font-bold mb-4 text-center lg:text-center">Patient Data Storage</h2>
                    <p className="text-gray-50 text-center lg:text-center">Digitize patient records for easy access and ensure HIPAA-compliant data security measures are in place.
                    </p>
                </div>
                <div className="w-full lg:w-[260px] bg-black h-auto p-10 rounded-sm mr-20 mb-8 lg:mb-0 lg:mr-8">
                    <div className=" lg:ml-8 ml-[30%] flex justify-center items-center rounded-full bg-[#011C36] w-16 h-16 lg:w-28 lg:h-20 mb-6">
                      <img className="w-20 h-auto lg:w-20 lg:h-auto" src="./src/assets/health.svg" alt="" />
                    </div>
                    <h2 className="text-white text-lg lg:text-xl font-bold mb-4 text-center lg:text-center">Automated Insurance Claims</h2>
                    <p className="text-gray-50 text-center lg:text-center">Submit claims in real-time and integrate seamlessly with insurance providers for faster reimbursement.
                    </p>
                </div>
                <div className="w-full lg:w-[260px] bg-black h-auto p-10 rounded-sm mr-20 mb-8 lg:mb-0 lg:mr-8">
                    <div className=" lg:ml-8 ml-[30%] flex justify-center items-center rounded-full bg-[#011C36] w-16 h-16 lg:w-28 lg:h-20 mb-6">
                      <img className="w-20 h-auto lg:w-20 lg:h-auto" src="./src/assets/reports.svg" alt="" />
                    </div>
                    <h2 className="text-white text-lg lg:text-xl font-bold mb-4 text-center lg:text-center">Data Reports</h2>
                    <p className="text-gray-50 text-center lg:text-center">Generate customizable reports for insights into patient demographics and trends, enabling informed decision-making.
                    </p>
                </div>   
            </div>
          </div>
        </div>
      </div>
    )
  }

