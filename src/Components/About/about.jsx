
  export default function About() {
    return (
      <div className="relative isolate overflow-hidden bg-gray-50 py-20 sm:py-16">
        
        <div className="pi-20">
          <div className="mx-auto max-w-full lg:mx-0 pl-[100px]">
            <h2 className="text-4xl font-bold tracking-tight text-[#001E3C] sm:text-6xl mr-20 text-center max-w-full">About us</h2>
            <div className="flex flex-col lg:flex-row">
                <img className="h-[400px] w-full lg:w-auto max-w-full p-10" src="./src/assets/about-img.jpg" alt="" />
                <div className="flex flex-col justify-between lg:ml-10">
                    <div className="pr-5 py-5 lg:pr-20 lg:py-0 lg:mt-10">
                        <h2 className="font-bold tracking-tight text-[#001E3C] sm:text-xl lg:text-xl max-w-full">
                            Mission:
                        </h2>
                        <p className="font-normal tracking-tight text-[#001E3C] sm:text-md lg:text-md text-left max-w-full">
                        At HealthSync Rwanda, our mission is to revolutionize healthcare record management in Rwanda 
                        by providing innovative and user-friendly solutions that enhance efficiency, accuracy, and 
                        patient care outcomes. We are committed to empowering healthcare providers with advanced 
                        technology tools to streamline processes, improve accessibility to medical information, 
                        and ultimately, contribute to the well-being of communities across Rwanda.
                        </p>
                    </div>
                    <div className="pr-5 py-5 lg:pr-20 lg:py-0 lg:mb-10">
                        <h2 className="font-bold tracking-tight text-[#001E3C] sm:text-xl lg:text-xl max-w-full">
                            Vision:
                        </h2>
                        <p className="font-normal tracking-tight text-[#001E3C] sm:text-md lg:text-md text-left max-w-full">
                        Our vision is to establish HealthSync Rwanda as a leading provider of electronic health record (EHR) systems in Rwanda, 
                        recognized for our commitment to excellence, integrity, and customer satisfaction. We envision a future where healthcare 
                        facilities across Rwanda seamlessly transition to digital record management, resulting in improved healthcare delivery, 
                        better health outcomes, and a healthier society overall.
                        </p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
