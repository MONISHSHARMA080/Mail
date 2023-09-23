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

   // Show the mailbox and hide other views
   document.querySelector('#emails-view').style.display = 'block';
   document.querySelector('#compose-view').style.display = 'none';
   document.querySelector('#individual').style.display = 'none';
 
   // Show the mailbox name
   document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
 
 
  // Clear the content of the "mail" div
 const Div = document.querySelector('#mail');
  Div.innerHTML = '';


  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(mails => {
    // api and ou implemenatation works(for test console log)
    //                                                            console.log(mails)
    div = document.querySelector('#mail');
   
    mails.forEach( mail => {
      // works till here
      
    //  console.log(mail)
 outline = document.createElement('ul');
 outline.className = 'list-group';
 outline.style = 'margin: 38px; border: 5px solid green; border-radius: 18px; '

 const item = document.createElement('li');
        item.className = 'list-group-item ';

// if unread appearing with white else with gray
if (mail.read === false) 
{
  // Unread mail
  item.style.backgroundColor = 'red';
} else
 {
  // Mail is read
  item.style.backgroundColor = 'blue';
}
        
        if (mailbox === "archived") 
        {
          //if this is the archived mail then show on website 
          if (mail.archived === 'true')
          {// Set the content of the list item (e.g., sender, subject, timestamp)
            item.innerHTML = `<h3>Archived mail</h3>
            <div class="list-group-item"> <strong>from:</strong> ${mail.sender}<br> </div>
            <div class="list-group-item" > <strong>to:</strong> ${mail.recipients}<br> </div>
            <div class="list-group-item" > <strong>Subject:</strong> ${mail.subject}<br> </div>
            <div class="list-group-item" > <strong>Body:</strong> ${mail.body}<br> </div>
            <div class="list-group-item" > <strong>Timestamp:</strong> ${mail.timestamp}<hr><hr> </div>
            `;
          }
          else
          {
            //no code will be executed here
          }
        }
        else
        {
          //we are not ot archived
          // Set the content of the list item (e.g., sender, subject, timestamp)
          item.innerHTML = `
          <div class="list-group-item"> <strong>from:</strong> ${mail.sender}<br> </div>
          <div class="list-group-item" > <strong>to:</strong> ${mail.recipients}<br> </div>
          <div class="list-group-item" > <strong>Subject:</strong> ${mail.subject}<br> </div>
          <div class="list-group-item" > <strong>Body:</strong> ${mail.body}<br> </div>
          <div class="list-group-item" > <strong>Timestamp:</strong> ${mail.timestamp}<hr><hr> </div>
          `;
        }



    
     div.appendChild(outline);
     outline.appendChild(item);
     outline.addEventListener('click', function(){view_mail(mail.id); });

   

    });

  });

 }

 function view_mail(id)
 {
   outline.addEventListener('click',mail);
   // Show the #mail and hide other views
   document.querySelector('#emails-view').style.display = 'none';
   document.querySelector('#compose-view').style.display = 'none';
   document.querySelector('#mail').style.display = 'none';
            //target div for showing
   document.querySelector('#individual').style.display = 'block';
    
     fetch(`/emails/${id}`)
      .then(response => response.json())
      .then(mail => {
          // Print email
          console.log("inside the api and fetched")// -> passes it works
           //1>inside div create elem. ul , 2>
          div = document.querySelector('#individual');
          outline = document.createElement('ul');
          outline.className = 'list-group';
          //Settin style for outline through js 
          outline.style.padding = '28px';
          outline.style.borderRadius = '18px';
          outline.style.border = '5px solid rgba(255, 255, 0, 0.5)';
          //---styling end----
          div.innerHTML = ` <h1 style=" padding: 18px; margin: 20px; ">Mail:</h1>`













     
         outline.innerHTML=  `<li class="list-group-item"> <strong>from:</strong> ${mail.sender} </li><br>
          <li class="list-group-item" > <strong>to:</strong> ${mail.recipients} </li><br>
          <li class="list-group-item" > <strong>Subject:</strong> ${mail.subject} </li><br>
          <li class="list-group-item" > <strong>Body:</strong> ${mail.body} </li><br>
          <li class="list-group-item" > <strong>Timestamp:</strong> ${mail.timestamp}</li><hr><hr>`;
     
          div.appendChild(outline);
     
     
     
     
        });

 
   //on pop  
 }











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