document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
document.querySelector('#compose-form').addEventListener('submit', compose_submit);
  // By default, load the inbox
  load_mailbox('inbox');

  

});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(mails => {
    // api and ou implemenatation works(for test console log)
                                                                console.log(mails)
    mails.forEach( mail => {
      // works till here
                                                                console.log(mail)
    div = document.querySelector('#mail');
    outline = document.createElement('ul');
    outline.className = 'list-group';
    body = document.createElement('ul');
    body.className = 'list-group-item';
    body.innerHTML = mail.body;
    recipients = document.createElement('li');
    recipients.className = 'list-group-item';
   // recipients.forEach(recipient=>{

//})
 r = "reciever:";
    recipients.innerHTML = r.concat(mail.recipients);
    // works !! 
    //var x = mail.body;
     //.log(x)

     subject = document.createElement('li');
     subject.innerHTML = ' <p> Subject:  ${mail.subject} </p> '



     hr = document.createElement('hr');

     div.appendChild(outline);
     outline.appendChild(subject);
     outline.appendChild(body);
     outline.appendChild(recipients);   
     console.log(recipients);
     console.log(recipients[1]);
     outline.appendChild(hr);
    

    });

  });








  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}
// span comment

function compose_submit() {
// Clear existing emails from the view
document.querySelector('#emails-view').innerHTML = '';

//var to strore 

    const to = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const    body = document.querySelector('#compose-body').value;

// sendin email to server

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: to,
            subject: subject,
            body: body
            //conole.log(body)
        })
    })
    .then(response => response.json())
    .then( () => {
      document.querySelector('#compose-recipients').value = '';
      document.querySelector('#compose-subject').value = '';
      document.querySelector('#compose-body').value = ''; 
        });
    // load_mailbox('sent');
}