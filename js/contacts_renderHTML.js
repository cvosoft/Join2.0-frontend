// CONTACTS PAGE
function renderSingleContactEntryHTML(element, index) {
  return /*html */ `
              <div id="singleContactEntry${index}" class="hover contactEntry" onclick="setActive(${index});singleContactView(${index})">
                <div class="innerContactEntry">
                    <div class="initials initSmall" style="background-color:${element.profileColor}">
                        ${element.firstName[0]}${element.lastName[0]}
                    </div>
                    <div class="nameAndAdress">
                        <span id="userNameInList">${element.firstName} ${element.lastName}</span>
                        <a href="mailto:${element.email}" class="emailAdress">${element.email}</a>
                    </div>
                </div>
            </div>
            `;
}

function renderContactSeperatorHTML(element) {
  return /*html */ `
                  <div class="seperatorLetter">${element.firstName[0]}</div>
                  <!-- <hr> -->
                  `;
}

function renderSingleContactHTML(id) {
  return /*html */ `
              <div class="singleContactContainer">
    
                  <div class="singleContact">
                      <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
                      <div>
                          <h2 id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</h2>
                          <div class="editdelete">
                              <a onclick="showEditContact(${id})"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <mask id="mask0_180041_3882" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <rect width="24" height="24" fill="#D9D9D9"/>
                              </mask>
                              <g mask="url(#mask0_180041_3882)">
                              <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                              </g>
                              </svg>Edit</a>
                              <a onclick="deleteContact(${id})"> <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_182765_4130"
                                style="mask-type: alpha"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                              >
                                <rect width="24" height="24" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_182765_4130)">
                                <path
                                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                  fill="#2A3647"
                                />
                              </g>
                            </svg>Delete</a>
                          </div>
                      </div>
                  </div>                
      
                  <div class="contactInfos">
                      <h3>Contact information</h3>
                      <div class="infoItem">
                          <h4>Email</h4>
                          <a id="contactEmail" class="emailAdress" href="mailto:${contacts[id].email}">${contacts[id].email}</a>
                      </div>
                      <div class="infoItem">
                          <h4>Phone</h4>
                          <a id="contactPhoneNumber" class="phoneNumber" href="tel:${contacts[id].phoneNumber}">${contacts[id].phoneNumber}</a>
                      </div>
                  </div>
      
                  <img onclick="showMore();event.stopPropagation()" id="moreButton" src="./assets/img/more1.png"/>
      
                  <div id="moreButtonPopup">
                      <a onclick="showEditContact(${id})"><img src="./assets/img/edit1.png" />Edit</a>
                      <a onclick="deleteContact(${id})"><img src="./assets/img/delete1.png" />Delete</a>
                  </div>
      
              </div>
      `;
}

function renderSingleContactMobileHTML(id) {
  return /*html */ `
                <div class="singleContactContainerMobile">
        
                    <div class="contactsHeadlineBox">
                        <div class="contactsHeadline">
                            <h2>Contacts</h2>
                            <a><img onclick="backToContactList()" src="./assets/img/arrow-left-line.png" /></a>
                        </div>
                        <h3>Better with a team</h3>
                        <hr />
                    </div>
              
                    <div class="singleContact">
                        <span style="background-color:${contacts[id].profileColor}" id="contactInitials" class="initials">${contacts[id].firstName[0]}${contacts[id].lastName[0]}</span>
                        <div>
                            <span id="contactName">${contacts[id].firstName} ${contacts[id].lastName}</span>
                        </div>
                    </div>                
        
                    <div class="contactInfos">
                        <h3>Contact information</h3>
                        <div class="infoItem">
                            <h4>Email</h4>
                            <a id="contactEmail" class="emailAdress" href="mailto:${contacts[id].email}">${contacts[id].email}</a>
                        </div>
                        <div class="infoItem">
                            <h4>Phone</h4>
                            <a id="contactPhoneNumber" class="phoneNumber" href="tel:${contacts[id].phoneNumber}">${contacts[id].phoneNumber}</a>
                        </div>
                    </div>
        
                    <img onclick="showMore();event.stopPropagation()" id="moreButton" src="./assets/img/more1.png"/>
        
                    <div id="moreButtonPopup">
                        <a onclick="showEditContact(${id})"><img src="./assets/img/edit1.png" />Edit</a>
                        <a onclick="deleteContact(${id})"><img src="./assets/img/delete1.png" />Delete</a>
                    </div>
        
                </div>   
      `;
}
