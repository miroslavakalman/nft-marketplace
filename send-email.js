const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY || '73028203edbead27f44657d16b8fea3c-2e68d0fb-44d45082'});
  
  mg.messages.create('sandbox-123.mailgun.org', {
  	from: "Miroslava <Emailmisikmisikovna@gmail.com>",
  	to: ["misikmisikovna@gmail.com"],
  	subject: "Hello",
  	text: "Testing some Mailgun awesomeness!",
  	html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error