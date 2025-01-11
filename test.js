const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY || 'aab8b0d1212612384cf948052da5c49d-7113c52e-7dc5188a'});



  
  mg.messages.create('etherart.ru', {
  	from: "Excited User <postmaster@etherart.ru>",
  	to: ["misikmisikovna@gmail.com"],
  	subject: "Hello",
  	text: "Testing some Mailgun awesomeness!",
  	html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error