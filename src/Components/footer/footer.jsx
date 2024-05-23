import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-800 text-gray-300 py-6">
        <div class="container mx-auto flex justify-between items-center">
          <div>
            <p>&copy; 2024 HealthSync Rwanda. All rights reserved.</p>
            <p>Designed and developed by HealthySync Devs </p>
          </div>
          <div>
            <ul class="flex space-x-4">
              <li><a href="#" class="hover:text-gray-400">About Us</a></li>
              <li><a href="#" class="hover:text-gray-400">Services</a></li>
              <li><a href="#" class="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;