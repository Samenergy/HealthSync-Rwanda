const people = [
  {
    name: "Samuel Dushime",
    role: "Developer",
    imageUrl: "/IMG_2755.jpeg",
  },
];

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About me
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            I'm a dedicated Software Engineering student at African Leadership
            University with a passion for technology and problem-solving. I
            specialize in software development and have strong skills in
            organization, time management, and attention to detail.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6 mt-5">
                <img
                  className="h-40 w-40 rounded-full ml-12"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-xl font-bold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-lg font-semibold leading-6 text-[#00afee]">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
