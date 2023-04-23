/* Name: script.js
   Author: Cory Gyarmathy
   Description: Scripting for Contact page
   Version: 1.0
*/

/* ChatGPT: how would I use javascript to take input from the above form and save it locally? */

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Access form field values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const enquiry = document.getElementById('enquiry').value;
    const equiry_type = document.getElementById('equiry_type').value;
    const newsletter = document.getElementById('newsletter').checked;
  
    // Create an object to store form data
    const formData = {
      name: name,
      email: email,
      enquiry: enquiry,
      equiry_type: equiry_type,
      newsletter: newsletter
    };
  
    // Save form data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  
  });
  