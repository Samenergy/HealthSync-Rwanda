import React from 'react';

const UserFilter = ({ filter, setFilter }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="w-[970px] bg-white ml-20 px-5 pb-5 shadow-xl rounded-lg mt-5">
      <div className="flex justify-between items-center pt-3 pb-3">
        <input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleInputChange}
          placeholder="Filter by Name"
          className="mr-2"
        />
        <input
          type="text"
          name="role"
          value={filter.role}
          onChange={handleInputChange}
          placeholder="Filter by Role"
          className="mr-2"
        />
        <input
          type="text"
          name="email"
          value={filter.email}
          onChange={handleInputChange}
          placeholder="Filter by Email"
          className="mr-2"
        />
        <input
          type="text"
          name="speciality"
          value={filter.speciality}
          onChange={handleInputChange}
          placeholder="Filter by Speciality"
          className="mr-2"
        />
      </div>
    </div>
  );
}

export default UserFilter;
